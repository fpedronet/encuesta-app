import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { LayoutComponent } from './component/layout/layout.component';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { PageRoutingModule } from './page-routing.module';
import { InterceptorService } from '../_interceptors/interceptor.service';
import { Not404Component } from './not404/not404.component';
import { LsistemaComponent } from './sistema/lsistema/lsistema.component';
import { CsistemaComponent } from './sistema/csistema/csistema.component';
import { LgrupoComponent } from './grupo/lgrupo/lgrupo.component';
import { CgrupoComponent } from './grupo/cgrupo/cgrupo.component';
import { CencuestaComponent } from './encuesta/cencuesta/cencuesta.component';
import { LencuestaComponent } from './encuesta/lencuesta/lencuesta.component';
import { LpreguntaComponent } from './pregunta/lpregunta/lpregunta.component';
import { CpreguntaComponent } from './pregunta/cpregunta/cpregunta.component';
import { LclienteComponent } from './cliente/lcliente/lcliente.component';
import { CclienteComponent } from './cliente/ccliente/ccliente.component';
import { PregdinamicaComponent } from './component/pregdinamica/pregdinamica.component';
import { LvistaclienteComponent } from './vistacliente/lvistacliente/lvistacliente.component';
import { CvistaclienteComponent } from './vistacliente/cvistacliente/cvistacliente.component';
import { Not403Component } from './not403/not403.component';

@NgModule({
  declarations: [
    ConfirmComponent,
    LayoutComponent,
    InicioComponent,
    Not404Component,
    LsistemaComponent,
    CsistemaComponent,
    LgrupoComponent,
    CgrupoComponent,
    CencuestaComponent,
    LencuestaComponent,
    LpreguntaComponent,
    CpreguntaComponent,
    LclienteComponent,
    CclienteComponent,
    PregdinamicaComponent,
    LvistaclienteComponent,
    CvistaclienteComponent,
    Not403Component,
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
    multi: true,
    
  }
],
})
export class PageModule { }
