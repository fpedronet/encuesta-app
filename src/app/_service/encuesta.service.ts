import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';
import { SortDirection } from '@angular/material/sort';
import { dataCollection } from '../_model/dataCollection';

import { Encuesta } from '../_model/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private http: HttpClient) {} 
  
  private url: string = `${environment.UrlApi}/encuesta`;
  
  listar(data: string, fechaIni: Date, fechaFin: Date, page: number,pages: number, column: string, order: SortDirection ) {
    column = (column==undefined)?'':column;

    let href = `${this.url}/GetAllEncuesta`;
    let urls = `${href}?data=${data}&fechaIni=${fechaIni}&fechaFin=${fechaFin}&page=${page+1}&pages=${pages}&column=${column}&order=${order}`;

    return this.http.get<dataCollection>(urls);
  }

  obtener(id: number){
    let urls = `${this.url}/GetFirstEncuesta?id=${id}`;
    return this.http.get<Encuesta>(urls);
  }

  guardar(encuesta: Encuesta){
    let urls = `${this.url}/PostSaveEncuesta`;
    return this.http.post<Response>(urls, encuesta);
  }
}
