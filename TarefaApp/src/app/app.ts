import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TarefaService } from './services/tarefa';
import { Tarefa } from './models/tarefa';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class AppComponent implements OnInit {

  tarefas: Tarefa[] = [];

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.tarefaService.getTarefas().subscribe((result: Tarefa[]) => {
      this.tarefas = result;
    });
  }
}