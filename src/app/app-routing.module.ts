import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
// import {PatientListComponent} from './patients/patient-list/patient-list.component';


const routes: Routes = [
  // { path: 'patients', component: PatientListComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/patients', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    // FormsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
      )
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
