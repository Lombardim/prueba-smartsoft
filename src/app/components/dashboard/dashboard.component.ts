import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseDatosService } from 'src/app/services/base-datos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  hPosition: MatSnackBarHorizontalPosition = "end";
  vPosition: MatSnackBarVerticalPosition  = "bottom";

  tabTitle: string = "PANTALLA PRINCIPAL";
  sidebarElements: any[] = [
    {name: "VER POSTS", type:"posts", icon:"article", active: true},
    {name: "VER COMENTARIOS", type:"comments", icon:"comment", active: false},
    {name: "VER ALBUMES", type:"albums", icon:"collections", active: false},
    {name: "VER FOTOS", type:"photos", icon:"image", active: false},
    {name: "VER PENDIENTES", type:"todos", icon:"task", active: false}
  ]
  displayedElements: any[] = [];
  editElements: any = {
    type: "",
    id: false,
    title: false,
    name: false,
    email: false,
    body: false,
    thumbnailUrl: false,
    url: false,
    completed: false
  };
  valueToEdit: any;

  elementFields: any = 
    { 
      "posts": {id: true, title: true, body: true, name: false, 
        email: false, url: false, thumbnailUrl: false, completed: false
      }
    , "comments": {id: true, title: false, body: true, name: true, 
        email: true, url: false, thumbnailUrl: false, completed: false
      }
    , "albums": {id: true, title: true, body: false, name: false, 
        email: false, url: false, thumbnailUrl: false, completed: false
      }
    , "photos": {id: true, title: true, body: false, name: false, 
        email: false, url: true, thumbnailUrl: true, completed: false
      }
    , "todos": {id: true, title: true, body: false, name: false, 
        email: false, url: false, thumbnailUrl: false, completed: true
      }      
    };

  direction:string = 'chevron_left';
  big: boolean = true;
  loading: boolean = false;
  selectedType:string = "posts";
  edition: number = -1;

  constructor(private router: Router, private _datos: BaseDatosService, private _snackBar: MatSnackBar) {
    this.getElementsArray();
  }

  ngOnInit(): void {
  }

  changeState(ind: number): void{
    this.displayedElements[ind].completed = !this.displayedElements[ind].completed;
  }

  getElementsArray(): void {
    this.displayedElements = [];
    this.loading = true;
    setTimeout(() => {
      const addedElements = this._datos.getAddedElements(this.selectedType);
      for(let i=0; i< addedElements.length; i++){
        this.displayedElements.push(addedElements[i]);
      }
      this.loading = false;
    }, 2000);
  }
  openAddElement(): void {
    this.router.navigate(["new-element"]);
  }

  openSnackBar(text: string, close: string) {
    this._snackBar.open(text, close, {
      duration: 5000,
      horizontalPosition: this.hPosition,
      verticalPosition: this.vPosition,
    });
  }

  getElementsList(type: string): void{
    for(let i=0; i < this.sidebarElements.length; i++){
      if(this.sidebarElements[i].type == type){
        this.sidebarElements[i].active = true;
        this.selectedType = type;
        this.getElementsArray();
      }else{
        this.sidebarElements[i].active = false;
      }
    }
  }
  
  deleteValue(ind: number): void {
    this.loading = true;
    setTimeout(() => {
      this.displayedElements = this.displayedElements.filter(elem => elem !== this.displayedElements[ind]);
      this._datos.elementos[this.selectedType] = this.displayedElements;
      this.loading = false;
    }
    , 1000);
  }

  getEdition(edited: object): void{
    this.loading = true;
    this.displayedElements[this.edition] = edited;
    this._datos.elementos[this.selectedType] = this.displayedElements;
    this.edition = -1;
    setTimeout(() => {      
      this.loading = false;
      this.openSnackBar('Se han realizado los cambios', 'Entendido');
    }, 1000);    
  }
  cancelEdit(value: number): void{
    this.edition = value;
  }

  editValue(ind: number): void {
    this.edition  = ind;
    this.editElements = {
      id: false,
      title: false,
      name: false,
      email: false,
      body: false,
      thumbnailUrl: false,
      url: false,
      completed: false
    };    
    const NAMES = Object.getOwnPropertyNames(this.displayedElements[ind]).filter(element => element != "userId");
    this.editElements.type = this.selectedType
    for(let i = 0; i < NAMES.length; i++){
      this.editElements[NAMES[i]] = true;
    }
    this.valueToEdit = this.displayedElements[ind];
  }

  tabControl(): void {
    if(this.direction === 'chevron_left'){
      this.direction = "chevron_right";
    }else{
      this.direction = "chevron_left";
    }
    this.big = !this.big;
  }
}
