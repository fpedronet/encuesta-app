import { Respuesta } from './respuesta';

export class EncuestaPregunta{
    constructor() {
        this.nIdEncuestaPregunta = 0;
        this.nIdEncuesta = 0;
        this.nIdPregunta = 0;
        this.nOrden = 1;
        this.nIdGrupo = 0;
        this.cDescripcion = '';
        this.nTipo = 0;
        this.nRqObservacion = 0;
        this.nRangoMinimo = 0;
        this.nRangoMaximo = 0;
        this.cDefinicion = '';
        this.nEstado = 0;
    }
    nIdEncuestaPregunta? :number;
    nIdEncuesta?:number;
    nIdPregunta?: number;
    nOrden?: number;
    nIdGrupo? :number;
    cDescripcion? : string;
    nTipo? :number;
    nRqObservacion? :number;
    nRangoMinimo? :number;
    nRangoMaximo? :number;
    cDefinicion? : string;
    nEstado? :number;
    respuesta? : Respuesta;
}