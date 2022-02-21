import { definitionObj } from '../page/component/pregdinamica/definitionObj';
import { Respuesta } from './respuesta';

export class EncuestaPregunta{
    constructor() {
        this.nIdEncuestaPregunta = 0;
        this.nIdEncuesta = 0;
        this.nIdPregunta = 0;
        this.nOrden = 1;
        this.nIdGrupo = 0;
        this.cDescripcion = 'Enunciado de la pregunta';
        this.nTipo = 0;
        this.nRqObservacion = 0;
        this.nRangoMinimo = 0;
        this.nRangoMaximo = 0;
        //this.cDefinicion = '{"opciones":[],"minEscala":"","maxEscala":"","descObs":""}';
        this.oDefinicion = {
            opciones: ['Opción 1', 'Opción 2'],
            minEscala: 'Mínimo',
            maxEscala: 'Máximo',
            descObs: 'Otro'
        };
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
    oDefinicion!: definitionObj;
    nEstado? :number;
    respuesta? : Respuesta;
}