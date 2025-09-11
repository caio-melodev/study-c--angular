import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaService } from './services/tarefa';
import { Tarefa } from './models/tarefa';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule], // CommonModule é necessário para usar *ngFor e *ngIf
  templateUrl: './app.html',
  styleUrl: './app.css',

  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        //  roda a animação toda vez que a lista muda
        query(
          ':enter',
          [
            // itens que estão entrando na lista
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger('50ms', [
              animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            // itens que estão saindo da lista
            animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(15px)' })),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  tarefas: Tarefa[] = []; // guarda a lista completa que vem da API
  tarefasFiltradas: Tarefa[] = []; //guarda a lista que será mostrada na tela
  filtroAtual: string = 'TODAS'; //controla qual filtro ficará ativo
  tarefaParaEditar: Tarefa | null = null; //P guardar a tarefa que está sendo editada
  tituloTarefa: string = ''; //P ligar com o <input>

  /* Para criar um AppComponent, o Angular deve injetar uma instância do TarefaService
      para que o componente tenha acesso ao "carteiro" que conversa com o backend. */
  constructor(private tarefaService: TarefaService) {}

  // ngOnInit é um método que roda uma vez, logo após o componente ser criado.
  // É o lugar ideal para buscar os dados iniciais da página.
  ngOnInit(): void {
    this.tarefaService.getTarefas().subscribe((result: Tarefa[]) => {
      this.tarefas = result;
      this.filtrar(this.filtroAtual); // chama o filtro
    });
  }

  filtrar(status: string): void {
    this.filtroAtual = status;

    if (status === 'PENDENTES') {
      //filtra a lista principal para mostrar tarefas com status 0
      this.tarefasFiltradas = this.tarefas.filter((tarefa) => tarefa.status === 0);
    } else if (status === 'CONCLUIDAS') {
      //filtra a lista princ para mostrar tarefas com status 2
      this.tarefasFiltradas = this.tarefas.filter((tarefa) => tarefa.status === 2);
    } else {
      // se o filtro for 'TODAS a lista filtrada é uma cópia da lista completa
      this.tarefasFiltradas = [...this.tarefas]; // '...' para criar uma cópia
    }
  }

  // prepara o formulário para edição
  iniciarEdicao(tarefa: Tarefa): void {
    this.tarefaParaEditar = { ...tarefa };
    this.tituloTarefa = tarefa.titulo;
  }

  // limpa o formulário e sai do modo de edição
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
      const tarefaAtualizada = this.tarefaParaEditar; // criamos uma constante p/ garantir que o objeto n é nulo daqui pra frente

      tarefaAtualizada.titulo = this.tituloTarefa.trim();

      this.tarefaService.updateTarefa(tarefaAtualizada).subscribe(() => {
        //atualiza a lista local
        const index = this.tarefas.findIndex((t) => t.id === tarefaAtualizada.id);
        if (index !== -1) {
          // nessa linha usamos a constante, que o TypeScript sabe que não é nula
          this.tarefas[index] = tarefaAtualizada;
        }
        this.cancelarEdicao(); // limpa o formulário após salvar
        this.filtrar(this.filtroAtual); // chama o filtro
      });
    }
    //se não, estamos criando uma nova tarefa
    else {
      // cria o objeto da nova tarefa
      const novaTarefa = { titulo: this.tituloTarefa.trim(), status: 0 };

      // usa o tarefaservice para enviar a nova tarefa para o backend (requisição POST)
      this.tarefaService.addTarefa(novaTarefa).subscribe((tarefaAdicionada) => {
        // backend responde que criou com sucesso (e devolve a tarefa com o id)
        // adiciona essa tarefa na nossa lista local 'tarefas'.
        this.tarefas.push(tarefaAdicionada);

        // limpa o formulário p nova tarefa
        this.cancelarEdicao();
        this.filtrar(this.filtroAtual); // chama o filtro
      });
    }
  }

  //metodo para deletar uma tarefa
  deletarTarefa(id: number): void {
    //chama o serviço p deletar a tarefa no backend, informando o ID
    this.tarefaService.deleteTarefa(id).subscribe(() => {
      /*após o back confirmar o delete da tarefa | atualiza a lista local p mudança reflertir na tela
          | o .filter() cria uma nova lista contendo apenas os itens q passam no teste | a nova lista conterá
          todas as tarefas cujo ID é diferente do deletado*/
      this.tarefas = this.tarefas.filter((tarefa) => tarefa.id !== id);
      this.filtrar(this.filtroAtual); // chama o filtro
    });
  }

  //método para alternar o status de uma tarefa (concluída/pendente)
  toggleStatus(tarefa: Tarefa): void {
    //muda o status: se for 0 (Pendente) vira 2 (concluída), e vice-versa
    tarefa.status = tarefa.status === 0 ? 2 : 0;

    //usa o serviço de update já criado, para salvar a mudança no back
    this.tarefaService.updateTarefa(tarefa).subscribe(() => {
      //recalcula a lista filtrada
      this.filtrar(this.filtroAtual);
    });
  }
} // a classe termina aqui
