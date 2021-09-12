import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../shared/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {

  activeUser: string = "none";

  users: usuario[] = [
    {username: "admin", password: "123456", email: "admin@admin.com"}
  ];

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

  userLogIn(username: string, password: string):boolean {
    const userExist = this.users.filter(data => 
      data.username === username && data.password === password
    );
    this.activeUser = userExist[0].username;
    return userExist.length > 0;
  }

  addUser(user: usuario): boolean{
    const userExist = this.users.filter(data => user.username == data.username);
    if(userExist.length === 0){
      this.users.push(user);
      return false;
    }
    return true;
  }

}
