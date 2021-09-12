import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hPosition: MatSnackBarHorizontalPosition = "end";
  vPosition: MatSnackBarVerticalPosition  = "bottom";


  userName: FormControl  = new FormControl('', Validators.required);
  email: FormControl  = new FormControl('', [Validators.required, Validators.email]);
  passWord: FormControl  = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide: boolean = true;
  
  constructor(private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  openLogin(): void {
    this.router.navigate(['']);
  }

  openSnackBar(text: string, close: string) {
    this._snackBar.open(text, close, {
      duration: 5000,
      horizontalPosition: this.hPosition,
      verticalPosition: this.vPosition,
    });
  }
  
  getErrorMessageU():string {
    if (this.userName.hasError('required')) {
      let message: string = 'Debe escribir su nombre de usuario';
      return message;
    }
    return '';
  }

  getErrorMessageE():string {
    if (this.email.hasError('required')) {
      let message: string = 'Debe escribir un email';
      return message;
    }
    if (this.email.hasError('email')) {
      let message: string = 'El formato que escribió es incorrecto';
      return message;
    }
    return '';
  }
  
  getErrorMessageP():string {
    if (this.passWord.hasError('required')){
      let message: string = 'Debe escribir su contraseña';
      return message;
    }
    if (this.passWord.hasError('minlength')){
      let message: string = 'La longitud minima es de 6 caracteres';
      return message;
    }
    return '';    
  }
}
