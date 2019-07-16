import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) { }
  
  ngOnInit() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required]
    })
  }

  addTodo(event) {
    this.todoService.addTodo(this.todoForm.value.title);
  }
}
