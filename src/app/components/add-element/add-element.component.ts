import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseDatosService } from 'src/app/services/base-datos.service';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss']
})
export class AddElementComponent implements OnInit {
  hPosition: MatSnackBarHorizontalPosition = "end";
  vPosition: MatSnackBarVerticalPosition  = "bottom";
  
  tabTitle: string = 'AGREGAR NUEVO ELEMENTO';
  sidebarElements: object[] = [
    {name: "PANTALLA PRINCIPAL", path: "dashboard", icon:"home", active: ''},
    {name: "AGREGAR ELEMENTO", path: "new-element", icon:"add_circle", active: 'focused'}
  ];
  tab: boolean = false;
  selectType: boolean = true;
  dialog: boolean = false;
  loading: boolean = false;

  elementOptions: any = 
    { "posts": {typeTitle: "AGREGAR POSTS", id: true, title: true, body: true, name: false, 
        email: false, url: false, thumbnailUrl: false, completed: false }
    , "comments": {typeTitle: "AGREGAR COMENTARIO", id: true, title: false, body: true, name: true, 
        email: true, url: false, thumbnailUrl: false, completed: false }
    , "albums": {typeTitle: "AGREGAR ALBUM", id: true, title: true, body: false, name: false, 
        email: false, url: false, thumbnailUrl: false, completed: false }
    , "photos": {typeTitle: "AGREGAR FOTO", id: true, title: true, body: false, name: false, 
        email: false, url: true, thumbnailUrl: true, completed: false }
    , "to-do": {typeTitle: "AGREGAR PENDIENTE", id: true, title: true, body: false, name: false, 
        email: false, url: false, thumbnailUrl: false, completed: true }      
    };

  type: FormControl = new FormControl("", Validators.required);
  
  id: FormControl = new FormControl("", [Validators.required, Validators.pattern(/^[0-9]+$/)]);
  title: FormControl = new FormControl("", Validators.required);
  body: FormControl = new FormControl("", Validators.required);
  name: FormControl = new FormControl("", Validators.required);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  url: FormControl = new FormControl("", Validators.required);
  thumbnail: FormControl = new FormControl("", Validators.required);
  completed: boolean = false;


  constructor(private _snackBar: MatSnackBar, private _data: BaseDatosService, private router: Router) { }

  ngOnInit(): void {
  }

  getErrorMessageID():string {
    if(this.id.hasError('required')){
      return 'Debe escribir una ID';
    }
    if(this.id.hasError('pattern')){
      return 'Las ID solo continen números, no letras';
    }
    return '';
  }
  getErrorMessageT():string {
    if(this.title.hasError('required')){
      return 'Debe escribir un titulo';
    }
    return '';
  }
  getErrorMessageB():string {
    if(this.body.hasError('required')){
      return 'Debe escribir un cuerpo';
    }
    return '';
  }
  getErrorMessageN():string {
    if(this.name.hasError('required')){
      return 'Debe escribir su nombre';
    }
    return '';
  }
  getErrorMessageE():string {
    if(this.email.hasError('required')){
      return 'Debe escribir un correo';
    }
    if(this.email.hasError('email')){
      return 'Escriba un correo electronico válido';
    }
    return '';
  }
  getErrorMessageU():string {
    if(this.url.hasError('required')){
      return 'Agregue una URL';
    }
    return '';
  }
  getErrorMessageTU():string {
    if(this.thumbnail.hasError('required')){
      return 'Agregue la URL de la miniatura';
    }
    return '';
  }

  openSnackBar(text: string, close: string) {
    this._snackBar.open(text, close, {
      duration: 5000,
      horizontalPosition: this.hPosition,
      verticalPosition: this.vPosition,
    });
  }

  getTypeSelection(): void {
    if(this.type.hasError('required')){
      this.openSnackBar('Debe seleccionar un tipo', 'Entendido');
    }else{
      this.selectType = !this.selectType;
    }
  }

  returnSelectType(): void{
    this.loading = true;
    this.dialog = false;
    setTimeout(() => {
      this.loading = false;
      this.type.setValue("");
      this.cleanValues();
      this.selectType = !this.selectType;
    }, 3000);
  }

  cleanValues(): void {
    this.id.setValue("");
    this.title.setValue("");
    this.name.setValue("");
    this.email.setValue("");
    this.body.setValue("");
    this.url.setValue("");
    this.thumbnail.setValue("");
    this.completed = false;
  }

  changeDisplay(direction: boolean): void{
    this.tab = direction;
  }

  addElement(): void {
    for(let i = 0; i < this._data.elementos[this.type.value].length; i++){
      if(this._data.elementos[this.type.value][i].id === this.id.value){
        this.openSnackBar("Esta ID ya existe", "Entendido");
        return;
      }
    }
    let added:boolean = false;    
    switch(this.type.value){
      case "posts":
        if(!this.id.invalid && !this.title.invalid && !this.body.invalid){
          this._data.addElement( {
            id: this.id.value,
            title: this.title.value,
            body: this.body.value
          } , this.type.value);
          added = true;
        }
        break;
      case "comments":
        if(!this.id.invalid && !this.name.invalid && !this.email.invalid && !this.body.invalid){
          this._data.addElement( {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
            body: this.body.value
          } , this.type.value);
          added = true;
        }
        break;
      case "albums":
        if(!this.id.invalid && !this.title.invalid){
          this._data.addElement( {
            id: this.id.value,
            title: this.title.value
          } , this.type.value);
          added = true;
        }
        break;
      case "photos":
        if(!this.id.invalid && !this.title.invalid && !this.url.invalid && !this.thumbnail.invalid){
          this._data.addElement( {
            id: this.id.value,
            title: this.title.value,
            url: this.url.value,
            thumbnailUrl: this.thumbnail.value
          } , this.type.value);
          added = true;
        }
        break;
      case "todos":
        if(!this.id.invalid && !this.title.invalid){
          this._data.addElement( {
            id: this.id.value,
            title: this.title.value,
            completed: this.completed
          } , this.type.value);
          added = true;
        }
        break;
    }

    if(added){
      this.loading = true;
      setTimeout(() => {
        
        this.loading = false;
        this.openSnackBar("El elemento fue agregado correctamente", "Entendido");
        setTimeout(() => {
          this.dialog = true;
        }, 500);
      }, 3000);      
    }else{
      this.openSnackBar("Debe llenar todos los campos", "Entendido");
    }    
  }

  navigateToDashboard(): void {
    this.router.navigate(["dashboard"]);
  }
}
