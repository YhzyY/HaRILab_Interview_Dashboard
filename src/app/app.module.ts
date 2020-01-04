import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent, newUserDialogComponent} from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientsModule } from './patients/patients.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientJsonpModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {PatientListComponent} from './patients/patient-list/patient-list.component';
// import {PatientDetailComponent} from './patients/patient-detail/patient-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    newUserDialogComponent,
    // signupDialog
    // PatientListComponent,
    // PatientDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    PatientsModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [newUserDialogComponent]
})
export class AppModule { }
