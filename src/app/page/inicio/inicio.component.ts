import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  usuario?: string;

  ngOnInit(): void {
    const helper = new JwtHelperService();

    let token = localStorage.getItem(environment.TOKEN_NAME);
    const decodedToken = helper.decodeToken(token!);
    this.usuario = decodedToken.usuario;
  }

}
