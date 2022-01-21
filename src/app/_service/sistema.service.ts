import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';
import { SortDirection } from '@angular/material/sort';
import { dataCollection } from '../_model/dataCollection';

import { Sistema } from '../_model/sistema';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  constructor(private http: HttpClient) { }

  private url: string = `${environment.UrlApi}/sistema`;

  listar(data: string, page: number,pages: number, column: string, order: SortDirection ) {
    column = (column==undefined)?'':column;

    let href = `${this.url}/GetAllSistemas`;
    let urls = `${href}?data=${data}&page=${page+1}&pages=${pages}&column=${column}&order=${order}`;

    return this.http.get<dataCollection>(urls);
  }

  obtener(id: number){
    let urls = `${this.url}/GetFirstSistemas?id=${id}`;
    return this.http.get<Sistema>(urls);
  }

  guardar(grupo: Sistema){
    debugger;
    let urls = `${this.url}/PostSaveSistemas`;
    return this.http.post<Response>(urls, grupo);
  }


}
