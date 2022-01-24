import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';

import { Sistema } from 'src/app/_model/sistema';
import { SistemaService } from 'src/app/_service/sistema.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-csistema',
  templateUrl: './csistema.component.html',
  styleUrls: ['./csistema.component.css']
})
export class CsistemaComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService : NotifierService,
    private spinner : SpinnerService,
    private sistemaService : SistemaService,
  ) { }

  form: FormGroup = new FormGroup({});
  id: number = 0;
  ver: boolean = true;

  ngOnInit(): void { 
    this.form = new FormGroup({
      'nIdSistemas': new FormControl({ value: '0' }),
      'nCodigo': new FormControl({ value: '###', disabled: true }),
      'cSistemas': new FormControl({ value: '', disabled: false})
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
      this.sistemaService.obtener(this.id).subscribe(data=>{

        this.form = new FormGroup({
          'nIdSistemas': new FormControl({ value: data.nIdSistemas }),
          'nCodigo': new FormControl({ value: data.nIdSistemas, disabled: true }),
          'cSistemas': new FormControl({ value: data.cSistemas, disabled: this.ver})
        });
        this.spinner.hideLoading();

      });      
    }
  }

  guardar(){
    let model = new Sistema();

    model.nIdSistemas= this.form.value['nIdSistemas'].value;
    model.cSistemas= this.form.value['cSistemas'];

    this.spinner.showLoading();
    this.sistemaService.guardar(model).subscribe(data=>{

      this.notifierService.showNotification(data.typeResponse!,'Mensaje',data.message!);

      if(data.typeResponse==environment.EXITO){
        this.router.navigate(['/page/sistema']);
        this.spinner.hideLoading();
      }else{
        this.spinner.hideLoading();
      }
    });
  }
}
