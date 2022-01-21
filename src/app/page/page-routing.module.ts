import { LoginComponent } from './usuario/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../_service/guard.service';
import { CreateComponent } from './grupo/create/create.component';
import { ListaComponent } from './grupo/lista/lista.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {path:'inicio', component: InicioComponent, canActivate: [GuardService]},
  {path:'grupo', component: ListaComponent, canActivate: [GuardService]},
  {path:'grupo/create', component: CreateComponent, canActivate: [GuardService]},
  {path:'grupo/edit/:id', component: CreateComponent, canActivate: [GuardService]},
  {path:'grupo/ver/:id/:ver', component: CreateComponent, canActivate: [GuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
