import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient, private snak: MatSnackBar) { }

  baseUrl = environment.baseUrl

  findAll(): Observable<Todo[]>{

    return this.http.get<Todo[]>(this.baseUrl);

  }

  findById(id: any): Observable<Todo>{

    const url = `${this.baseUrl}/${id}`
    return this.http.get<Todo>(url)

  }

  update(todo: Todo): Observable<Todo>{

    const url = `${this.baseUrl}/${todo.id}`
    return this.http.put<Todo>(url, todo);


  }

  delete(id: any):Observable<void>{

    const url = `${this.baseUrl}/${id}`
    return this.http.delete<void>(url);

  }

  create(todo: Todo):Observable<Todo>{

    return this.http.post<Todo>(this.baseUrl, todo);


  }

  message(msg: String): void{


    this.snak.open(`${msg}`, 'OK', {

        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 4000

    })


  }

}
