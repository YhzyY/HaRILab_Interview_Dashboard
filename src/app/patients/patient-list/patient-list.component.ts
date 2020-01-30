import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Patient} from '../patient';
import {PatientService} from '../patient.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients$: Observable<Patient[]>;
  selectedId: number;
  private PatientList: Patient[];

  constructor(
    private service: PatientService,
    // The router extracts the route parameter (id:15)
    // from the URL and supplies it to the HeroDetailComponent via the ActivatedRoute service.
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  // loadList() {
  //   this.patients$ = this.route.paramMap.pipe(
  //     switchMap(params => {
  //       // (+) before `params.get()` turns the string into a number
  //       this.selectedId = +params.get('id');
  //       return this.service.getPatients();
  //     })
  //   );
  // }

  getList() {
    this.requestPatientsList().subscribe(result => {
      this.parseJSON(result);
      this.patients$ = this.route.paramMap.pipe(
        switchMap(params => {
          // (+) before `params.get()` turns the string into a number
          this.selectedId = +params.get('id');
          return of(this.PatientList);
        })
      );
    });
  }

  requestPatientsList() {
    return this.http.get<string>(
      'https://stormy-dawn-15351.herokuapp.com/PatientList',
      {responseType: 'json' });
  }

  parseJSON(result: string) {
    console.log(JSON.stringify(result));
    this.PatientList = JSON.parse(JSON.stringify(result)) as Patient[];
  }

  ngOnInit() {
    this.getList();
  }

}
