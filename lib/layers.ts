import type L from "leaflet";

export async function getLeaflet() {
    if (typeof window === "undefined") {
        return null;
    }
    const L = await import("leaflet");
    return L;
}

export interface type_base_layers {
    id: number;
    label: string;
    attribution: string;
    url: string;
    style: {
        color: string;
        letter: string;
    };
}
[];

export const base_layers = [
    {
        id: 0,
        label: "OpenStreetMap",
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        style: {
            color: "emerald",
            letter: "O",
        },
    },
    {
        id: 1,
        label: "Google Satellite",
        attribution:
            '&copy; <a href="https://www.google.com/permissions/geoguidelines/">Google</a>',
        url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        style: {
            color: "blue",
            letter: "G",
        },
    },
    {
        id: 2,
        label: "Esri World Imagery",
        attribution:
            '&copy; <a href="https://www.esri.com/en-us/about-us/legal">Esri</a>',
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        style: {
            color: "amber",
            letter: "E",
        },
    },
    {
        id: 3,
        label: "Carto Light",
        attribution:
            '&copy; <a href="https://www.carto.com/">CARTO</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        url: "https://cartodb-basemaps-a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        style: {
            color: "gray",
            letter: "C",
        },
    },
    {
        id: 4,
        label: "Carto Dark",
        attribution:
            '&copy; <a href="https://www.carto.com/">CARTO</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        url: "https://cartodb-basemaps-a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        style: {
            color: "slate",
            letter: "D",
        },
    },
    {
        id: 5,
        label: "OpenTopoMap",
        attribution:
            '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        style: {
            color: "orange",
            letter: "T",
        },
    },
];

export interface IWMSLayer {
    name: string;
    url: string;
    layers: string;
    format?: string;
    transparent?: boolean;
    version?: string;
    crs?: L.CRS;
    styles?: string;
    active: boolean;
}

export const default_wms_layers: IWMSLayer[] = [
    {
        name: "Áreas de Embargo - IBAMA",
        url: "https://siscom.ibama.gov.br/geoserver/ows?service=WMS",
        layers: "publica:vw_brasil_adm_embargo_a",
        format: "image/png",
        transparent: true,
        version: "1.3.0",
        crs: (await getLeaflet())?.CRS.EPSG3857,
        styles: "",
        active: false
    },
    {
        name: "Terras Indígenas - FUNAI",
        url: "https://geoserver.funai.gov.br/geoserver/ows?service=WMS",
        layers: "Funai:tis_poligonais_portarias",
        format: "image/png",
        transparent: true,
        version: "1.3.0",
        crs: (await getLeaflet())?.CRS.EPSG3857,
        styles: "",
        active: false
    },
    {
        name: "Rodovias - IBGE",
        url: "https://geoservicos.ibge.gov.br/geoserver/ows?service=WMS",
        layers: "CGMAT:pbqg22_00_Bc250_2021TrechoRod_complex",
        format: "image/png",
        transparent: true,
        version: "1.3.0",
        crs: (await getLeaflet())?.CRS.EPSG3857,
        styles: "",
        active: false
    },
    {
        name: "Limites Municipais da Amazonia Legal - IBGE",
        url: "https://geoservicos.ibge.gov.br/geoserver/ows?service=WMS",
        layers: "CGMAT:pbqg22_15_MunicAmazoniaLegal",
        format: "image/png",
        transparent: true,
        version: "1.3.0",
        crs: (await getLeaflet())?.CRS.EPSG3857,
        styles: "",
        active: false
    },
    {
        name: "Municípios - IBGE",
        url: "https://geoservicos.ibge.gov.br/geoserver/ows?service=WMS",
        layers: "CGMAT:pbqg22_04_Municipios_cd_mun",
        format: "image/png",
        transparent: true,
        version: "1.3.0",
        crs: (await getLeaflet())?.CRS.EPSG3857,
        styles: "",
        active: false
    },
    {
        name: "Amazônia Legal - IBGE",
        url: "https://geoservicos.ibge.gov.br/geoserver/ows?service=WMS",
        layers: "CGMAT:pbqg22_15_LimAmazoniaLegal",
        format: "image/png",
        transparent: true,
        version: "1.3.0",
        crs: (await getLeaflet())?.CRS.EPSG3857,
        styles: "",
        active: false
    },
    {
        name: "Limites de UFs - IBGE",
        url: "https://geoservicos.ibge.gov.br/geoserver/ows?service=WMS",
        layers: "CGMAT:pbqg22_02_Estado_LimUF",
        format: "image/png",
        transparent: true,
        version: "1.3.0",
        crs: (await getLeaflet())?.CRS.EPSG3857,
        styles: "",
        active: false
    },
];

// Valores padrão
export const defaultWMSOptions = {
    format: "image/png",
    transparent: true,
    version: "1.3.0",
    crs: (await getLeaflet())?.CRS.EPSG3857,
    styles: "",
    active: false
};
