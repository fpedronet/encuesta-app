import { environment } from 'src/environments/environment';
import { Usuario } from './../../../_model/usuario';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/_model/cliente';

import { UsuarioService } from 'src/app/_service/usuario.service';
import { NotifierService } from '../../component/notifier/notifier.service';
import { SpinnerService } from '../../component/spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService : NotifierService,
    private spinner : SpinnerService,
    private usuarioService : UsuarioService,

  ) { }

  form: FormGroup = new FormGroup({});
  cliente: Cliente[] = [];
  nIdCliente?: number;
  usuario?: string;
  clave?: string;
  mensaje?: string;
  error?: string;
  opcionSeleccionado?: number  = 0;

  ngOnInit(): void {
    this.form = new FormGroup({
      'nIdCliente': new FormControl(''),
      'usuario': new FormControl(''),
      'clave': new FormControl('')
    });
    this.listarCliente();
  }

  listarCliente(){
    this.spinner.showLoading();
      this.usuarioService.listarCliente().subscribe(data=>{
        this.cliente= data.items;
        this.spinner.hideLoading();
      });
  }

  login(){
    let model = new Usuario();

    model.nIdCliente= this.form.value['nIdCliente'];
    model.usuario = this.form.value['usuario'];
    model.cClave= this.form.value['clave'];

    this.spinner.showLoading();
    this.usuarioService.login(model).subscribe(data=>{

      debugger;
      if(data.typeResponse==environment.EXITO){
        localStorage.setItem(environment.TOKEN_NAME, data.access_token!);

        this.router.navigate(['/page/inicio']);
      }
            
      this.notifierService.showNotification(data.typeResponse!,'Mensaje',data.message!);
      this.spinner.hideLoading();
    });
  }
}
