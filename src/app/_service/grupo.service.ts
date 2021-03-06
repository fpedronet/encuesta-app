import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';
import { SortDirection } from '@angular/material/sort';
import { dataCollection } from '../_model/dataCollection';

import { Grupo } from '../_model/grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient) {} 
  
  private url: string = `${environment.UrlApi}/grupo`;
  
  listar(data: string, page: number,pages: number, column: string, order: SortDirection ) {
    column = (column==undefined)?'':column;

    let href = `${this.url}/GetAllGrupo`;
    let urls = `${href}?data=${data}&page=${page+1}&pages=${pages}&column=${column}&order=${order}`;

    return this.http.get<dataCollection>(urls);
  }

  obtener(id: number){
    let urls = `${this.url}/GetFirstGrupo?id=${id}`;
    return this.http.get<Grupo>(urls);
  }

  guardar(grupo: Grupo){
    let urls = `${this.url}/PostSaveGrupo`;
    return this.http.post<Response>(urls, grupo);
  }

  cambioestado(grupo: Grupo){
    let urls = `${this.url}/PostChangeStatusGrupo`;
    return this.http.post<Response>(urls, grupo);
  }

  eliminar(id: number){
    let urls = `${this.url}/DeleteGrupo?id=${id}`;
    return this.http.delete<Response>(urls);
  }
}
