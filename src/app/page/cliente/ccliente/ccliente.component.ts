import { Sistema } from 'src/app/_model/sistema';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotifierService } from 'src/app/page/component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';

import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';
import { ClienteSistema } from 'src/app/_model/clienteSistema';

@Component({
  selector: 'app-ccliente',
  templateUrl: './ccliente.component.html',
  styleUrls: ['./ccliente.component.css']
})
export class CclienteComponent implements OnInit {

  constructor(

    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService : NotifierService,
    private spinner : SpinnerService,

    private clienteService : ClienteService,

  ) { }

  form: FormGroup = new FormGroup({});
  id: number = 0;
  ver: boolean = true;

  listaSistema?: Sistema[] = [];
  listaIdSistema?: number[] = [];

  ngOnInit(): void {

    this.form = new FormGroup({
      'nIdCliente': new FormControl({ value: '0' }),
      'nCodigo': new FormControl({ value: '###', disabled: true }),
      'cDescripcion': new FormControl({ value: '', disabled: false}),
      'cRuc': new FormControl({ value: '', disabled: false}),
      'cContacto': new FormControl({ value: '', disabled: false}),
      'cClave': new FormControl({ value: '', disabled: false}),
      'nIdSistemas': new FormControl(),
      'nEsAdministrador': new FormControl({ value: 0, disabled: false})
    });

    this.route.params.subscribe((data: Params)=>{
      this.id = (data["id"]==undefined)? 0:data["id"];
      this.ver = (data["ver"]=='true')? true : false
      this.obtener();
    });
  }

  obtener(){
      this.spinner.showLoading();
      this.clienteService.obtener(this.id).subscribe(data=>{

       this.listaIdSistema = data.listaIdSistema;
       this.listaSistema = data.listaSistema;
       
       //Pinta como seleccionados todos is es nuevo
       if(this.id == 0){
        this.listaSistema!.forEach(sis => {
          this.listaIdSistema?.push(sis.nIdSistemas!)
        });
       }

       this.form = new FormGroup({
          'nIdCliente': new FormControl({ value: data.nIdCliente }),
          'nCodigo': new FormControl({ value: data.nIdCliente, disabled: true }),
          'cDescripcion': new FormControl({ value: data.cDescripcion, disabled: this.ver}),
          'cRuc': new FormControl({ value: data.cRuc, disabled: this.ver}),
          'cContacto': new FormControl({ value: data.cContacto, disabled: this.ver}),
          'cClave': new FormControl({ value: data.cClave, disabled: this.ver}),
          'nIdSistemas': new FormControl(),
          'nEsAdministrador': new FormControl({ value: data.nEsAdministrador, disabled: this.ver})      
        });

        this.spinner.hideLoading();
      });      
  }


  guardar(){
    let model = new Cliente();

    model.nIdCliente= this.form.value['nIdCliente'].value;
    model.cDescripcion= this.form.value['cDescripcion'];
    model.cRuc= this.form.value['cRuc'];
    model.cContacto= this.form.value['cContacto'];
    model.cDpto= this.form.value['cDpto'];
    model.cProvincia= this.form.value['cProvincia'];
    model.cDistrito= this.form.value['cDistrito'];
    model.cClave= this.form.value['cClave'];
    model.nIdSistemas=0;
    model.listaIdSistema = this.form.value['nIdSistemas'];
    model.nEsAdministrador= (this.form.value['nEsAdministrador']== true)? 1: 0;

    this.spinner.showLoading();
    this.clienteService.guardar(model).subscribe(data=>{

      this.notifierService.showNotification(data.typeResponse!,'Mensaje',data.message!);

      if(data.typeResponse==environment.EXITO){
        this.router.navigate(['/page/cliente']);
        this.spinner.hideLoading();
      }else{
        this.spinner.hideLoading();
      }
    });
  }
}
