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


  name: FormControl = new FormControl('', Validators.required);
  lastName: FormControl = new FormControl('', Validators.required);
  userName: FormControl  = new FormControl('', Validators.required);
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

  getErrorMessageN():string {
    if (this.name.hasError('required')) {
      let message: string = 'Debe escribir su nombre';
      return message;
    }
    return '';
  }
  getErrorMessageL():string {
    if (this.lastName.hasError('required')) {
      let message: string = 'Debe escribir su apellido';
      return message;
    }
    return '';
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
