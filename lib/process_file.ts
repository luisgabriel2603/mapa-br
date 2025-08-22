
import * as togeojson from '@mapbox/togeojson';
import JSZip from 'jszip';

export function parseKmlToXmlDocument(kmlContent: string): Document {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(kmlContent, 'text/xml');
    return xmlDoc;
}

export function parseKmlToGeoJson(xmlDoc: Document) {
    const geojson = togeojson.kml(xmlDoc);
    return geojson;
}

export async function convertKmzToKml(kmzFile: File): Promise<string[]> {
    const zip = await JSZip.loadAsync(kmzFile);
    const kmlContents: string[] = [];

    // Procura por todos os arquivos com a extensão .kml no KMZ
    for (const relativePath in zip.files) {
        const zipEntry = zip.files[relativePath];
        if (zipEntry.name.endsWith('.kml')) {
            const kmlContent = await zipEntry.async('text');
            kmlContents.push(kmlContent);
        }
    }

    if (kmlContents.length === 0) {
        throw new Error('Nenhum arquivo KML encontrado no KMZ.');
    }

    return kmlContents;
}
