import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientsModule } from './patients/patients.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {PatientListComponent} from './patients/patient-list/patient-list.component';
// import {PatientDetailComponent} from './patients/patient-detail/patient-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    // PatientListComponent,
    // PatientDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PatientsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
