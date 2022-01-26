import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';

import { Encuesta } from 'src/app/_model/encuesta';
import { Sistema } from 'src/app/_model/sistema';
import { Cliente } from 'src/app/_model/cliente';
import { EncuestaService } from 'src/app/_service/encuesta.service';
import { environment } from 'src/environments/environment';

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

  form: FormGroup = new FormGroup({});
  id: number = 0;
  ver: boolean = true;
  listaSistema?: Sistema[] = [];
  listaCliente?: Cliente[] = [];
  listaIdCliente?: number[] = [];

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
    this.spinner.showLoading();
    this.encuestaService.obtener(this.id).subscribe(data=>{

      this.listaSistema= data.listaSistema;
      this.listaCliente= data.listaCliente;
      this.listaIdCliente= data.listaIdCliente;

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
}