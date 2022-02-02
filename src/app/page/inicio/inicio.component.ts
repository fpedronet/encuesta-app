import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from "@auth0/angular-jwt";
import { EncuestaService } from 'src/app/_service/encuesta.service';
import { environment } from 'src/environments/environment';
import { NotifierService } from '../component/notifier/notifier.service';
import { LvistaclienteComponent } from '../vistacliente/lvistacliente/lvistacliente.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private encuestaService : EncuestaService,
    private notifierService : NotifierService,
  ) { }

  usuario?: string;

  ngOnInit(): void {
    // const helper = new JwtHelperService();

    // let token = localStorage.getItem(environment.TOKEN_NAME);
    // const decodedToken = helper.decodeToken(token!);
    // this.usuario = decodedToken.usuario;

    this.encuestaService.existeEncuesta().subscribe(data=>{

      if(data.items.length > 0){
        this.dialog.open(LvistaclienteComponent, {
          width: '850px'
        });
      }
    });
  }

  abrirListaEncuestaCliente() {
    this.encuestaService.existeEncuesta().subscribe(data=>{

      if(data.items.length > 0){
        this.dialog.open(LvistaclienteComponent, {
          width: '850px'
        });
      }else{
        this.notifierService.showNotification(2,'Mensaje','No hay encuesta para esta fecha..!');
      }
    });
  }
}
