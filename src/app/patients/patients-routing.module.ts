import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PatientListComponent} from './patient-list/patient-list.component';
import {PatientDetailComponent} from './patient-detail/patient-detail.component';
import {AdminComponent} from './admin/admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../auth/auth.guard';


const patientsRoutes: Routes = [
  {path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'patients',  component: PatientListComponent, data: { animation: 'patients' } },
          { path: 'patient/:id', component: PatientDetailComponent, data: { animation: 'patient' } },
          { path: '', redirectTo: 'patients', pathMatch: 'full'  }
        ]
      }
    ]
  }

  // Transitions are based on states and you'll use the animation data from the route to provide a named animation state for the transitions
  // { path: 'patients',  component: PatientListComponent, data: { animation: 'patients' } },
  // { path: 'patient/:id', component: PatientDetailComponent, data: { animation: 'patient' } }
];

@NgModule({
  imports: [RouterModule.forChild(patientsRoutes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
