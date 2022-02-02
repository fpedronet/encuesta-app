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
import { Respuesta } from 'src/app/_model/respuesta';

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
  vistaCli: number = 0;
  idEnc: number = 0;
  idCli: number = 0;
  listaEncuestaPregunta: EncuestaPregunta[] = [];
  
  nIdEncuesta: number = 0;
  cTitulo: string = '';
  cDescripcion: string = '';

  existeRespuesta: boolean = true;
  
  @ViewChildren(PregdinamicaComponent) listaComponentes: QueryList<PregdinamicaComponent> = new QueryList<PregdinamicaComponent>();

  ngOnInit(): void {
    this.form = new FormGroup({
      
    });
    this.route.params.subscribe((data: Params)=>{
      this.vistaCli = (data["vistaCli"]==undefined)? 0:data["vistaCli"];
      this.idEnc = (data["idEnc"]==undefined)? 0:data["idEnc"];
      this.idCli = (data["idCli"]==undefined)? 0:data["idCli"];
      this.obtener();
    });    
  }

  ngAfterViewInit () { //Aquí ya se tiene la lista de componentes hijo
    
  }

  obtener(){
    this.spinner.showLoading();
    this.encuestaService.obtener(this.idEnc, this.vistaCli, this.idCli).subscribe(data=>{

      this.form = new FormGroup({
      
      });

      this.nIdEncuesta= data.nIdEncuesta!;
      this.cTitulo=  data.cTitulo!;
      this.cDescripcion= data.cDescripcion!;
      this.listaEncuestaPregunta = data.listaEncuestaPregunta;

      this.encuestaService.existeRespuesta(this.idEnc, this.idCli).subscribe(data=>{
        if(data.items.length > 0){
          this.existeRespuesta = true;
          this.listaEncuestaPregunta.forEach(preg => {
            let compRpta = this.listaComponentes.find(e => e.curPregunta.nIdEncuestaPregunta === preg.nIdEncuestaPregunta)!;
            compRpta.setAnswers(preg.respuesta?.cRespuestaOpt, preg.respuesta?.cRespuestaObs);
          });
        }
        else{
          this.existeRespuesta = false;
        }
      });

      this.spinner.hideLoading();

    });
  }

  enviar(){
    //debugger;

    let model = new Encuesta();

    model.listaEncuestaPregunta = this.listaEncuestaPregunta;
    model.listaEncuestaPregunta.forEach(preg => {
      
      //Crea modelo para respuesta
      var rpta = new Respuesta();

      //Busca el componente correcto según su ID
      let compRpta = this.listaComponentes.find(e => e.curPregunta.nIdEncuestaPregunta === preg.nIdEncuestaPregunta);

      //Respuestas (opción y observación)
      var rptas = ['', ''];
      rptas = compRpta?.returnAnswer()!;

      if(compRpta !== undefined){
        rpta.nIdRespuesta = 0;
        rpta.nIdEncuestaPregunta = preg.nIdEncuestaPregunta;
        //rpta.nIdCliente = 0; //
        rpta.cRespuestaOpt = rptas[0];
        rpta.cRespuestaObs = rptas[1];
        rpta.cIdentificador = '';
        //rpta.dFecha = undefined; //
        //rpta.cUsuario = '' //
      }

      preg.respuesta = rpta;
      
    });

    //debugger;

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
