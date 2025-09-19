//arquivo que contém os endpoints
using Microsoft.AspNetCore.Mvc; //framework do .net destinado a construção de aplicações web ControllerBase/IActionResult
using TarefaAPI.Data; /*faz referência ao namespace TarefaAPI.Data do arquivo AppDbContext.cs - Esse arquivo contém a classe AppDbContext,
que herda características do DbContext(classe do EF). Essa classe (AppDBContext) faz a ponte entre o C# e o BD*/
using TarefaAPI.Models;  /*Faz referência ao namespace TarefaAPI.Models do arquivo Tarefa.cs - Esse arquivo contém o enum que limita a propriedade
Status a um conjunto especifico Pendente, EmAndamento e Concluiída(apenas esses 3 valores são válidos). Esse arquivo também contém a classe Tarefa,
que define que toda tarefa deve ter um Id, Titulo e Status, esses atributos podem ser lidos (get) e modificados (set)*/
using Microsoft.EntityFrameworkCore; //EFCore é a ferammenta que faz a comunicação com o BD e mapeia os objetos/tabelas
using System.Linq; //Linq é a funcionalidade do C# que permite a escrita de consultas para BD's usando a sintaxe da linguagem

namespace TarefaAPI.Controllers;

[ApiController] /*UM atributo que diz ao .NET que essa classe é uma API REST (uma api que segre as regras do REST para comunicação entre cliente e servidor)
-Ativa a validação de dados de entrada
-Respostas padronizadas ex: "HTTP 400 Bad Request"*/
[Route("api/[controller]")]  /*url base = api/tarefa. O sistema de roteamento do ASP.NET n é case sensitive, com isso o parâmetro [controller] referencia
a classe TarefaController, retirando o controller e deixando apenas o nome inicial(tarefa)*/
//URLS devem ser case-insensitive

