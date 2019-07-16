import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private todoService: TodoService) { }
  todos = [];

  ngOnInit() {
    this.todoService.publish();
    this.todoService.getTodoStream()
      .subscribe(e => {
        this.todos = e.value;
      })
  }

  ngDoCheck() {
    this.todoService.getTodoStream()
      .subscribe(e => {
        this.todos = e.value;
      })
  }

  completeAll(event) {
    this.todoService.completeAll();
  }

}
