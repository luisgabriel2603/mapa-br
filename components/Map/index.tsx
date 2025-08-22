"use client";
import {
    GeoJSON,
    MapContainer,
    TileLayer,
    useMap,
    WMSTileLayer,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import type {
    Feature,
    FeatureCollection,
    GeoJsonProperties,
    Geometry,
} from "geojson";
import type { LatLngExpression, LatLngTuple } from "leaflet";
import { Fragment, useEffect, useMemo, useState } from "react";
import ReactLeafletKml from "react-leaflet-kml";
import type { ExtendedFeatureCollectionWithFilename } from "@/app/page";
import type { IWMSLayer } from "@/lib/layers";

const CenterAndZoom = ({
    posix,
    zoom = 7,
    markerPos,
}: {
    posix: LatLngExpression;
    zoom?: number;
    markerPos: LatLngTuple;
}) => {
    const map = useMap();

    useEffect(() => {
        if (posix && markerPos[0] !== 0 && markerPos[1] !== 0) {
            zoom && map.flyTo(markerPos, zoom);
        }
    }, [posix, zoom, markerPos, map]);

    return null;
};

export interface IMapHomeProps {
    base_layer_current: {
        attribution: string;
        url: string;
    };
    wms_layers_current?: IWMSLayer[];
    geometries?: ExtendedFeatureCollectionWithFilename[];
}

export default function MapHome({
    base_layer_current,
    wms_layers_current,
    geometries,
}: IMapHomeProps) {
    const memoizedLayers = useMemo(() => {
        return wms_layers_current?.map((layer) => (
            <WMSTileLayer
                key={layer.name}
                {...layer}
                opacity={layer.active ? 1 : 0}
            />
        ));
    }, [wms_layers_current]);
    const [zoomGeo, setZoomGeo] = useState<LatLngTuple | null>();
    const brightColors = [
        "#FF0000", // vermelho
        "#00FF00", // verde limão
        "#0000FF", // azul
        "#FF00FF", // magenta
        "#00FFFF", // ciano
        "#FFA500", // laranja
        "#FFFF00", // amarelo
        "#800080", // roxo
        "#00FF7F", // verde esmeralda
        "#FF1493", // rosa choque
    ];

    return (
        <MapContainer
            center={[-15.28, -47.93]}
            zoom={5}
            style={{ height: "100%", width: "100%", zIndex: 1 }}
        >
            <TileLayer {...base_layer_current} />
            {memoizedLayers}
            {geometries?.map((geometry, index) => {
                const geoColor = brightColors[index % brightColors.length]; // cicla cores

                if (geometry.kml && geometry.kmlText) {
                    return (
                        <ReactLeafletKml
                            kml={new DOMParser().parseFromString(geometry.kmlText, "text/xml")}
                            key={(index)}
                        />
                    );
                }

                return (
                    <Fragment key={(index)}>
                        <GeoJSON
                            data={
                                {
                                    type: "FeatureCollection",
                                    features: geometry.features as Feature<Geometry, GeoJsonProperties>[],
                                } as FeatureCollection<Geometry, GeoJsonProperties>
                            }
                            style={{ opacity: 0.9, color: geoColor, weight: 2 }}
                            onEachFeature={(feature: Feature<Geometry, string>) => {
                                if (feature?.geometry?.bbox && feature.geometry.bbox.length === 4) {
                                    const [minX, minY, maxX, maxY] = feature.geometry.bbox;
                                    const center = [(minY + maxY) / 2, (minX + maxX) / 2] as LatLngTuple;
                                    setZoomGeo(center);
                                }
                            }}
                        />
                        {zoomGeo && (
                            <CenterAndZoom posix={zoomGeo} zoom={10} markerPos={zoomGeo} />
                        )}
                    </Fragment>
                );
            })}

        </MapContainer>
    );
}
