//Coração da conexão com o BD
//AppDbContext é a ponte entre o C# e o banco
//ele exponibiliza as tabelas DbSet como objetos para o C#


using Microsoft.EntityFrameworkCore;
using TarefaAPI.Models; //TarefaAPI.Models define a estrutura dos dados (isto é uma tarefa, ela tem um id um titulo e um status)

namespace TarefaAPI.Data;

public class AppDbContext : DbContext // : <- herança, AppDbContext vai herdar as características da classe base DbContext do EF
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) /* utiliza um padrão de injeção de dependência, basicamente
    essa linha cria uma porta de entrada na classe, pra que outro arquivo no program.cs possa inejtar as configurações de conexao do bd */
    {
    }

    public DbSet<Tarefa> Tarefas { get; set; } /* pegue a classe Tarefa(tarefa.cs), transforme-a em uma tabela Tarefas
    no bd e fornece permissão de leitura e modificação*/
}