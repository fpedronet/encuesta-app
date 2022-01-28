import { Injectable } from '@angular/core';
import { TipoPregunta } from 'src/app/_model/tipoPregunta';
import { PregdinamicaComponent } from './pregdinamica.component';
import { EncuestaPregunta } from 'src/app/_model/encuestaPregunta';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PregdinamicaService {

  pregDinamicaComp!: PregdinamicaComponent;

  curPregunta: EncuestaPregunta = new EncuestaPregunta();

  constructor() { }

  actualizaPregunta(newPregunta: EncuestaPregunta){
    this.pregDinamicaComp.curPregunta = newPregunta;
    //this.pregDinamicaComp.ngOnInit();
  }


}