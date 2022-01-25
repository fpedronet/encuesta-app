import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';
import { SortDirection } from '@angular/material/sort';
import { dataCollection } from '../_model/dataCollection';

import { Pregunta } from '../_model/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http: HttpClient) {} 
  
  private url: string = `${environment.UrlApi}/pregunta`;
  
  listar(data: string, grupo: number, tipo: number, page: number,pages: number, column: string, order: SortDirection ) {
    column = (column==undefined)?'':column;

    let href = `${this.url}/GetAllPreguntas`;
    let urls = `${href}?data=${data}&grupo=${grupo}&tipo=${tipo}&page=${page+1}&pages=${pages}&column=${column}&order=${order}`;

    return this.http.get<dataCollection>(urls);
  }

  obtener(id: number){
    let urls = `${this.url}/GetFirstPreguntas?id=${id}`;
    return this.http.get<Pregunta>(urls);
  }

  guardar(pregunta: Pregunta){
    let urls = `${this.url}/PostSavePreguntas`;
    return this.http.post<Response>(urls, pregunta);
  }
}

