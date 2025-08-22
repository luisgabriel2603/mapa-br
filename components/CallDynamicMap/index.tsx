"use client";

import dynamic from "next/dynamic";
import { Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BiError } from "react-icons/bi";
import type { IMapHomeProps } from "@/components/Map";

export default function CallDynamicMap(props: IMapHomeProps) {
    const DynamicMap = useMemo(
        () =>
            dynamic(
                // A importação do Mapa do Leaflet tem que ser dinâmica devido a configurações de render
                () => import("@/components/Map"),
                {
                    loading: () => (
                        <div className="skeleton mx-auto h-[800px] w-full animate-pulse py-3 max-md:h-[520px] ">
                            {/* <div className="absolute inset-0 bg-beige-300/50 z-50 pointer-events-none flex items-center justify-center">
								<span className="loading loading-dots loading-lg text-white text-9xl" />
							</div> */}
                        </div>
                    ),
                    ssr: false,
                },
            ),
        [],
    );

    return (
        <div className={" h-full w-full"}>
            <ErrorBoundary fallback={<MapError />}>
                <Suspense>
                    <DynamicMap {...props} />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
}

export function MapError() {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex w-full flex-col items-center text-center text-info/80">
                <BiError size={156} />
                <span className="font-medium text-2xl">
                    Ocorreu um erro ao carregar o mapa. Tente novamente.
                </span>
            </div>
        </div>
    );
}
