import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-filter-todo',
  templateUrl: './filter-todo.component.html',
  styleUrls: ['./filter-todo.component.css']
})
export class FilterTodoComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  filter(event) {
    console.log("Event Triggered");
    let selectedValue = event.target.value;
    this.todoService.filter(selectedValue);
  }
}
