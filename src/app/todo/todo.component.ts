import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private todoService: TodoService) { }
  @Input("value") todo;
  todos = {};
  hideTodo = false;

  ngOnInit() {
  }

  delete(event) {
    this.todoService.deleteTodo(this.todo);
  }

  showEditForm(event) {
    this.hideTodo = true;
  }

  showTodo(event) {
    this.hideTodo = false;
  }

  changeComplete(event) {
    this.todoService.changeComplete(this.todo);
  }
}
