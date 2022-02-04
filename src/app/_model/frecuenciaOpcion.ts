export class FrecuenciaOpcion {
    constructor(_opcion: string) {
        this.opcion = _opcion;
        this.frecuenciaAbs = 0;
        this.frecuenciaRel = 0;
    }
    opcion?: string;
    frecuenciaAbs?: number;
    frecuenciaRel?: number;
}