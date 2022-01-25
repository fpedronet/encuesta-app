import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';

import { Encuesta } from 'src/app/_model/encuesta';
import { EncuestaService } from 'src/app/_service/encuesta.service';


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
  ) { }

  form: FormGroup = new FormGroup({});
  id: number = 0;
  ver: boolean = true;

  ngOnInit(): void { 
    this.form = new FormGroup({
      //Nueva página para crear encuestas
    });

    this.route.params.subscribe((data: Params)=>{
      this.id = data["id"]
      this.ver = (data["ver"]=='true')? true : false
      this.obtener();
    });
  }

  obtener(){
    if(this.id!=0 && this.id!=undefined){
      this.spinner.showLoading();
      this.encuestaService.obtener(this.id).subscribe(data=>{

        this.form = new FormGroup({
          'nIdEncuesta': new FormControl({ value: data.nIdEncuesta }),
          'nIdSistemas': new FormControl({ value: data.nIdSistemas, disabled: true }),
          'cTitulo': new FormControl({ value: data.cTitulo, disabled: this.ver})
        });
        this.spinner.hideLoading();

      });      
    }
  }

  guardar(){
    let model = new Encuesta();

    /*model.nIdGrupo= this.form.value['nIdGrupo'].value;
    model.cDescripcion= this.form.value['cDescripcion'];

    this.spinner.showLoading();
    this.grupoService.guardar(model).subscribe(data=>{

        this.router.navigate(['/page/grupo']);
        this.notifierService.showNotification(data.typeResponse!,'Mensaje',data.message!);
        this.spinner.hideLoading();
    });*/
  }
}