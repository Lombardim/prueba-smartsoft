import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { elemento, tiposElemento } from '../interfaces/elemento';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})


export class EditDialogComponent implements OnInit {
  
  @Input() editElements: tiposElemento = {
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
  @Input() editValues: elemento = {
    id: -1,
    title: "",
    name: "",
    email: "",
    body: "",
    thumbnailUrl: "",
    url: "",
    completed: false
  };

  @Output() cancelar: EventEmitter<number> = new EventEmitter<number>();
  @Output() editedValues: EventEmitter<object> = new EventEmitter<object>();

  id: FormControl = new FormControl("", [Validators.required, Validators.pattern(/^[0-9]+$/)]);
  title: FormControl = new FormControl("", Validators.required);
  body: FormControl = new FormControl("", Validators.required);
  name: FormControl = new FormControl("", Validators.required);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  url: FormControl = new FormControl("", Validators.required);
  thumbnail: FormControl = new FormControl("", Validators.required);
  
  constructor() {  }

  ngOnInit(): void {
    this.id = new FormControl(this.editValues.id, [Validators.required, Validators.pattern(/^[0-9]+$/)]);
    this.title = new FormControl(this.editValues.title, Validators.required);
    this.body = new FormControl(this.editValues.body, Validators.required);
    this.name = new FormControl(this.editValues.name, Validators.required);
    this.email = new FormControl(this.editValues.email, [Validators.required, Validators.email]);
    this.url = new FormControl(this.editValues.url, Validators.required);
    this.thumbnail = new FormControl(this.editValues.thumbnailUrl, Validators.required);
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

  closeDialog(): void{
    this.cancelar.emit(-1);
  }
  setEdition(): void{
    switch(this.editElements.type){
      case "posts":
        if(!this.id.invalid && !this.title.invalid && !this.body.invalid){
          const VALUES = {
            id: this.id.value,
            title: this.title.value,
            body: this.body.value
          };
          this.editedValues.emit(VALUES);
        }
        break;
      case "comments":
        if(!this.id.invalid && !this.name.invalid && !this.email.invalid && !this.body.invalid){
          const VALUES = {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
            body: this.body.value
          };
          this.editedValues.emit(VALUES);
        }
        break;
      case "albums":
        if(!this.id.invalid && !this.title.invalid){
          const VALUES = {
            id: this.id.value,
            title: this.title.value
          };
          this.editedValues.emit(VALUES);
        }
        break;
      case "photos":
        if(!this.id.invalid && !this.title.invalid && !this.url.invalid && !this.thumbnail.invalid){
          const VALUES = {
            id: this.id.value,
            title: this.title.value,
            url: this.url.value,
            thumbnailUrl: this.thumbnail.value
          };
          this.editedValues.emit(VALUES);
        }
        break;
      case "todos":
        if(!this.id.invalid && !this.title.invalid){
          const VALUES = {
            id: this.id.value,
            title: this.title.value,
          };
          this.editedValues.emit(VALUES);
        }
        break;
    }
  }
}