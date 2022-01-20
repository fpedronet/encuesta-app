import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Grupo } from '../_model/grupo';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';
import { SortDirection } from '@angular/material/sort';
import { dataCollection } from '../_model/dataCollection';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private url: string = `${environment.UrlApi}/grupo`;

  constructor(private http: HttpClient) {} 
  
  listar(data: string, page: number,pages: number, column: string, order: SortDirection ) {
    column = (column==undefined)?'':column;

    let href = `${this.url}/GetAllGrupo`;
    let urls = `${href}?data=${data}&page=${page+1}&pages=${pages}&column=${column}&order=${order}`;
debugger;
  // let token = localStorage.getItem(environment.TOKEN_NAME);
  //   return this.http.get<dataCollection>(urls,{
  //     headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
  //   });
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
