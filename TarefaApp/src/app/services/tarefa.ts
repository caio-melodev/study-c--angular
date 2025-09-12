import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa';

// registra o serviço como um singleton,
// uma única instância dele será usada em toda a aplicação.
@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  // url da api backend.
  private apiUrl = 'http://localhost:5155/api/tarefa';

  // constructor injeta o HttpClient, ferramenta do Angular para fazer requisições web.
  constructor(private http: HttpClient) { }

  /* busca a lista completa de tarefas na API backend.
   * @returns Observable que emitirá um array de Tarefas.
   */
  getTarefas(): Observable<Tarefa[]> {
    // usa o HttpClient para fazer uma requisição GET, esperando um array de Tarefa como resposta.
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  //método p/ criar uma tarefa (POST)
  addTarefa(tarefa: Omit<Tarefa, 'id'>): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa);
  }

  //método p/ modificar uma tarefa (PUT)
  updateTarefa(tarefa: Tarefa): Observable<Tarefa> {
    const url = `${this.apiUrl}/${tarefa.id}`; //monta a URL /api/tarefa/5
    return this.http.put<Tarefa>(url, tarefa);
  }

  //método p/ deletar uma tarefa (DELETE)
  deleteTarefa(id: number): Observable<any> {
    //monta a url com o id
    const url = `${this.apiUrl}/${id}`; //faz a requisição delete para a url montada
    return this.http.delete(url);
  }
}