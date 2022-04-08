import { Component, Input, OnInit, Output } from '@angular/core';
import { TipoPregunta } from 'src/app/_model/tipoPregunta';
import { PregdinamicaService } from './pregdinamica.service';
import { safeJsonParse, isDefinitionObj } from "./definitionObj";
import { EncuestaPregunta } from 'src/app/_model/encuestaPregunta';

@Component({
  selector: 'app-pregdinamica',
  templateUrl: './pregdinamica.component.html',
  styleUrls: ['./pregdinamica.component.css']
})
export class PregdinamicaComponent implements OnInit {

  @Input()
  curPregunta: EncuestaPregunta = new EncuestaPregunta;

  @Input()
  edicion: boolean = false;

  @Input()
  bloqueado: boolean = false;

  constructor(private pregdinamica: PregdinamicaService) { 
    pregdinamica.pregDinamicaComp = this;
  }

  answer: string = '';
  answerSelected: number = -1;
  optionsCheckbox: boolean[] = [];
  inputText: string = '';
  
  scaleNumbers: number[] = [];

  ngOnInit(): void {
    //debugger;
    if(this.curPregunta !== undefined){      
      //Asigna definición
      if(this.curPregunta.cDefinicion)
        this.setDefinicion(this.curPregunta.cDefinicion)
    }
  }

  setDefinicion(cDefinicion: string){
    //debugger;
    const result = safeJsonParse(isDefinitionObj)(cDefinicion) // result: ParseResult<definitionObj>
    if (result.hasError) {
      console.log("Error en el la definición de pregunta extraida")  // external data not valid. Do some error handling here.
    } else {
      var obj = result.parsed;

      //Variable referente al arreglo de opciones
      var curOpciones = this.curPregunta.oDefinicion.opciones;      

      //Opciones para listas (checkbox y radiobutton)      
      curOpciones = obj.opciones;

      //Opciones para sí/no
      if(this.curPregunta.nTipo === 4)
        curOpciones = ['Sí', 'No'];

      //Crea arreglo de deseleccionados para checkbox
      curOpciones.forEach(op => {
        this.optionsCheckbox.push(false);
      });
      if(this.curPregunta.nRqObservacion === 1) //Añade uno más si existe opción otro
        this.optionsCheckbox.push(false);

      //Asigna arreglo de opciones procesado
      this.curPregunta.oDefinicion.opciones = curOpciones;

      //Opciones para escalas
      if(obj.minEscala !== '') this.curPregunta.oDefinicion.minEscala! = obj.minEscala;
      if(obj.maxEscala !== '') this.curPregunta.oDefinicion.maxEscala! = obj.maxEscala;
      //Llena arreglo para escala lineal
      if(this.curPregunta.nTipo === 2){
        
        var init = this.curPregunta.nRangoMinimo;
        var end = this.curPregunta.nRangoMaximo;
        if(init !== undefined && end !== undefined){
          this.scaleNumbers = [];
          for(var i = init; i <= end; i++){
            this.scaleNumbers.push(i);
          }
        }        
      }

      //Descripción que acompaña la observación
      if(obj.descObs !== '') this.curPregunta.oDefinicion.descObs = obj.descObs;
    }
  }

  setAnswers(rptaOpt?: string, rptaObs?: string){
    this.inputText = rptaObs!;

    //Casillas
    if(this.curPregunta.nTipo === 1){
      let listaRptas:number[] = [];
      listaRptas = rptaOpt!.split(',').map(Number);
      //Convertir cadena de opciones en lista
      listaRptas.forEach(rpta => {
        this.optionsCheckbox[rpta] = true;
      });
    }

    //Escala lineal, Sí/No, Varias opciones
    if(this.curPregunta.nTipo === 2 || this.curPregunta.nTipo === 4 || this.curPregunta.nTipo === 5){
      this.answerSelected = parseInt(rptaOpt!);
    }
  }

  updateAnswer(valorSel: string){
    //debugger;
    //console.log(valorSel);
    this.answer = valorSel.toString();
  }

  returnAnswer(){
    var rptaOpt = '';
    var rptaObs = '';

    //Casillas
    if(this.curPregunta.nTipo === 1){
      let index = 0;
      this.optionsCheckbox.forEach(chk => {
        if(chk)
          rptaOpt += index + ',';
        index++;
      });
      if(rptaOpt.length > 0){ //Quita la última coma
        rptaOpt = rptaOpt.substring(0, rptaOpt.length - 1);
      }
      if(this.curPregunta.nRqObservacion === 1 && this.optionsCheckbox[index-1])
        rptaObs = this.inputText;
    }

    //Escala lineal, Sí/No, Varias opciones
    if(this.curPregunta.nTipo === 2 || this.curPregunta.nTipo === 4 || this.curPregunta.nTipo === 5){
      rptaOpt = this.answer;
      if(this.curPregunta.nRqObservacion === 1 && this.curPregunta.nTipo !== 2){
        if(this.curPregunta.nTipo === 4 || this.answer === (this.curPregunta.oDefinicion.opciones.length).toString()){
          rptaObs = this.inputText;
        }
      }
    }

    //Respuesta corta
    if(this.curPregunta.nTipo === 3){
      rptaObs = this.inputText;
    }

    let rptas = [];
    rptas.push(rptaOpt);
    rptas.push(rptaObs);

    return rptas;
  }
}
