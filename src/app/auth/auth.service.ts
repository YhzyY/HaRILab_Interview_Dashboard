import { Injectable } from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
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

  constructor(private http: HttpClient) { }

  greeting(): Observable<string> {
    return this.http.get<string>('https://stormy-dawn-15351.herokuapp.com/greeting');
  }

  login(username: HTMLInputElement, password: HTMLInputElement): Observable<boolean> {
    const params = new HttpParams().set('userName', 'Bean').set('password', '12346');
    // this.clinicianName = this.http.get<string>(
    // 'https://stormy-dawn-15351.herokuapp.com/ClinicianLogin?userName=Bean&password=12345');

    this.checkClinician(username.value, password.value).subscribe(data => this.clinicianName = data);

    // this.http.get<string>(
    //   'https://stormy-dawn-15351.herokuapp.com/ClinicianLogin?userName=Bean&password=12345').subscribe(
    //     (data) => this.clinicianName = data.toString());

    // const response = this.http.get('https://stormy-dawn-15351.herokuapp.com/ClinicianLogin?userName=Bean&password=12345',
    //   { responseType: 'text' as 'json'}).subscribe();


    console.log('clinician name : ', this.clinicianName);
    if (this.clinicianName != null) {
      return of(true).pipe(
        tap(val => this.isLoggedIn = true)
      );
    } else {
      this.isLoggedIn = false;
    }
    // return of(true).pipe(
    //   delay(1000),
    //   tap(val => this.isLoggedIn = true)
    // );
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  checkClinician(Urlusername, Urlpassword) {
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<string>('https://stormy-dawn-15351.herokuapp.com/ClinicianLogin?' +
      'userName=' + Urlusername + '&password=' + Urlpassword,
      {responseType: 'text' as 'json' });
  }


}
