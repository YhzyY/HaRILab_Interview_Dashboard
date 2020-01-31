import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {MatDialogModule} from '@angular/material/dialog';
// import {getHtmlTagDefinition} from '@angular/compiler';
import {getInputNamesOfClass} from '@angular/core/schematics/migrations/static-queries/angular/directive_inputs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  newName: string;
  newPassword: number;

  constructor(public authService: AuthService, public router: Router, private dialog: MatDialog
  ) {
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
    this.authService.login(username.value, password.value).subscribe(data => {
      this.setMessage();
      console.log('test in login.component.ts ' + this.authService.isLoggedIn);
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/admin';

        // Redirect the user
        this.router.navigateByUrl(redirect);
      } else {
        alert('log in failed') ;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  signup(): void {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // this.dialog.open(newUserDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(newUserDialogComponent, {
      width: '300px',
      data: {newName: this.newName, newPassword: this.newPassword}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.newName = result.newName;
        this.newPassword = result.newPassword;
        this.authService.signup(this.newName, this.newPassword);
      }
    );
  }
  ngOnInit() {
  }
}

export interface DialogData {
  newName: string;
  newPassword: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './signupDialog.html',
})

// tslint:disable-next-line:class-name component-class-suffix
export class newUserDialogComponent {

  // constructor(
  //   public dialogRef: MatDialogRef<newUserDialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  //
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  constructor(public dialogRef: MatDialogRef<newUserDialogComponent>) {}
  newName: string;
  newPassword: number;
  saveData() {
    this.dialogRef.close({newName: this.newName, newPassword: this.newPassword});
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
