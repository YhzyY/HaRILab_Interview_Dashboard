import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Patient} from '../patient';
import {PatientService} from '../patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients$: Observable<Patient[]>;
  selectedId: number;

  constructor(
    private service: PatientService,
    // The router extracts the route parameter (id:15)
    // from the URL and supplies it to the HeroDetailComponent via the ActivatedRoute service.
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.patients$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.service.getPatients();
      })
    );
  }

}
