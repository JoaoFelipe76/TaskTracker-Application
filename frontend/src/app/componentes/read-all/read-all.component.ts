import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../../models/todo';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-read-all',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatBadgeModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css'],
})
export class ReadAllComponent {
  closed = 0;

  list: Todo[] = [];
  listFinished: Todo[] = [];

  constructor(private service: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((todo) => {
        if (todo.finalizado) {
          this.listFinished.push(todo);
        } else {
          this.list.push(todo);
        }
      });
      this.closed = this.listFinished.length;
    });
  }

  check(item: Todo): void {
    item.finalizado = true;
    this.service.update(item).subscribe(() => {
      this.service.message('Task finalizada com sucesso!');
      this.list = this.list.filter((todo) => todo.id !== item.id);
      this.closed++;
    });
  }

  delete(id: any): void {
    this.service.delete(id).subscribe(
      () => {
        this.service.message('Task deletada com sucesso!');
        this.list = this.list.filter((todo) => todo.id !== id);
      },
      (error) => {
        this.service.message('Erro ao deletar a tarefa.');
      }
    );
  }

  irParaFinalizados(): void {
    this.router.navigate(['finalizados']);
  }

  irParaCreate(): void {
    this.router.navigate(['create']);
  }
}
