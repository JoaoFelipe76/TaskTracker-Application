import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerToggle,
    MatNativeDateModule,
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  todo: Todo = {
    title: '',
    descricao: '',
    dataParaFinalizacao: new Date(),
    finalizado: false,
  };

  constructor(
    private router: Router,
    private service: TodoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.todo.id).subscribe((response) => {
      this.todo = response;
    });
  }

  update(): void {
    this.service.update(this.todo).subscribe(
      (reponse) => {
        this.service.message('Informações atualizadas com sucesso!');
        this.router.navigate(['']);
      },
      (err) => {
        this.service.message('Falha ao atualizar o To-d');
        this.router.navigate(['']);
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['']);
  }
}
