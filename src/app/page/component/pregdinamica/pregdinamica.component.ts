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

  constructor(private pregdinamica: PregdinamicaService) { 
    pregdinamica.pregDinamicaComp = this;
  }
  
  options: string[] = [];

  answer: string = '';
  optionsCheckbox: boolean[] = [];
  inputText: string = '';
  
  minScale: string = 'Mínimo';
  maxScale: string = 'Máximo';
  scaleNumbers: number[] = [];

  defaultOptions = ['Opción 1', 'Opción 2', 'Opción 3'];

  ngOnInit(): void {
    if(this.curPregunta !== undefined){
      //Muestra valores para la escala
      if(this.curPregunta.nTipo == 2){ //Escala lineal
        var init = this.curPregunta.nRangoMinimo;
        var end = this.curPregunta.nRangoMaximo;
        if(init && end){
          this.scaleNumbers = [];
          for(var i = init; i <= end; i++){
            this.scaleNumbers.push(i);
          }
        }        
      }

      //Asigna definición
      if(this.curPregunta.cDefinicion)
        this.setDefinicion(this.curPregunta.cDefinicion)
    }
  }

  setDefinicion(cDefinicion: string){
    const result = safeJsonParse(isDefinitionObj)(cDefinicion) // result: ParseResult<definitionObj>
    if (result.hasError) {
      console.log("Error en el la definición de pregunta extraida")  // external data not valid. Do some error handling here.
    } else {
      var obj = result.parsed;

      //Opciones para listas (checkbox y radiobutton)
      this.options = obj.opciones;
      if(this.options.length === 0) this.options = this.defaultOptions;

      //Crea arreglo de deseleccionados para checkbox
      this.options.forEach(op => {
        this.optionsCheckbox.push(false);
      });
      if(this.curPregunta.nRqObservacion === 1) //Añade uno más si existe opción otro
        this.optionsCheckbox.push(false);

      //Opciones para escalas
      if(obj.minEscala !== '') this.minScale = obj.minEscala;
      if(obj.maxEscala !== '') this.maxScale = obj.maxEscala;
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
      if(this.curPregunta.nRqObservacion === 1 && this.optionsCheckbox[index-1])
        rptaObs = this.inputText;
    }

    //Escala lineal, Sí/No, Varias opciones
    if(this.curPregunta.nTipo === 2 || this.curPregunta.nTipo === 4 || this.curPregunta.nTipo === 5){
      rptaOpt = this.answer;
      if(this.curPregunta.nRqObservacion === 1 && this.answer === (this.options.length - 1).toString())
        rptaObs = this.inputText;
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
