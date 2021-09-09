import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss']
})
export class AddElementComponent implements OnInit {
  title: string = 'AGREGAR NUEVO ELEMENTO';
  sidebarElements: object[] = [
    {name: "PANTALLA PRINCIPAL", path: "dashboard", icon:"home", active: ''},
    {name: "AGREGAR ELEMENTO", path: "new-element", icon:"add_circle", active: 'focused'}
  ];
  tab: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeDisplay(direction: boolean): void{
    this.tab = direction;
  }
}
