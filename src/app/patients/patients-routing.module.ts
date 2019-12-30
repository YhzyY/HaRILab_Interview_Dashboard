import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PatientListComponent} from './patient-list/patient-list.component';
import {PatientDetailComponent} from './patient-detail/patient-detail.component';


const patientsRoutes: Routes = [
  // { path: 'patients',  component: PatientListComponent},
  // { path: 'patient/:id', component: PatientDetailComponent}
  // Transitions are based on states and you'll use the animation data from the route to provide a named animation state for the transitions
  { path: 'patients',  component: PatientListComponent, data: { animation: 'patients' } },
  { path: 'patient/:id', component: PatientDetailComponent, data: { animation: 'patient' } }
];

@NgModule({
  imports: [RouterModule.forChild(patientsRoutes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
