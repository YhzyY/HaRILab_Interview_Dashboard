import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Patient} from '../patient';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {PatientService} from '../patient.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patient$: Observable<Patient>;
  constructor(
    // asks Angular to inject services that the component requires
    private route: ActivatedRoute,
    private router: Router,
    private service: PatientService
  ) { }

  ngOnInit() {
  //  use the ActivatedRoute service to retrieve the parameters for the route
    this.patient$ = this.route.paramMap.pipe(
      // The paramMap processing is a bit tricky. When the map changes, you get() the id parameter from the changed parameters.
      switchMap((params: ParamMap) =>
        this.service.getPatient(params.get('id')))
    );
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.patient$ = this.service.getPatient(id);
  }

  gotoPatients(patient: Patient) {
    const patientId = patient ? patient.id : null;
    this.router.navigate(['/admin/patients', { id: patientId}]); // optional parameters: { id: patientId}
  }

}
