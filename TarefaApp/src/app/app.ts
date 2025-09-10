import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TarefaService } from './services/tarefa';
import { Tarefa } from './models/tarefa';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // CommonModule é necessário para usar *ngFor e *ngIf
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  // Propriedade para guardar a lista de tarefas que virá da API.
  tarefas: Tarefa[] = [];

  /* Para criar um AppComponent, o Angular deve injetar uma instância do TarefaService
     para que o componente tenha acesso ao "carteiro" que conversa com o backend. */
  constructor(private tarefaService: TarefaService) {}

  // ngOnInit é um método que roda uma vez, logo após o componente ser criado.
  // É o lugar ideal para buscar os dados iniciais da página.
  ngOnInit(): void {
    this.tarefaService.getTarefas().subscribe((result: Tarefa[]) => {
      this.tarefas = result;
    });
  }

  //método que será chamado pelo button ( no app.html)
  addTarefa(titulo: string): void {
    //1. checagem pra impossibilitar a adição de tarefas vazias
    if (!titulo || titulo.trim() === '') {
      return;
    }

    //cria o objeto da nova tarefa (sem o id). status 0 = Pendente
    const novaTarefa = { titulo: titulo.trim(), status: 0 };

    //usa o serviço p enviar a nova tarefa para o backend
    this.tarefaService.addTarefa(novaTarefa)
      .subscribe((tarefaAdicionada: Tarefa) => {
        //quando o backend confirmar a criação da tarefa e devolver o objeto com o id,
        //a tarefa é adicionada na lista local para a tela ser atualizada instantaneamente
        this.tarefas.push(tarefaAdicionada);
      });
  }
}