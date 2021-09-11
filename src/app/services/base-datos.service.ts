import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {


  elementos: any = {
    posts: [],
    comments: [],
    albums: [],
    photos: [],
    todos: []
  };
  
  URL: string = "https://jsonplaceholder.typicode.com/";
  constructor(private http: HttpClient) { 
    this.getElements("posts").subscribe(data => {
      for(let i = 0; i < 10; i++){
        this.elementos.posts.push(data[i]);
      }      
    });
    this.getElements("comments").subscribe(data => {
      for(let i = 0; i < 10; i++){
        this.elementos.comments.push(data[i]);
      }      
    });
    this.getElements("albums").subscribe(data => {
      for(let i = 0; i < 10; i++){
        this.elementos.albums.push(data[i]);
      }      
    });
    this.getElements("photos").subscribe(data => {
      for(let i = 0; i < 10; i++){
        this.elementos.photos.push(data[i]);
      }      
    });
    this.getElements("todos").subscribe(data => {
      for(let i = 0; i < 10; i++){
        this.elementos.todos.push(data[i]);
      }      
    });
  }

  addElement(newElement: any, type: string): void {
    this.elementos[type].push(newElement);
  }

  getElements(type: string): Observable<any> {
    return this.http.get(this.URL + type);
  }

  getAddedElements(type: string): any {
    return this.elementos[type];
  }
}
