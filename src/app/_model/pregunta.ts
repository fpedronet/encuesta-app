import { Grupo } from './grupo';

export class Pregunta{
    nIdPregunta? :number;
    nCodigo? :string;
    nIdGrupo? :number;
    cGrupo?: string;
    cDescripcion? : string;
    nTipo? :number;
    cTipo? :string;
    nRqObservacion? :number;
    nRangoMinimo? :number;
    nRangoMaximo? :number;
    cDefinicion? : string;

    listaGrupo?: Grupo[];
}