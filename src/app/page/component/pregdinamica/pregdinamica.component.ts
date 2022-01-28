import { Component, OnInit } from '@angular/core';
import { TipoPregunta } from 'src/app/_model/tipoPregunta';
import { PregdinamicaService } from './pregdinamica.service';

@Component({
  selector: 'app-pregdinamica',
  templateUrl: './pregdinamica.component.html',
  styleUrls: ['./pregdinamica.component.css']
})
export class PregdinamicaComponent implements OnInit {

  constructor(private pregdinamica: PregdinamicaService) { 
    pregdinamica.pregDinamicaComp = this;
  }

  curPregunta = this.pregdinamica.curPregunta;

  listaOpciones = ['Opción 1', 'Opción 2', 'Opción 3'];

  ngOnInit(): void {
  }

}
