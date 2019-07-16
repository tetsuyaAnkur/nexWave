import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private _http: HttpClient) { }
  todoStream: Subject<any> = new Subject();
  todos = [];
  todoCount = 0;

  getTodoStream() {
    return this.todoStream;
  }

  /*getTodo() {
    let apiUrl = "http://localhost:8081/api/v1/todos";
    this._http.get(apiUrl)
      .subscribe((e: any) => {
        this.todos = e;
      })
  }*/
  
  addTodo(title) {
    this.todoCount ++;
    //this.todos[this.todoCount] = todo;
    //this.publish();
    let apiUrl = `http://localhost:8081/api/v1/todos`;
    this._http.post(apiUrl, title)
      .subscribe(e => {
        this.publish()
      })
  }

  deleteTodo(todo) {
    console.log(todo);
    let apiUrl = `http://localhost:8081/api/v1/todos/${todo.id}`;
    this._http.delete(apiUrl)
      .subscribe(e => {
        this.publish()
      })
    
    /*let todos2 = {};
    let keys = Object.keys(this.todos);
    keys.forEach(key => {
      if(key != todo.id) {
        todos2[key] = this.todos[key];
      }
    })
    this.todos = todos2;
    this.publish();
    */
  }

  updateTodo(todo, title) {
    let apiUrl = `http://localhost:8081/api/v1/todos/${title}`;
    this._http.put(apiUrl, todo)
      .subscribe(e => {
        this.publish()
    })

    /*console.log(title);
    let keys = Object.keys(this.todos);
    keys.forEach(key => {
      if(key == todo.id) {
        this.todos[key].title = title;
      }
    })
    this.publish();
    console.log(this.todos);
    */
  }
  
  changeComplete(todo) {
    console.log(todo);
    let apiUrl = "http://localhost:8081/api/v1/todos/completed";
    this._http.put(apiUrl, todo)
      .subscribe(e => {
        this.publish()
    })

    /*let keys = Object.keys(this.todos);
    keys.forEach(key => {
      if(key == todo.id) {
        this.todos[key].completed = !todo.completed;
      }
    })
    console.log(this.todos);
    this.publish();
    */
  }

  completeAll() {
    let apiUrl = "http://localhost:8081/api/v1/todos/completedall";
    this._http.put(apiUrl, this.todos)
      .subscribe(e => {
        this.publish()
    })

    /*let keys = Object.keys(this.todos);
    keys.forEach(key => {
        this.todos[key].completed = true;
    })
    console.log(this.todos);
    this.publish();
    */
  }

  filter(value) {
    console.log("FILTER BY -> " + value);
    let apiUrl = "http://localhost:8081/api/v1/todos";
    this.todos = [];

    switch(value) {  
      case "all": {
        this._http.get(apiUrl)
          .subscribe((e: any) => {
            this.todos = e;
            this.todoStream.next({value: this.todos});
            });
        break;
      }
      case "active": {
        this._http.get(apiUrl)
          .subscribe((e: any) => {
            e.forEach(todo => {
              console.log("COMPLETED -> " + todo.completed);
              if (todo.completed === false) {
                console.log("TRUE");
                this.todos.push(todo);
              }
            });
            this.todoStream.next({value: this.todos});
          });
        break;
      }
      case "completed": {
        this._http.get(apiUrl)
          .subscribe((e: any) => {
            e.forEach(todo => {
              if (todo.completed === true) {
                this.todos.push(todo);
              }
            });
            this.todoStream.next({value: this.todos});
          });
        break;
      }
    }
  }

  publish() {
    let apiUrl = "http://localhost:8081/api/v1/todos";
    this._http.get(apiUrl)
      .subscribe((e: any) => {
        this.todos = e;
        this.todoStream.next({value: this.todos});
      })
  }

}
