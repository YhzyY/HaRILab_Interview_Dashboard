import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import {PatientListComponent} from './patient-list/patient-list.component';
import {PatientDetailComponent} from './patient-detail/patient-detail.component';
import {FormsModule} from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    PatientListComponent,
    PatientDetailComponent,
    AdminComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
