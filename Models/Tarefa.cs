namespace TarefaAPI.Models; //TarefaAPI.Models define a estrutura dos dados (isto é uma tarefa, ela tem um id um titulo e um status)

public enum TarefaStatus /* enum garante que a propriedade Stauts só pode ter um dos valores válidos*/
{
    Pendente,
    EmAndamento,
    Concluída
}
public class Tarefa
{
    public int Id { get; set; } /*toda tarefa terá uma ID, que será um número inteiro
     get: bloco de código que é executado para retornar o valor do campo de suporte privado, em suma é a permissão de leitura
     set:  bloco de código que é executado para atribuir um novo valor ao campo de suporte privado, em suma permite escrever/alterar*/
    public string? Titulo { get; set; } //toda tarefa terá um Titulo, que é um texto string, ? indica que pode ser nulo.

    public TarefaStatus Status { get; set; }
}