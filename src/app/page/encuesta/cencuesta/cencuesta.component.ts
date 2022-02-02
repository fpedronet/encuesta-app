import { Pregunta } from './../../../_model/pregunta';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';
// import publicIp from 'public-ip';

import { Encuesta } from 'src/app/_model/encuesta';
import { Sistema } from 'src/app/_model/sistema';
import { Cliente } from 'src/app/_model/cliente';
import { EncuestaService } from 'src/app/_service/encuesta.service';
import { environment } from 'src/environments/environment';
import { EncuestaPregunta } from 'src/app/_model/encuestaPregunta';

@Component({
  selector: 'app-cencuesta',
  templateUrl: './cencuesta.component.html',
  styleUrls: ['./cencuesta.component.css']
})
export class CencuestaComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService : NotifierService,
    private spinner : SpinnerService,

    private encuestaService : EncuestaService,
    private _formBuilder: FormBuilder
  ) { }

  /*tabla de encuesta maestra */
  form: FormGroup = new FormGroup({});
  id: number = 0;
  ver: boolean = true;
  seleccionado?: string;
  listaSistema?: Sistema[] = [];
  listaCliente?: Cliente[] = [];
  listaIdCliente?: number[] = [];
  listaPregunta: Pregunta[] =[];
  listaEncuestaPregunta: EncuestaPregunta[] = [];

  /*Listado de pregunta tabla maestra */
  displayedColumnsP: string[] = ['cDescripcion', 'nAccion'];

  /*Listado de respuesta */
  listaRespuesta: Pregunta[] = [];
  displayedColumnsR: string[] = ['nIdPregunta', 'cGrupo','cDescripcion','nTipo', 'nAccion'];
  loading = true;
  existRegistro = false;
  countRegistro = 0;

  listaId?: string;
  isChecked! : boolean;

  ngOnInit(): void { 
    this.form = new FormGroup({
      'nIdEncuesta': new FormControl({ value: 0 }),
      'nCodigo': new FormControl({ value: '###', disabled: true }),
      'nIdSistemas': new FormControl({ value: '', disabled: false}),
      'nIdCliente': new FormControl({ value: '', disabled: false}),
      'cTitulo': new FormControl({ value: '', disabled: false}),
      'cDescripcion': new FormControl({ value: '', disabled: false}),
      'dFechaIni': new FormControl({ value: null, disabled: false}),
      'dFechaFin': new FormControl({ value: null, disabled: false})
    });

    this.route.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? 0:data["id"];
      this.ver = (data["ver"]=='true')? true : false
      this.obtener();
    });
  }

  obtener(){

//     console.log(publicIp.v4());

// console.log(publicIp.v6());

    this.spinner.showLoading();
    this.encuestaService.obtener(this.id, 0).subscribe(data=>{

      this.listaSistema= data.listaSistema;
      this.listaCliente= data.listaCliente;
      this.listaIdCliente= data.listaIdCliente;
      this.listaPregunta= data.listaPregunta;
      this.listaEncuestaPregunta= data.listaEncuestaPregunta; 

      this.listaRespuesta = data.listaPregunta;

      this.form = new FormGroup({
        'nIdEncuesta': new FormControl({ value: data.nIdEncuesta }),
        'nCodigo': new FormControl({ value: data.nIdEncuesta, disabled: true }),
        'nIdSistemas': new FormControl({ value: data.nIdSistemas, disabled: this.ver}),
        'nIdCliente': new FormControl({ value: data.nIdCliente, disabled: this.ver}),
        'cTitulo': new FormControl({ value: data.cTitulo, disabled: this.ver}),
        'cDescripcion': new FormControl({ value: data.cDescripcion, disabled: this.ver}),
        'dFechaIni': new FormControl({ value: data.dFechaIni, disabled: this.ver}),
        'dFechaFin': new FormControl({ value: data.dFechaFin, disabled: this.ver})
      });
      this.spinner.hideLoading();

    });
  }

  listarclienteporsistema(nIdSistemas: number){
    this.spinner.showLoading();
    this.encuestaService.listarclienteporsistema(nIdSistemas).subscribe(data=>{
      
      this.listaCliente= data.items;
      this.listaIdCliente=[];
      this.spinner.hideLoading();
    });
  }

  guardar(){
    let model = new Encuesta();

    model.nIdEncuesta= this.form.value['nIdEncuesta'].value;
    model.nIdSistemas= this.form.value['nIdSistemas'];
    model.cTitulo= this.form.value['cTitulo'];
    model.cDescripcion= this.form.value['cDescripcion'];
    model.dFechaIni= this.form.value['dFechaIni'];
    model.dFechaFin= this.form.value['dFechaFin'];
    model.listaIdCliente = this.form.value['nIdCliente']; 
    model.listaEncuestaPregunta = this.listaEncuestaPregunta; 

    this.spinner.showLoading();
    this.encuestaService.guardar(model).subscribe(data=>{

    this.notifierService.showNotification(data.typeResponse!,'Mensaje',data.message!);

    if(data.typeResponse==environment.EXITO){
       this.router.navigate(['/page/encuesta']);
       this.spinner.hideLoading();
    }else{
       this.spinner.hideLoading();
    }
    });
  }

  checkPregunta(element: EncuestaPregunta, e: any){

    if(e.checked){
      let model =new EncuestaPregunta();

      model.nIdEncuestaPregunta=element.nIdEncuestaPregunta;
      model.nIdPregunta=element.nIdPregunta;
      model.nIdGrupo=element.nIdGrupo;
      model.cDescripcion=element.cDescripcion;
      model.nTipo=element.nTipo;
      model.nRqObservacion=element.nRqObservacion;
      model.nRangoMinimo=element.nRangoMinimo;
      model.nRangoMaximo=element.nRangoMaximo;
      model.cDefinicion=element.cDefinicion;
  
      this.listaEncuestaPregunta.push(model);
    }
    else{
      this.listaEncuestaPregunta = this.listaEncuestaPregunta.filter(y=>y.nIdPregunta!=element.nIdPregunta);  
    }    
  }
}