// src/@types/togeojson.d.ts ou src/togeojson.d.ts
declare module '@mapbox/togeojson' {
    import type { Document } from 'xmldom';

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    export function kml(doc: Document): any;
}
