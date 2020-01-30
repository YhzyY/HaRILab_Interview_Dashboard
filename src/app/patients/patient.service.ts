import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import { Patient } from './patient';
// import { PATIENTS } from './mock-patients';
import { MessageService } from '../message.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private PatientList: Patient[];

  constructor(private messageService: MessageService) { }

  // getPatients(): Observable<Patient[]> {
  //   this.messageService.add('PatientService: fetched patients');
  //   return of(PATIENTS);
  // }

  // getPatients() {
  //   this.getList();
  // }

  // getPatient(id: number | string) {
    // return this.getPatients().pipe(
    //   // (+) before `id` turns the string into a number
    //   map((patients: Patient[]) => patients.find(patient => patient.id === +id))
    // );
  // }

//   getList() {
//     this.requestPatientsList().subscribe(result => {
//       this.parseJSON(result);
//       this.patients$ = this.route.paramMap.pipe(
//         switchMap(params => {
//           // (+) before `params.get()` turns the string into a number
//           this.selectedId = +params.get('id');
//           return of(this.PatientList);
//         })
//       );
//     });
//   }
//
//   requestPatientsList() {
//     return this.http.get<string>(
//       'https://stormy-dawn-15351.herokuapp.com/todayAttacks?' +
//       'today=' + new Date().toLocaleDateString() +
//       '&uuid=' + '33-hl2',
//       {responseType: 'json' });
//   }
//
//   parseJSON(result: string) {
//     console.log(JSON.stringify(result));
//     this.PatientList = JSON.parse(JSON.stringify(result)) as Patient[];
//   }
}
