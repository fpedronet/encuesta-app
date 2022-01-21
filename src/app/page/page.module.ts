import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { CreateComponent } from './grupo/create/create.component';
import { ListaComponent } from './grupo/lista/lista.component';
import { LayoutComponent } from './component/layout/layout.component';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { PageRoutingModule } from './page-routing.module';
import { InterceptorService } from '../_interceptors/interceptor.service';
import { Not404Component } from './not404/not404.component';
import { LsistemaComponent } from './sistema/lsistema/lsistema.component';
import { CsistemaComponent } from './sistema/csistema/csistema.component';

@NgModule({
  declarations: [
    CreateComponent,
    ListaComponent,
    ConfirmComponent,
    LayoutComponent,
    InicioComponent,
    Not404Component,
    LsistemaComponent,
    CsistemaComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PageRoutingModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }
],
})
export class PageModule { }
