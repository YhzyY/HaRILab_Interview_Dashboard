import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {getHtmlTagDefinition} from '@angular/compiler';
import {getInputNamesOfClass} from '@angular/core/schematics/migrations/static-queries/angular/directive_inputs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  // username: HTMLInputElement;
  // password: HTMLInputElement;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  private setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  greeting() {
    this.authService.greeting();
  }

  login(username: HTMLInputElement, password: HTMLInputElement) {
    this.message = 'Trying to log in ...';
    console.log(username.value + '------' + password.value);
    this.authService.login(username, password).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/admin';

        // Redirect the user
        this.router.navigateByUrl(redirect);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  signup() {

  }


  ngOnInit() {
  }
}
