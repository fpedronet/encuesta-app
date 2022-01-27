import { Injectable } from '@angular/core';
import { TipoPregunta } from 'src/app/_model/tipoPregunta';
import { PregdinamicaComponent } from './pregdinamica.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PregdinamicaService {

  pregDinamicaComp!: PregdinamicaComponent;

  curTipo: number = 0;

  constructor() { }

  changeIdTipo(newTipo: number){
    this.pregDinamicaComp.curTipo = newTipo;
    //this.pregDinamicaComp.ngOnInit();
  }


}
