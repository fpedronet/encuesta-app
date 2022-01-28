import { Grupo } from 'src/app/_model/grupo';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';
import { PregdinamicaService } from '../../component/pregdinamica/pregdinamica.service';

import { Pregunta } from 'src/app/_model/pregunta';
import { PreguntaService } from 'src/app/_service/pregunta.service';
import { EncuestaPregunta } from 'src/app/_model/encuestaPregunta';
import { environment } from 'src/environments/environment';
import { TipoPregunta } from 'src/app/_model/tipoPregunta';
import { DateRange } from '@angular/material/datepicker';


@Component({
  selector: 'app-cpregunta',
  templateUrl: './cpregunta.component.html',
  styleUrls: ['./cpregunta.component.css']
})
export class CpreguntaComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService : NotifierService,
    private spinner : SpinnerService,
    private preguntaService : PreguntaService,
    private pregdinamicaService: PregdinamicaService
  ) { }

  form: FormGroup = new FormGroup({});
  id: number = 0;
  ver: boolean = true;

  otrosParametros: boolean = true;

  listaGrupo?: Grupo[] = [];

  listaTipo?: TipoPregunta[] = [];

  curPregunta?: EncuestaPregunta;

  ngOnInit(): void { 
    this.form = new FormGroup({
      'nIdPregunta': new FormControl({ value: 0 }),
      'nCodigo': new FormControl({ value: '###', disabled: true }),
      'nIdGrupo': new FormControl({ value: 0, disabled: false }),
      'cDescripcion': new FormControl({ value: '', disabled: false}),
      'nTipo': new FormControl({ value: 0, disabled: false }),
      'nRqObservacion': new FormControl({ value: 0, disabled: false }),
      'nRangoMinimo': new FormControl({ value: 0, disabled: false }),
      'nRangoMaximo': new FormControl({ value: 0, disabled: false }),
      'cDefinicion': new FormControl({ value: '', disabled: true})
    });

    this.listaTipo = environment.listaTipo;

    this.route.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? 0:data["id"];
      this.ver = (data["ver"]=='true')? true : false
      this.obtener();
    });

    this.curPregunta = new EncuestaPregunta();
  }

  obtener(){
      this.spinner.showLoading();
      this.preguntaService.obtener(this.id).subscribe(data=>{
        this.listaGrupo = data.listaGrupo;

        this.form = new FormGroup({
          'nIdPregunta': new FormControl({ value: data.nIdPregunta }),
          'nCodigo': new FormControl({ value: data.nIdPregunta, disabled: true }),
          'nIdGrupo': new FormControl({ value: data.nIdGrupo, disabled: this.ver }),
          'cDescripcion': new FormControl({ value: data.cDescripcion, disabled: this.ver}),
          'nTipo': new FormControl({ value: data.nTipo, disabled: this.ver }),
          'nRqObservacion': new FormControl({ value: data.nRqObservacion, disabled: this.ver }),
          'nRangoMinimo': new FormControl({ value: data.nRangoMinimo, disabled: this.ver }),
          'nRangoMaximo': new FormControl({ value: data.nRangoMaximo, disabled: this.ver }),
          'cDefinicion': new FormControl({ value: data.cDefinicion, disabled: this.ver})
        });
        this.spinner.hideLoading();

      });
  }

  guardar(){
    let model = new Pregunta();

    model.nIdPregunta= this.form.value['nIdPregunta'].value;
    model.nIdGrupo= this.form.value['nIdGrupo'];
    model.cDescripcion= this.form.value['cDescripcion'];
    model.nTipo= this.form.value['nTipo'];
    model.nRqObservacion= (this.form.value['nRqObservacion']== true)? 1: 0;
    model.nRangoMinimo= this.form.value['nRangoMinimo'];
    model.nRangoMaximo= this.form.value['nRangoMaximo'];
    model.cDefinicion= this.form.value['cDefinicion'];
    //model.cDefinicion= '';

    this.spinner.showLoading();
    this.preguntaService.guardar(model).subscribe(data=>{

      this.notifierService.showNotification(data.typeResponse!,'Mensaje',data.message!);

      if(data.typeResponse==environment.EXITO){
        this.router.navigate(['/page/pregunta']);
        this.spinner.hideLoading();
      }else{
        this.spinner.hideLoading();
      }      
    });
  }

  cambioTipoPregunta(newTipo: number){
    if(this.curPregunta !== undefined){
      this.curPregunta.nTipo = newTipo;

      this.pregdinamicaService.actualizaPregunta(this.curPregunta);
    }    
    //debugger;
  }
}
