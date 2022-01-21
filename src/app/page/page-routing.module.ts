import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../_service/guard.service';
import { CreateComponent } from './grupo/create/create.component';
import { ListaComponent } from './grupo/lista/lista.component';
import { InicioComponent } from './inicio/inicio.component';
import { LsistemaComponent } from './sistema/lsistema/lsistema.component';
import { CsistemaComponent } from './sistema/csistema/csistema.component';

const routes: Routes = [
  {path:'inicio', component: InicioComponent, canActivate: [GuardService]},
  {path:'grupo', component: ListaComponent, canActivate: [GuardService]},
  {path:'grupo/create', component: CreateComponent, canActivate: [GuardService]},
  {path:'grupo/edit/:id', component: CreateComponent, canActivate: [GuardService]},
  {path:'grupo/ver/:id/:ver', component: CreateComponent, canActivate: [GuardService]},

  {path:'sistema', component: LsistemaComponent, canActivate: [GuardService]},
  {path:'sistema/create', component: CsistemaComponent, canActivate: [GuardService]},
  {path:'sistema/edit/:id', component: CsistemaComponent, canActivate: [GuardService]},
  {path:'sistema/ver/:id/:ver', component: CsistemaComponent, canActivate: [GuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
