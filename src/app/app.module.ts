import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateComponent } from './page/grupo/create/create.component';
import { ListaComponent } from './page/grupo/lista/lista.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './page/component/confirm/confirm.component';
import { SpinnerComponent } from './page/component/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ListaComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
