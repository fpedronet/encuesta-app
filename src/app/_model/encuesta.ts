import { Cliente } from 'src/app/_model/cliente';
import { Sistema } from 'src/app/_model/sistema';

export class Encuesta{
    nIdEncuesta?: number;
    nCodigo?: string;
    nIdSistemas?: number;
    nIdCliente?: number;
    cSistemas?: string;
    cTitulo?: string;
    cDescripcion?: string;
    dFechaIni?: Date;
    dFechaFin?: Date;
    sFechaIni?: string;
    sFechaFin?: string;

    listaCliente?: Cliente[];
    listaSistema?: Sistema[];
    listaIdCliente?: number[];
}