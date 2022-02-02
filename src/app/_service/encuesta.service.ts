import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../_model/response';
import { SortDirection } from '@angular/material/sort';
import { dataCollection } from '../_model/dataCollection';

import { Encuesta } from '../_model/encuesta';
import { Respuesta } from '../_model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private http: HttpClient) {} 
  
  private url: string = `${environment.UrlApi}/encuesta`;
  
  listar(data: string, fechaIni: Date, fechaFin: Date, page: number,pages: number, column: string, order: SortDirection ) {
    column = (column==undefined)?'':column;
    let finicio = (fechaIni==undefined)?'':fechaIni.toDateString();
    let ffin = (fechaFin==undefined)?'':fechaFin.toDateString();

    let href = `${this.url}/GetAllEncuesta`;
    let urls = `${href}?data=${data}&fechaIni=${finicio}&fechaFin=${ffin}&page=${page+1}&pages=${pages}&column=${column}&order=${order}`;

    return this.http.get<dataCollection>(urls);
  }

  listarSegunUsuario(data: string, usuario: number, enCurso: number, fechaIni: Date, fechaFin: Date, page: number,pages: number, column: string, order: SortDirection ) {
    column = (column==undefined)?'':column;
    usuario = (usuario==undefined)?0:usuario;
    enCurso = (enCurso==undefined)?1:enCurso;
    let finicio = (fechaIni==undefined)?'':fechaIni.toDateString();
    let ffin = (fechaFin==undefined)?'':fechaFin.toDateString();

    let href = `${this.url}/GetAllEncuestaUsuario`;
    let urls = `${href}?data=${data}&usuario=${usuario}&enCurso=${enCurso}&fechaIni=${finicio}&fechaFin=${ffin}&page=${page+1}&pages=${pages}&column=${column}&order=${order}`;

    return this.http.get<dataCollection>(urls);
  }

  existeEncuesta() {
    let urls = `${this.url}/GetExistEncuestaUsuario`;
    return this.http.get<dataCollection>(urls);
  }

  obtener(id: number, vistaCliente: number){
    let urls = `${this.url}/GetFirstEncuesta?id=${id}&vistaCliente=${vistaCliente}`;
    return this.http.get<Encuesta>(urls);
  }

  listarclienteporsistema(id: number) {
    let urls = `${this.url}/GetAllClientePorSistema?id=${id}`;
    return this.http.get<dataCollection>(urls);
  }

  guardar(encuesta: Encuesta){
    let urls = `${this.url}/PostSaveEncuesta`;
    return this.http.post<Response>(urls, encuesta);
  }

  guardarRespuesta(encuesta: Encuesta){
    let urls = `${this.url}/PostSaveRespuestas`;
    return this.http.post<Response>(urls, encuesta);
  }
}
