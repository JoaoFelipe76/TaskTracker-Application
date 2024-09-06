import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule,  MatFormFieldModule, MatInputModule,  MatDatepickerToggle,  MatNativeDateModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  todo: Todo = {

    title: '',
    descricao: '',
    dataParaFinalizacao: new Date(),
    finalizado: false


  }

  constructor(private router: Router, private service: TodoService) { }

  create(): void{

    this.service.create(this.todo).subscribe((response) => {

      this.service.message('To-do criado com sucesso!');
      this.router.navigate([''])

    }, err => {


      this.service.message('Falha ao criar To-do');


    })



  }


  cancelar(): void{

    this.router.navigate([''])

  }

}
