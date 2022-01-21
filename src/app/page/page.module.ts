import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppRoutingModule } from '../app-routing.module';
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

@NgModule({
  declarations: [
    CreateComponent,
    ListaComponent,
    ConfirmComponent,
    LayoutComponent,
    InicioComponent,
    Not404Component
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
