import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TarefaService } from './services/tarefa';
import { Tarefa } from './models/tarefa';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule], // CommonModule é necessário para usar *ngFor e *ngIf
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  tarefas: Tarefa[] = []; // Propriedade para guardar a lista de tarefas que virá da API.
  tarefaParaEditar: Tarefa | null = null; //P guardar a tarefa que está sendo editada
  tituloTarefa: string = ''; //P ligar com o <input>

  /* Para criar um AppComponent, o Angular deve injetar uma instância do TarefaService
     para que o componente tenha acesso ao "carteiro" que conversa com o backend. */
  constructor(private tarefaService: TarefaService) { }

  // ngOnInit é um método que roda uma vez, logo após o componente ser criado.
  // É o lugar ideal para buscar os dados iniciais da página.
  ngOnInit(): void {
    this.tarefaService.getTarefas().subscribe((result: Tarefa[]) => {
      this.tarefas = result;
    });
  }

  // Prepara o formulário para o modo de edição
  iniciarEdicao(tarefa: Tarefa): void {
    this.tarefaParaEditar = { ...tarefa };
    this.tituloTarefa = tarefa.titulo;
  }

  // Limpa o formulário e sai do modo de edição
  cancelarEdicao(): void {
    this.tarefaParaEditar = null;
    this.tituloTarefa = '';
  }

  //este método vai salvar a tarefa editada ou criar uma nova
  salvar(): void {
    if (!this.tituloTarefa || this.tituloTarefa.trim() === '') {
      return; //se o titulo estiver vazio, n faz nada
    }

    // SE tarefaParaEditar não é nulo, estamos no modo de EDIÇÃO
    if (this.tarefaParaEditar) {
      const tarefaAtualizada = this.tarefaParaEditar;  // criamos uma constante p/ garantir que o objeto n é nulo daqui pra frente

      tarefaAtualizada.titulo = this.tituloTarefa.trim();

      this.tarefaService.updateTarefa(tarefaAtualizada)
        .subscribe(() => {
          //atualiza a lista local
          const index = this.tarefas.findIndex(t => t.id === tarefaAtualizada.id);
          if (index !== -1) {
            // nessa linha usamos a constante, que o TypeScript sabe que não é nula
            this.tarefas[index] = tarefaAtualizada;
          }
          this.cancelarEdicao(); // limpa o formulário após salvar
        });
    }
    //se não, estamos criando uma nova tarefa
    else {
      // cria o objeto da nova tarefa
      const novaTarefa = { titulo: this.tituloTarefa.trim(), status: 0 };

      // usa o tarefaservice para enviar a nova tarefa para o backend (requisição POST)
      this.tarefaService.addTarefa(novaTarefa)
        .subscribe(tarefaAdicionada => {
          // backend responde que criou com sucesso (e devolve a tarefa com o id)
          // adiciona essa tarefa na nossa lista local 'tarefas'.
          this.tarefas.push(tarefaAdicionada);

          // limpa o formulário p nova tarefa
          this.cancelarEdicao();
        });
    }
  }
  //metodo para deletar uma tarefa
  deletarTarefa(id: number): void {
    //chama o serviço p deletar a tarefa no backend, informando o ID
    this.tarefaService.deleteTarefa(id)
      .subscribe(() => {
        /*após o back confirmar o delete da tarefa | atualiza a lista local p mudança reflertir na tela
        | o .filter() cria uma nova lista contendo apenas os itens q passam no teste | a nova lista conterá
        todas as tarefas cujo ID é diferente do deletado*/
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id !==id);
      });
  }
}