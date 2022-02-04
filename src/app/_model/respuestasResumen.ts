import { EncuestaPregunta } from './encuestaPregunta';
import { FrecuenciaOpcion } from './frecuenciaOpcion';

export class RespuestasResumen{
    nIdEncuestaPregunta?: number;
    cRptasOpt?: string;
    cRptasObs?: string;
    pregunta?: EncuestaPregunta;
    cantidadRptas?: number;
    frecuencias?: FrecuenciaOpcion[];
    observaciones?: string[];
    muestraOpt?: boolean;
    muestraObs?: boolean;
    tituloObs?: string;
}