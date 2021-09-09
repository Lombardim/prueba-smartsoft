import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {

  elementos: any = {
    "posts": [],
    "comments": [],
    "albums": [],
    "photos": [],
    "to-do": []
  };

  constructor() { }

  addElement(newElement: any, type: string): void {
    this.elementos[type].push(newElement);

    console.log(this.elementos);
  }
}
