import { Pregunta } from './../../../_model/pregunta';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';
import { safeJsonParse, isDefinitionObj } from "../../component/pregdinamica/definitionObj";


import { Encuesta } from 'src/app/_model/encuesta';
import { Sistema } from 'src/app/_model/sistema';
import { Cliente } from 'src/app/_model/cliente';
import { RespuestasResumen } from 'src/app/_model/respuestasResumen';
import { ExcelRptasResumen } from 'src/app/_model/excelRptasResumen';
import { EncuestaService } from 'src/app/_service/encuesta.service';
import { environment } from 'src/environments/environment';
import { EncuestaPregunta } from 'src/app/_model/encuestaPregunta';
import { EncrDecrService } from 'src/app/_service/encr-decr.service';
import { FrecuenciaOpcion } from 'src/app/_model/frecuenciaOpcion';

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
    private EncrDecr: EncrDecrService
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
  listaRespuestasResumen: RespuestasResumen[] = [];

  /*Listado de pregunta tabla maestra */
  displayedColumnsP: string[] = ['cDescripcion', 'nAccion'];

  /*Listado de respuesta */
  listaRespuesta: Pregunta[] = [];

  /*Listado de resumen de respuestas para cada pregunta*/
  displayedColumnsResuR: string[] = ['opcion', 'frecuenciaAbs', 'frecuenciaRel'];;
  
  displayedColumnsR: string[] = ['nIdRespuesta', 'cDescripcion','cRuc','dFecha', 'cUsuario','nAccion'];
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

    this.spinner.showLoading();
    this.encuestaService.obtener(this.id, 0, 0, '').subscribe(data=>{

      let idencuesta = data.nIdEncuesta!;

      this.listaSistema= data.listaSistema;
      this.listaCliente= data.listaCliente;
      this.listaIdCliente= data.listaIdCliente;
      this.listaPregunta= data.listaPregunta;
      this.listaEncuestaPregunta= data.listaEncuestaPregunta;      

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

      this.encuestaService.listarRespuestas(idencuesta).subscribe(resp=>{
        this.listaRespuesta = resp.items;
        if(this.listaRespuesta.length > 0)
          this.listarRespuestasResumen();          
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

  listarRespuestasResumen(){
    this.spinner.showLoading();
    this.encuestaService.listarRespuestasResumen(this.id).subscribe(data=>{
      this.listaRespuestasResumen = data.items;
      
      this.listaRespuestasResumen.forEach(resu => {        
      
        //Muestra u oculta opciones y comentarios
        resu.muestraOpt = false;
        resu.muestraObs = false;
        resu.muestraEst = false;

        //Si no es de respuesta corta
        if(resu.pregunta?.nTipo !== 3)
          resu.muestraOpt = true;
        else{
          resu.muestraObs = true;
          resu.tituloObs = 'Respuestas'
        }

        //Escala lineal
        if(resu.pregunta?.nTipo === 2){
          resu.muestraEst = true;
        }

        if(resu.pregunta?.nRqObservacion === 1){
          //Casillas, Sí/No, Varias opciones
          if(resu.pregunta?.nTipo === 1 || resu.pregunta?.nTipo === 4 || resu.pregunta?.nTipo === 5){
            resu.muestraObs = true;
            if(resu.pregunta?.nTipo === 4)
              resu.tituloObs = 'Justificaciones'
            else
              resu.tituloObs = 'Respuestas dadas en Otro'
          }            
        }

        //Añade las opciones a la lista de frecuencias
        resu.frecuencias = [];
        let listaOpcs:string[] = this.extraeListaOpciones(resu.pregunta!)
        listaOpcs.forEach(opc => {
          resu.frecuencias?.push(new FrecuenciaOpcion(opc));
        });
        //Casillas y varias opciones pueden tener una opción extra
        if(resu.pregunta?.nRqObservacion === 1 &&
          (resu.pregunta?.nTipo === 1 || resu.pregunta?.nTipo === 5)){
            resu.frecuencias?.push(new FrecuenciaOpcion("Otro"));
        }

        //Convierte la cadena de opciones marcadas a una lista
        let listaRptas:number[] = [];
        listaRptas = resu.cRptasOpt!.split(',').map(Number);

        //Almacena respuestas en el contador de frecuencias absolutas
        var frecOpc:FrecuenciaOpcion[] = resu.frecuencias!;
        listaRptas.forEach(rpta => {
          if(rpta <= frecOpc.length-1){
            frecOpc[rpta].frecuenciaAbs!++;
          }
        });

        //Actualiza frecuencias relativas
        frecOpc.forEach(frec => {
          if(listaRptas.length > 0)
            frec.frecuenciaRel = frec.frecuenciaAbs! / listaRptas.length;
        });

        //Calcula estadísticas para escala lineal
        if(resu.pregunta?.nTipo === 2){
          resu.promEst = 0;
          var arrFrec:FrecuenciaOpcion[] = frecOpc.slice();
          let indexLastZero = -1;
          arrFrec.sort(function(a, b){return a.frecuenciaAbs! - b.frecuenciaAbs!})
          let index = 0;

          arrFrec.forEach(frec => {
            resu.promEst = resu.promEst! + parseInt(frec.opcion!) * frec.frecuenciaRel!;
            if(frec.frecuenciaAbs === 0) indexLastZero = index;
            index++;
          });
          if(indexLastZero !== 1)
            arrFrec = arrFrec.slice(indexLastZero + 1)

          if(arrFrec.length > 0){
            if(arrFrec.length % 2 === 1){ //Impar
              resu.medEst = parseInt(arrFrec[(arrFrec.length - 1)/2].opcion!);
            }
            else{
              resu.medEst = (Number(arrFrec[(arrFrec.length/2)-1].opcion!) + Number(arrFrec[(arrFrec.length/2)].opcion!))/2
            }
          }          
        }

        //Convierte la cadena de observaciones a una lista
        resu.observaciones = resu.cRptasObs!.split('|').map(String).filter(Boolean);;
        //debugger;

        //this.exportarExcelResumen();
      });      

      this.spinner.hideLoading();
    });
  }

  extraeListaOpciones(preg: EncuestaPregunta){
    var listaOpciones:string[] = [];
    const result = safeJsonParse(isDefinitionObj)(preg.cDefinicion!); // result: ParseResult<definitionObj>
    if (result.hasError) {
      console.log("Error en el la definición de pregunta extraida")  // external data not valid. Do some error handling here.
    } else {
      var obj = result.parsed;

      //Opciones para listas (checkbox y radiobutton)
      listaOpciones = obj.opciones;

      //Opciones para sí/no
      if(preg.nTipo === 4)
        listaOpciones = ['Sí', 'No'];

      //Opciones para escalas
      if(preg.nTipo == 2){ //Escala lineal
        listaOpciones = [];
        var init = preg.nRangoMinimo;
        var end = preg.nRangoMaximo;
        if(init && end){
          for(var i = init; i <= end; i++){
            listaOpciones.push(i.toString());
          }
        }        
      }
    }
    return listaOpciones;
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

  verVistaCliente(idCliente: number, nomUsu: string, nomCliente: string ){
    
    let value =  0 + '-' + this.id + '-' + idCliente + '-' + nomUsu + '-' + nomCliente;

    let key = this.EncrDecr.set(value);

    let url = '/page/vistacliente/'+ key;
    this.router.navigate([url]);
  }

  exportarExcelResumen(){
    var resumenesExcel: ExcelRptasResumen[] = [];
    this.listaRespuestasResumen.forEach(resu => {
      let filaExcel: ExcelRptasResumen = new ExcelRptasResumen(resu.pregunta?.cDescripcion!);
      resumenesExcel.push(filaExcel);
    });

    this.encuestaService.excelRespuestasResumen(resumenesExcel).subscribe(data=>{
      
    });
  }
}