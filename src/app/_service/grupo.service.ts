import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grupo } from '../_model/grupo';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private url: string = `${environment.UrlApi}/grupo`;

  constructor(private http: HttpClient) {} 
  
  listar(){
    let urls = `${this.url}/GetAllGrupo?data=&page=1&page=10`;
    return this.http.get<Grupo[]>(urls);
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
