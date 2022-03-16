import { Pregunta } from './../../../_model/pregunta';
import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';
import { EncuestaService } from 'src/app/_service/encuesta.service';
import { EncuestaPregunta } from 'src/app/_model/encuestaPregunta';
import { PregdinamicaService } from '../../component/pregdinamica/pregdinamica.service';
import { PregdinamicaComponent } from '../../component/pregdinamica/pregdinamica.component';
import { ConfimService } from './../../component/confirm/confim.service';

import { Encuesta } from 'src/app/_model/encuesta';
import { environment } from 'src/environments/environment';
import { Respuesta } from 'src/app/_model/respuesta';
import { EncrDecrService } from 'src/app/_service/encr-decr.service';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-cvistacliente',
  templateUrl: './cvistacliente.component.html',
  styleUrls: ['./cvistacliente.component.css']
})
export class CvistaclienteComponent implements OnInit {
  httpClient: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService : NotifierService,
    private spinner : SpinnerService,

    private encuestaService : EncuestaService,
    private pregdinamicaService: PregdinamicaService,
    private EncrDecr: EncrDecrService,
    private usuarioService : UsuarioService,
    private confimService : ConfimService,
    
  ) { }

  form: FormGroup = new FormGroup({});
  vistaCli: number = 0;
  idEnc: number = 0;
  idCli: number = 0;
  nomUsu: string = '';
  clientUsu: string = '';
  fechaRegistro: string = '';
  listaEncuestaPregunta: EncuestaPregunta[] = [];
  
  nIdEncuesta: number = 0;
  cTitulo: string = '';
  cDescripcion: string = '';

  existeRespuesta: boolean = true;
  
  imgeencuesta?: string =environment.UrlImage + "logo2.png";

  @ViewChildren(PregdinamicaComponent) listaComponentes: QueryList<PregdinamicaComponent> = new QueryList<PregdinamicaComponent>();

  ngOnInit(): void {
    this.form = new FormGroup({
      
    });
    this.route.params.subscribe((data: Params)=>{
      let id = (data["id"]==undefined)? 0:data["id"];
      let key = this.EncrDecr.get(id);
      // let key = id;

      if(key!="" && key!=undefined){
        let split = key.split('-');

        this.vistaCli = parseInt(split[0]);
        this.idEnc =  parseInt(split[1]);
        this.idCli =  parseInt(split[2]);
        this.nomUsu = split[3].toString();
        this.clientUsu = split[4].toString();

        if(this.nomUsu.trim()==""){
          let usuario = this.usuarioService.sessionUsuario();

          this.clientUsu = usuario.descripcion;
          this.nomUsu = usuario.usuario;
        }
      }     

      this.obtener();
    });    
  }

  ngAfterViewInit () { //Aquí ya se tiene la lista de componentes hijo
    
  }

  obtener(){
    this.spinner.showLoading();
    this.encuestaService.obtener(this.idEnc, this.vistaCli, this.idCli, this.nomUsu).subscribe(data=>{

      this.form = new FormGroup({
      
      });

      this.nIdEncuesta= data.nIdEncuesta!;
      this.cTitulo=  data.cTitulo!;
      this.cDescripcion= data.cDescripcion!;
      
      this.listaEncuestaPregunta = data.listaEncuestaPregunta;
      //Inicializa objetos de definiciones
      this.listaEncuestaPregunta.forEach(p => {
        p.oDefinicion = {
          opciones: [],
          minEscala: '',
          maxEscala: '',
          descObs: ''
        };
      });

      this.encuestaService.existeRespuesta(this.idEnc, this.idCli, this.nomUsu).subscribe(data=>{
        if(data.items.length > 0){
          var listaRpta: Respuesta[] = data.items;
          this.fechaRegistro = listaRpta[0].sFecha!;
          this.existeRespuesta = true;
          this.listaEncuestaPregunta.forEach(preg => {
            let compRpta = this.listaComponentes.find(e => e.curPregunta.nIdEncuestaPregunta === preg.nIdEncuestaPregunta)!;
            compRpta.setAnswers(preg.respuesta?.cRespuestaOpt, preg.respuesta?.cRespuestaObs);
          });
          if(this.vistaCli === 1)
            this.muestraExistente();
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

  muestraExistente(){
    let msg1: string = "Se ha registrado una respuesta en la encuesta con los siquientes datos:";
    let msg2: string = "Cliente: " + this.clientUsu;
    let msg3: string = "Usuario: " + this.nomUsu;
    let msg4: string = "¿Desea volver a iniciar sesión?";
    this.confimService.openConfirmDialog(msg1, msg2, msg3, msg4).afterClosed().subscribe(res =>{
      if(res){
        localStorage.clear();
        this.router.navigate(['']);
      }
    });
  }

  btnUndo(){
    let undoRoute = '/page/encuesta/ver/' + this.idEnc?.toString() + '/true';
    this.router.navigate([undoRoute]);
       //this.spinner.hideLoading();
  }
}
