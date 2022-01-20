import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateService } from '../_service/validate.service';
import { CreateComponent } from './grupo/create/create.component';
import { ListaComponent } from './grupo/lista/lista.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {path:'inicio', component: InicioComponent, canActivate: [ValidateService]},
  {path:'grupo', component: ListaComponent, canActivate: [ValidateService]},
  {path:'grupo/create', component: CreateComponent, canActivate: [ValidateService]},
  {path:'grupo/edit/:id', component: CreateComponent, canActivate: [ValidateService]},
  {path:'grupo/ver/:id/:ver', component: CreateComponent, canActivate: [ValidateService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
