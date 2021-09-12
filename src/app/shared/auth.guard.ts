import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BaseDatosService } from '../services/base-datos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private _datos: BaseDatosService, private router: Router){

  }

  canActivate(): boolean{
    if(this._datos.activeUser === "none"){
      this.router.navigate(["/login"])
    }
    return true;
  }
  
}
