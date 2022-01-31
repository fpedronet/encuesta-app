import { Pregunta } from './../../../_model/pregunta';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';
import { EncuestaService } from 'src/app/_service/encuesta.service';
import { EncuestaPregunta } from 'src/app/_model/encuestaPregunta';
import { PregdinamicaService } from '../../component/pregdinamica/pregdinamica.service';

@Component({
  selector: 'app-cvistacliente',
  templateUrl: './cvistacliente.component.html',
  styleUrls: ['./cvistacliente.component.css']
})
export class CvistaclienteComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService : NotifierService,
    private spinner : SpinnerService,

    private encuestaService : EncuestaService,
    private pregdinamicaService: PregdinamicaService
  ) { }

  form: FormGroup = new FormGroup({});
  id: number = 0;
  listaEncuestaPregunta: EncuestaPregunta[] = [];
  
  nIdEncuesta: number = 0;
  cTitulo: string = '';
  cDescripcion: string = '';

  ngOnInit(): void {
    this.form = new FormGroup({
      
    });
    this.route.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? 0:data["id"];
      this.obtener();
    });
  }

  obtener(){
    this.spinner.showLoading();
    this.encuestaService.obtener(this.id).subscribe(data=>{

      this.form = new FormGroup({
      
      });

      this.nIdEncuesta= data.nIdEncuesta!;
      this.cTitulo=  data.cTitulo!;
      this.cDescripcion= data.cDescripcion!;
      this.listaEncuestaPregunta = data.listaEncuestaPregunta;



      this.spinner.hideLoading();

    });
  }

  guardar(){

  }
}
