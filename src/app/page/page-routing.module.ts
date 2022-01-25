import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../_service/guard.service';

import { LgrupoComponent } from './grupo/lgrupo/lgrupo.component';
import { CgrupoComponent } from './grupo/cgrupo/cgrupo.component';

import { InicioComponent } from './inicio/inicio.component';

import { LsistemaComponent } from './sistema/lsistema/lsistema.component';
import { CsistemaComponent } from './sistema/csistema/csistema.component';

import { LclienteComponent } from './cliente/lcliente/lcliente.component';
import { CclienteComponent } from './cliente/ccliente/ccliente.component';

import { LencuestaComponent } from './encuesta/lencuesta/lencuesta.component';
import { CencuestaComponent } from './encuesta/cencuesta/cencuesta.component';

const routes: Routes = [
  {path:'inicio', component: InicioComponent, canActivate: [GuardService]},

  {path:'grupo', component: LgrupoComponent, canActivate: [GuardService]},
  {path:'grupo/create', component: CgrupoComponent, canActivate: [GuardService]},
  {path:'grupo/edit/:id', component: CgrupoComponent, canActivate: [GuardService]},
  {path:'grupo/ver/:id/:ver', component: CgrupoComponent, canActivate: [GuardService]},

  {path:'sistema', component: LsistemaComponent, canActivate: [GuardService]},
  {path:'sistema/create', component: CsistemaComponent, canActivate: [GuardService]},
  {path:'sistema/edit/:id', component: CsistemaComponent, canActivate: [GuardService]},
  {path:'sistema/ver/:id/:ver', component: CsistemaComponent, canActivate: [GuardService]},

  {path:'cliente', component: LclienteComponent, canActivate: [GuardService]},
  {path:'cliente/create', component: CclienteComponent, canActivate: [GuardService]},
  {path:'cliente/edit/:id', component: CclienteComponent, canActivate: [GuardService]},
  {path:'cliente/ver/:id/:ver', component: CclienteComponent, canActivate: [GuardService]},

  {path:'encuesta', component: LencuestaComponent, canActivate: [GuardService]},
  {path:'encuesta/create', component: CencuestaComponent, canActivate: [GuardService]},
  {path:'encuesta/edit/:id', component: CencuestaComponent, canActivate: [GuardService]},
  {path:'encuesta/ver/:id/:ver', component: CencuestaComponent, canActivate: [GuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