//public classes podem ser visiveis fora do assembly
public class TarefaController : ControllerBase //ControllerBase é uma classe abstrata., -Fornece IActionResult()
//Tarefa controller herda de ControllerBase
{
    private readonly AppDbContext _context; /*Só pode ser acessado de dentro da classe TarefaController 
    | readonly - o valor de _context só pode ser definido uma vez |
    AppDbContext - chama a classe que representa a sessão com o BD*/
    public TarefaController(AppDbContext context) /*Para criar um TarefaController, tem que ser passado uma instância do AppDbContext
    para que o Controller tenha acesso ao BD */
    {
        _context = context; /* Estamos atribuindo o appdbcontext que foi injetado como parametro no context
        para o campo privado da classe _context*/
    }

    /*Ok() -> Carimbo "SUCESSO 200"

CreatedAtAction() -> Carimbo "CRIADO COM SUCESSO 201"

BadRequest() -> Carimbo "PEDIDO INVÁLIDO 400"

NotFound() -> Carimbo "NÃO ENCONTRADO 404"

NoContent() -> Carimbo "SUCESSO, NADA A DEVOLVER 204"*/

    //Endpoint p/ listar todas as Tarefas
    [HttpGet] //atributo que avisa que o GetTarefas() está preparado p receber requisições HTTPGET
    public IActionResult GetTarefas() // visibilidade publica | sempre vai entregar o retnorno, ok, not found,etc. | GetTarefas nome da função
    {
        var tarefas = _context.Tarefas.ToList(); /* . tolist traz tudo dentro de tarefas (dbset<tarefa>) organizado numa lista, ele é o comando q 
        executa a consulta no bd usando o EF */
        return Ok(tarefas); /* esse método Ok() cria um objeto de resultado OkObjectResult, que representa o codigo de status 200 OK*/
    }

    //Endpoint para cadastrar uma nova tarefa
    [HttpPost] //Qnd uma requisição HTTP POST chegar na URL base(/api/tarefa) é este método q vai executar

    public async Task<IActionResult> CreateTarefa(Tarefa tarefa) /*async Task, permite que o método ao encontrar uma tarefa demorada possa 
    "pausar" a si mesmo, liberar a thread p atender outras requisições e voltar ao trabalho só qnd a task terminar | task é o contêiner q gerencia
    essa operação assincrona. | Tarefa tarefa, parâmetro que  o método recebe. Tarefa define o tp de informação que o método CreateTarefa espera receber
    , nesse caso, só pode passar um objeto que tenha o formato exato da classe Tarefa (precisa de um ID, Titulo e status), tarefa é o nome que daremos à varíavel
    que vai guardar o objeto Tarefa que foi recebido */
    {
        _context.Tarefas.Add(tarefa); /* _context acessa a instância DbContext, acessa a propriedade DbSet<tarefa>, que representa a tabela Tarefas |
        .Add(tarefa) método do Dbset, informa ao change tracker do EF que uma nova entidade(o nosso objeto tarefa) deve ser inserida no bd, resumidamente 
        anota a tarefa na memória*/
        await _context.SaveChangesAsync(); /*await diz ao nosso método pause a execução aq e espere o BD responder q o insert foi concluido com sucesso
        adicione a nova tarefa e execute-a no bd (gera o comando insert into "tarefas" e envia para o psotgres), resumidamente, envia para o bd e
        espera a confirmação, o salvamento acontece aqui. o await termina e código continua na proxima linha*/
        return CreatedAtAction(nameof(GetTarefas), new { id = tarefa.Id }, tarefa); /*após o salvamento da tarefa, o méotdo envia uma resposta de sucesso
        201 created de volta p o client*/
    }

    //Endpoint para editar uma tarefa existente
    [HttpPut("{id}")] //cria um parâmetro na rota do HttpPut, significa que a url p este método é /api/tarefa/algum_id 
    public async Task<IActionResult> UpdateTarefa(int id, Tarefa tarefa) /*.net pega o id que veio na url e o coloca na váriavel id
    o .net pega o JSON da requisição e o transforma em um objeto Tarefa, msma lógica do Post*/
    {
        //checa se o ID fornecido na URL é o mesmo do objeto tarefa no corpo
        //se forem diferentes, a requisição é inválida (400 Bad request)
        if (id != tarefa.Id)
        {
            return BadRequest();
        }

        //avisa ao EF que o objeto 'tarefa' está em estado "Modificado", para que o EF saiba que deve gerar um comando UPDATE
        _context.Entry(tarefa).State = EntityState.Modified; /* _context pegue o objeto tarefa */

        try
        {
            //tenta persistir as alterações no BD
            //O savechanges async pega a nossa tarefa modificada e executa as transações
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            /*tratamento de erro, se a task foi deletada por outra pessoa entre o momento que o cliente a carregou e o momento que ele
            tentou salvar a edição*/
            if (!_context.Tarefas.Any(e => e.Id == id))
            {
                //se a tarefa não existe mais, retorna 404 Not Found
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        //se a atualização foi bem sucedida, retorna o status 204 No Content
        // padrão de sucesso para PUT, pq o cliente já tem o objeto atualizado(que ele mesmo enviou)
        return NoContent();
    }

    //Endpoint p deletar uma tarefa existente
    [HttpDelete("{id}")]

    public async Task<IActionResult> DeleteTarefa(int id)
    {
        //procura a tarefa no banco pelo Id fornecido
        var tarefa = await _context.Tarefas.FindAsync(id);
        //se a tarefa não for encontrada retorna 404
        if (tarefa == null)
        {
            return NotFound();
        }
        //avisa ao EF que a entidade deve ser removida.
        _context.Tarefas.Remove(tarefa);
        //efetiva a remoção no BD | O savechangesasync executa o sql delete
        await _context.SaveChangesAsync();
        //retorna o 204, padrão para o sucesso do DELETE
        return NoContent();
    }
}