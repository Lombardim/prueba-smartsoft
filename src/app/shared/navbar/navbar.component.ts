import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDatosService } from 'src/app/services/base-datos.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() title: string = '';

  constructor(private router: Router, private _datos: BaseDatosService) { }

  ngOnInit(): void {
  }

  openDashboard(): void {
    this.router.navigate(['dashboard']);
  }
  logOut():void {
    this._datos.activeUser = "none";
    this.router.navigate(['login']);
  }
}
