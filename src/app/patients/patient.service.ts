import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Patient } from './patient';
import { PATIENTS } from './mock-patients';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root',
})
export class PatientService {

  constructor(private messageService: MessageService) { }

  getPatients(): Observable<Patient[]> {
    // TODO: send the message _after_ fetching the patients
    this.messageService.add('PatientService: fetched patients');
    return of(PATIENTS);
  }

  getPatient(id: number | string) {
    return this.getPatients().pipe(
      // (+) before `id` turns the string into a number
      map((patients: Patient[]) => patients.find(patient => patient.id === +id))
    );
  }
}
