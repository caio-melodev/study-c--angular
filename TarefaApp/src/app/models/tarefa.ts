// define a forma que 'Tarefa' deve ter
// 'export' permite que essa interface seja importada e usada em outros arquivos.
//definição em typscript
export interface Tarefa {
  id: number;
  titulo: string;
  status: number; // no backend: 0 = Pendente, 1 = EmAndamento, 2 = Concluida
}