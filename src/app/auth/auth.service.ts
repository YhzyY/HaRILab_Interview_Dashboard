import { Injectable } from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {catchError, delay, tap} from 'rxjs/operators';
import {HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import * as url from 'url';
// import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // clinician: Observable<Clinician>;
  // / isLoggedIn flag to tell whether the user is authenticated
  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  restStatus = null;
  userName = '';
  clinicianName: string;
  postFeedback: string;

  constructor(private http: HttpClient) { }

  greeting(): Observable<string> {
    return this.http.get<string>('https://stormy-dawn-15351.herokuapp.com/greeting');
  }

  login(username: string, password: string): Observable<boolean> {

    this.checkClinician(username, password).subscribe(
      data => {
        this.clinicianName = data;

        console.log('test in auth.service.ts ' + this.isLoggedIn);
        console.log('clinician name : ', this.clinicianName);
        if (this.clinicianName != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });

    return of(true).pipe(
      delay(1000)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  signup(newName: string, newPassword: number): void {
    console.log('signup : ' + newName + ' and ' + newPassword);
    this.addClinician(newName, newPassword).subscribe(
      result => {this.postFeedback = result; console.log(this.postFeedback); alert(this.postFeedback);
      });
  }

  checkClinician(Urlusername, Urlpassword) {
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<string>(
      'https://stormy-dawn-15351.herokuapp.com/ClinicianLogin?' +
      'userName=' + Urlusername + '&password=' + Urlpassword,
      {responseType: 'text' as 'json' });
  }

  addClinician(newName: string, newPassword: number) {
    return this.http.post<string>(
      'https://stormy-dawn-15351.herokuapp.com/newClinician?userName=' + newName + '&password=' + newPassword,
      null,
      {responseType: 'text' as 'json' });
  }

}
