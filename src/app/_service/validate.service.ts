import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidateService implements CanActivate {

  constructor(

    private usuarioService: UsuarioService,
    private router: Router

  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    //1) VERIFICAR SI ESTA LOGUEADO
    let rpta = this.usuarioService.isLogin();
    if (!rpta) {
      this.usuarioService.closeLogin();
      return false;
    }
    //2) VERIFICAR SI EL TOKEN NO HA EXPIRADO
    const helper = new JwtHelperService();
    let token = localStorage.getItem(environment.TOKEN_NAME);
    if (!helper.isTokenExpired(token!)) {
      //3) VERIFICAR SI TIENES EL ROL NECESARIO PARA ACCEDER A ESA PAGINA  
      //url -> /pages/consulta

      // let url = state.url;
      // const decodedToken = helper.decodeToken(token!);
      
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
      // this.router.navigate(['/page/inicio']);
      return true;
    } else {
      this.usuarioService.closeLogin();
      return false;
    }
  }  
}
