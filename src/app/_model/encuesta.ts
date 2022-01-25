import { Sistema } from 'src/app/_model/sistema';

export class Encuesta{
    nIdEncuesta?: number;
    nCodigo?: string;
    nIdSistemas?: number;
    cSistemas?: string;
    cTitulo?: string;
    cDescripcion?: string;
    dFechaIni?: Date;
    dFechaFin?: Date;
    sFechaIni?: string;
    sFechaFin?: string;
    listaSistema?: Sistema[];
}