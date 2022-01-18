import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './page/grupo/lista/lista.component';
import { CreateComponent } from './page/grupo/create/create.component';

const routes: Routes = [
  // {
  //   path:'grupo', component: ListaComponent, children:[
  //   {path:'grupocreate', component: CreateComponent}
  // ]},
  {path:'grupo', component: ListaComponent},
  {path:'grupo/create', component: CreateComponent},
  {path:'grupo/edit/:id', component: CreateComponent},
  {path:'grupo/ver/:id/:ver', component: CreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
