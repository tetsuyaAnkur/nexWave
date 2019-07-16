import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {

  todoEditForm: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) { }
  
  @Input("value") todo;
  @Output() updated = new EventEmitter();

  ngOnInit() {
    this.todoEditForm = this.fb.group({
      title: ['', Validators.required]
    })
  }

  updateTodo(event) {
    this.todoService.updateTodo(this.todo, this.todoEditForm.value.title);
    this.updated.emit();
  }
}
