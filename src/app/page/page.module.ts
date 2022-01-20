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
import { SpinnerModule } from './component/spinner/spinner.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InterceptorService } from '../_interceptors/interceptor.service';

@NgModule({
  declarations: [
    CreateComponent,
    ListaComponent,
    ConfirmComponent,
    LayoutComponent,
    InicioComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // BrowserModule,
    // AppRoutingModule,
    // BrowserAnimationsModule,
    PageRoutingModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }
],
  // bootstrap: [PageModule]
})
export class PageModule { }
