"use client";

import { ChevronDown, Trash2, Upload, VectorSquareIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { ExtendedFeatureCollectionWithFilename } from "@/app/page";
import { Button } from "../ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";

const GeometryController = ({
    data_geometries: { geometries, setGeometries },
}: {
    data_geometries: {
        setGeometries: Dispatch<
            SetStateAction<ExtendedFeatureCollectionWithFilename[]>
        >;
        geometries: ExtendedFeatureCollectionWithFilename[];
    };
}) => {

    // Função para remover geometria pelo índice
    const removeGeometry = (position: number) => {
        setGeometries((prev) =>
            prev.filter((_, index) => index !== position)
        );
    };

    return (
        <div className="fixed top-6 right-6 w-80 max-h-[80vh] bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-black/10 flex flex-col z-50 overflow-hidden transition-all duration-300 hover:shadow-3xl">
            <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-3 border-b border-gray-100/50">
                <Collapsible defaultOpen className="group/collapsible">
                    <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between  group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 rounded-xl">
                                    <VectorSquareIcon className="h-5 w-5 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                                    Geometrias
                                </h3>
                            </div>
                            <div className="p-2 rounded-xl bg-gray-100/50 group-hover:bg-gray-200/50 transition-colors">
                                <ChevronDown className="h-4 w-4 text-gray-600 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180" />
                            </div>
                        </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="mt-6">
                        <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-track-transparent pr-2">
                            {geometries.map((geometry, index) => (
                                <div
                                    key={(index)}
                                    className="group/item flex items-center justify-between p-4 bg-white/60 hover:bg-white/80 rounded-2xl border border-gray-100/50 hover:border-gray-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-black/5 "
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm"></div>
                                        <span className="text-sm font-medium text-gray-800 group-hover/item:text-gray-900 transition-colors">
                                            {geometry.fileName}
                                        </span>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 opacity-0 group-hover/item:opacity-100"
                                        onClick={() => { removeGeometry(index) }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            {geometries.length === 0 && (
                                <div className="mt-4 p-6 border-2 border-dashed border-green-200/60 hover:border-green-300/80 rounded-2xl bg-gradient-to-br from-green-50/30 to-indigo-50/20 hover:from-green-50/50 hover:to-indigo-50/40 transition-all duration-300  group/drop">
                                    <div className="flex flex-col items-center gap-3 text-center">
                                        <div className="p-3 bg-green-100/60 group-hover/drop:bg-green-100/80 rounded-2xl transition-colors duration-300">
                                            <Upload className="h-6 w-6 text-green-600 group-hover/drop:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-green-900/90 group-hover/drop:text-green-900">
                                                Arraste arquivos aqui
                                            </p>
                                            <p className="text-xs text-green-700/70 group-hover/drop:text-green-700/90 transition-colors">
                                                Formatos: GeoJSON, KML, SHP...
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100/50">
                            <p className="text-xs text-gray-500 text-center font-medium">
                                {geometries.length} geometrias carregadas
                            </p>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
};

export default GeometryController;
