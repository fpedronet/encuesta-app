import { ClienteSistema } from './clienteSistema';
import { Sistema } from './sistema';

export class Cliente{
    nIdCliente? :number;
    nCodigo?: string;
    cDescripcion? : string;
    cRuc? : string;
    cContacto? : string;
    cDpto? : string;
    cProvincia? : string;
    cDistrito? : string;
    cClave? : string;
    nEsAdministrador? : number;
    
    nIdSistemas? : number;
    listaSistema?: Sistema[];
    listClienteSistema?: ClienteSistema[];
    listaIdSistema?: number[];
}