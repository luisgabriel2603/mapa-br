"use client";

import JSZip from "jszip";
import { useCallback, useEffect, useMemo, useState } from "react";
import shp, { type FeatureCollectionWithFilename } from "shpjs";
import { AppSidebar } from "@/components/AppSidebar";
import CallDynamicMap from "@/components/CallDynamicMap";
import GeometryController from "@/components/LayerController";
import LoadingFile from "@/components/LoadingFile";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "@/components/ui/use-toast";
import { useLayerType } from "@/hooks/layer-type-map";
import { base_layers, default_wms_layers, type IWMSLayer } from "@/lib/layers";
import { parseKmlToGeoJson, parseKmlToXmlDocument } from "@/lib/process_file";

export type ShpJSBuffer = ArrayBuffer;
export interface ExtendedFeatureCollectionWithFilename
  extends FeatureCollectionWithFilename {
  fileName?: string;
  kml?: boolean;
  kmlText?: string;
}

export default function Home() {
  const { layerType } = useLayerType();
  const activeLayer = useMemo(() => base_layers[layerType], [layerType]);
  const [wmsLayerManager, setWmsLayerManager] =
    useState<IWMSLayer[]>(default_wms_layers);
  const [loadingFile, setLoadingFile] = useState(false);
  const [geometries, setGeometries] = useState<
    ExtendedFeatureCollectionWithFilename[]
  >([]);



  const processZipFile = useCallback(
    async (
      zipFile: JSZip,
      zip: JSZip,
      processSingleFile: typeof _processSingleFile,
    ): Promise<boolean> => {
      let needFetchFile = false;
      for (const relativePath in zipFile.files) {
        const zipEntry = zipFile.files[relativePath];
        if (!zipEntry.dir) {
          const result = await processSingleFile(zipEntry, zip);
          if (result) {
            const content = await zipEntry.async("arraybuffer");
            zip.file(zipEntry.name, content);
            needFetchFile = true;
          }
        }
      }
      return needFetchFile;
    },
    [],
  );

  const _processSingleFile = useCallback(
    async (
      file: File | JSZip.JSZipObject,
      zip?: JSZip,
    ): Promise<File | JSZip.JSZipObject | null> => {
      const name = "name" in file ? file.name : (file as { name: string }).name;

      try {
        if (name.endsWith(".geojson")) {
          const text =
            "text" in file ? await file.text() : await file.async("text");
          const geojson = JSON.parse(text);
          geojson.fileName = name.replace(".geojson", "");
          setGeometries((prev) => [...prev, geojson]);
          return null;
        } else if (name.endsWith(".kml")) {
          const text =
            "text" in file ? await file.text() : await file.async("text");
          const xmlDoc = parseKmlToXmlDocument(text);
          const geojson = parseKmlToGeoJson(xmlDoc);
          geojson.fileName = name.replace(".kml", "");
          setGeometries((prev) => [...prev, geojson]);
          return null;
        } else if (name.endsWith(".kmz") || name.endsWith(".zip")) {
          const arrayBuffer =
            "arrayBuffer" in file
              ? await file.arrayBuffer()
              : await file.async("arraybuffer");
          const nestedZip = await JSZip.loadAsync(arrayBuffer);
          if (zip) {
            await processZipFile(nestedZip, zip, _processSingleFile);
          } else {
            await processZipFile(nestedZip, new JSZip(), _processSingleFile);
          }
          return null;
        } else {
          return file;
        }
      } catch (error) {
        console.error("Erro ao processar arquivo:", name, error);
        toast({
          title: "Erro",
          variant: "destructive",
          description: `Erro ao processar o arquivo: ${name}`,
        });
        return null;
      }
    },
    [processZipFile],
  );

  const fetchFile = useCallback(async (file: string | ShpJSBuffer) => {
    try {
      const geojson = await shp(file);
      if (geojson) {
        setGeometries((prev) =>
          Array.isArray(geojson) ? [...prev, ...geojson] : [...prev, geojson],
        );
      }
    } catch (_error) {
      toast({
        title: "Erro",
        variant: "destructive",
        description:
          "Arquivo inválido ou não suportado, verifique a extensão dos arquivos.",
      });
    }
  }, []);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    [],
  );

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setLoadingFile(true);
      try {
        const files = Array.from(event.dataTransfer.files);
        const zip = new JSZip();
        let needFetchFile = false;

        for (const file of files) {
          const result = await _processSingleFile(file, zip);
          if (result) {
            const arrayBuffer = await file.arrayBuffer();
            zip.file(file.name, arrayBuffer);
            needFetchFile = true;
          }
        }

        if (needFetchFile) {
          const zipBlob = await zip.generateAsync({ type: "blob" });
          const buffer: ShpJSBuffer = await zipBlob.arrayBuffer();
          await fetchFile(buffer);
        }
      } finally {
        setLoadingFile(false);
      }
    },
    [_processSingleFile, fetchFile],
  );

  return (
    <SidebarProvider>
      <AppSidebar
        layer={{ activeLayer }}
        wms_layers={{ wmsLayerManager, setWmsLayerManager }}
      />
      <SidebarTrigger />
      {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
      <div
        className="w-full h-0 min-h-screen"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <GeometryController data_geometries={{ geometries, setGeometries }} />
        <CallDynamicMap
          base_layer_current={activeLayer}
          wms_layers_current={wmsLayerManager}
          geometries={geometries}
        />
        <LoadingFile active={loadingFile} />
      </div>
    </SidebarProvider>
  );
}
