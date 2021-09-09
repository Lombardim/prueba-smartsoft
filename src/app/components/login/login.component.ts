import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hPosition: MatSnackBarHorizontalPosition = "end";
  vPosition: MatSnackBarVerticalPosition  = "bottom";


  userName = new FormControl('', Validators.required);
  passWord = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide: boolean = true;
  
  constructor(private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  openRegister(): void {
    this.router.navigate(['register']);
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
