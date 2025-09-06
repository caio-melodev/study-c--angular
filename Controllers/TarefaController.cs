using Microsoft.AspNetCore.Mvc; //framework microsoft destinado a construção de aplicações web
using TarefaAPI.Data;
using TarefaAPI.Models;

namespace TarefaAPI.Controllers;

[ApiController] /*aqui o .net automaticamente ativa validação automática, inferência de fonte e formatação de resposta
basicamente uma etiqueta que trata a classe com todas as regras de uma API*/
[Route("api/[controller]")]  //url base = api/tarefa.

public class TarefaController : ControllerBase // Tarefa controller herda de ControllerBase
{
    private readonly AppDbContext _context; /*private - apenas o código dentro da classe TarefaController
    pode ver ou alterar o _context | readonly - o valor de _context só pode ser definido uma vez | por convenção
    uma variável de campo private começa com _ */
    public TarefaController(AppDbContext context) /*Para criar um TarefaController, tem que ser passado uma instância do AppDbContext
    para que o Controller tenha acesso ao BD */
    {
        _context = context; /* Estamos atribuindo o appdbcontext que foi injetado como parametro no context
        para o campo privado da classe _context*/
    }

    //Endpoint p/ listar todas as Tarefas
    [HttpGet] //atributo que avisa que o GetTarefas() está preparado p receber requisições HTTPGET
    public IActionResult GetTarefas() // visibilidade publica | sempre vai entregar o retnorno, ok, not found,etc. | GetTarefas nome da função
    {
        var tarefas = _context.Tarefas.ToList(); /* . tolist traz tudo dentro de tarefas (dbset<tarefa>) organizado numa lista, ele é o comando q 
        executa a consulta no bd usando o EF */
        return Ok(tarefas);
    }
}