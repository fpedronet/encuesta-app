import { Pregunta } from './../../../_model/pregunta';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';
import { EncuestaService } from 'src/app/_service/encuesta.service';
import { EncuestaPregunta } from 'src/app/_model/encuestaPregunta';
import { PregdinamicaService } from '../../component/pregdinamica/pregdinamica.service';
import { PregdinamicaComponent } from '../../component/pregdinamica/pregdinamica.component';

import { Encuesta } from 'src/app/_model/encuesta';
import { environment } from 'src/environments/environment';

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
  
  @ViewChildren(PregdinamicaComponent) listaComponentes: QueryList<PregdinamicaComponent> = new QueryList<PregdinamicaComponent>();

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
    this.encuestaService.obtener(this.id, 1).subscribe(data=>{

      this.form = new FormGroup({
      
      });

      this.nIdEncuesta= data.nIdEncuesta!;
      this.cTitulo=  data.cTitulo!;
      this.cDescripcion= data.cDescripcion!;
      this.listaEncuestaPregunta = data.listaEncuestaPregunta;



      this.spinner.hideLoading();

    });
  }

  enviar(){
    debugger;
    var e: any = this.listaComponentes;

    let model = new Encuesta();

    model.listaEncuestaPregunta = this.listaEncuestaPregunta;
    model.listaEncuestaPregunta.forEach(preg => {
      let rpta = preg.respuesta;

      //Crea modelo para respuesta
      if(rpta !== undefined){

        //Busca el componente correcto según su ID
        let compRpta = this.listaComponentes.find(e => e.curPregunta.nIdEncuestaPregunta === preg.nIdEncuestaPregunta);

        if(compRpta !== undefined){
          rpta.nIdRespuesta = 0;
          rpta.nIdEncuestaPregunta = preg.nIdEncuestaPregunta;
          rpta.nIdCliente = 0; //
          rpta.cRespuesta = compRpta?.returnAnswer();
          rpta.cIdentificador = '';
          rpta.dFecha = undefined; //
          rpta.cUsuario = '' //
        }
      }
      
    });

    this.spinner.showLoading();
    this.encuestaService.guardarRespuesta(model).subscribe(data=>{

    this.notifierService.showNotification(data.typeResponse!,'Mensaje',data.message!);

    if(data.typeResponse==environment.EXITO){
       this.router.navigate(['/page/inicio']);
       this.spinner.hideLoading();
    }else{
       this.spinner.hideLoading();
    }
    });
  }
}
