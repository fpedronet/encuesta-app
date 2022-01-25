import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';
import { SortDirection } from '@angular/material/sort';
import { dataCollection } from '../_model/dataCollection';

import { Cliente } from '../_model/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {} 
  
  private url: string = `${environment.UrlApi}/cliente`;
  
  listar(data: string, page: number,pages: number, column: string, order: SortDirection ) {
    column = (column==undefined)?'':column;

    let href = `${this.url}/GetAllCliente`;
    let urls = `${href}?data=${data}&page=${page+1}&pages=${pages}&column=${column}&order=${order}`;

    return this.http.get<dataCollection>(urls);
  }

  obtener(id: number){
    let urls = `${this.url}/GetFirstCliente?id=${id}`;
    return this.http.get<Cliente>(urls);
  }

  guardar(grupo: Cliente){
    let urls = `${this.url}/PostSaveCliente`;
    return this.http.post<Response>(urls, grupo);
  }

}
