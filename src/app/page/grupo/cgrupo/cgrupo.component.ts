import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';

import { Grupo } from 'src/app/_model/grupo';
import { GrupoService } from 'src/app/_service/grupo.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cgrupo',
  templateUrl: './cgrupo.component.html',
  styleUrls: ['./cgrupo.component.css']
})
export class CgrupoComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService : NotifierService,
    private spinner : SpinnerService,
    private grupoService : GrupoService,
  ) { }

  form: FormGroup = new FormGroup({});
  id: number = 0;
  ver: boolean = true;

  ngOnInit(): void { 
    this.form = new FormGroup({
      'nIdGrupo': new FormControl({ value: 0 }),
      'nCodigo': new FormControl({ value: '###', disabled: true }),
      'cDescripcion': new FormControl({ value: '', disabled: false})
    });

    this.route.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? 0:data["id"];
      this.ver = (data["ver"]=='true')? true : false
      this.obtener();
    });
  }

  obtener(){
    if(this.id!=0){
      this.spinner.showLoading();
      this.grupoService.obtener(this.id).subscribe(data=>{

        this.form = new FormGroup({
          'nIdGrupo': new FormControl({ value: data.nIdGrupo }),
          'nCodigo': new FormControl({ value: data.nIdGrupo, disabled: true }),
          'cDescripcion': new FormControl({ value: data.cDescripcion, disabled: this.ver})
        });
        this.spinner.hideLoading();

      });      
    }
  }

  guardar(){
    let model = new Grupo();

    model.nIdGrupo= this.form.value['nIdGrupo'].value;
    model.cDescripcion= this.form.value['cDescripcion'];

    this.spinner.showLoading();
    this.grupoService.guardar(model).subscribe(data=>{

      this.notifierService.showNotification(data.typeResponse!,'Mensaje',data.message!);

      if(data.typeResponse==environment.EXITO){
        this.router.navigate(['/page/grupo']);
        this.spinner.hideLoading();
      }else{
        this.spinner.hideLoading();
      }      
    });
  }
}
