import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BaseDatosService } from 'src/app/services/base-datos.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() sidebarElements: any[] = [];
  @Output() display = new EventEmitter<boolean>();

  direction: string = 'chevron_left';
  big: boolean = true;

  constructor(private router: Router, private _datos: BaseDatosService) { }

  ngOnInit(): void {
  }

  openRoute(path: string): void {
    this.router.navigate([path]);
  }

  tabControl(): void {
    if(this.direction === 'chevron_left'){
      this.direction = "chevron_right";
      this.display.emit(true);
    }else{
      this.direction = "chevron_left";
      this.display.emit(false);
    }
    this.big = !this.big;
  }
}
