import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(

    private usuarioService: UsuarioService,
    private router: Router

  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //1) VERIFICAR SI ESTA LOGUEADO
    let token = localStorage.getItem(environment.TOKEN_NAME);
    let url = state.url;

    if (!token) {
      if(url=="/login" || url==""){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
    }

    //2) VERIFICAR SI EL TOKEN NO HA EXPIRADO
    let helper = new JwtHelperService();
    token = localStorage.getItem(environment.TOKEN_NAME);

    if (!helper.isTokenExpired(token!)) {
      //3) VERIFICAR SI TIENES EL ROL NECESARIO PARA ACCEDER A ESA PAGINA  
      //url -> /pages/consulta

      
       const decodedToken = helper.decodeToken(token!);
      
       if(url=="/login"){
         this.router.navigate(['/page/inicio']);
         return false;
       }

      // return this.menuService.listarPorUsuario(decodedToken.usuario).pipe(map((data: Menu[]) => {
      //   this.menuService.setMenuCambio(data);

      //   let cont = 0;
      //   for (let m of data) {
      //     if (url.startsWith(m.url)) {
      //       cont++;
      //       break;
      //     }
      //   }

      //   if (cont > 0) {
      //     return true;
      //   } else {
      //     this.router.navigate(['/pages/not-403']);
      //     return false;
      //   }

      // }));
      
      return true;
    } else {
      this.usuarioService.closeLogin();
      return false;
    }
  } 
}