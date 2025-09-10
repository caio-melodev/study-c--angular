import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa';

// O @Injectable providedIn: 'root' registra este serviço como um singleton,
// ou seja, uma única instância dele será usada em toda a aplicação.
@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  // A URL base da nossa API backend.
  private apiUrl = 'http://localhost:5155/api/tarefa';

  // O construtor injeta o HttpClient, a ferramenta do Angular para fazer requisições web.
  constructor(private http: HttpClient) { }

  /**
   * Busca a lista completa de tarefas na API backend.
   * @returns Um Observable que emitirá um array de Tarefas.
   */
  getTarefas(): Observable<Tarefa[]> {
    // Usa o HttpClient para fazer uma requisição GET, esperando um array de Tarefa como resposta.
    return this.http.get<Tarefa[]>(this.apiUrl);
  }
}