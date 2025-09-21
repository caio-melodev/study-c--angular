using Microsoft.EntityFrameworkCore;
using TarefaAPI.Data;

var builder = WebApplication.CreateBuilder(args); // cria o objeto builder que serve p configurar a aplicação

builder.Services.AddEndpointsApiExplorer(); // swagger vai descobrir os endpoints get,post, put e delete
builder.Services.AddSwaggerGen(); //Gerador do swagger, cria a doc interativa
builder.Services.AddControllers(); // aplicação vai usar controllers

// Adiciona o serviço do CORS
//CORS é uma regra de segurança, a API só responde a sites confiáveis policy 
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>   //permite que o frontend angular consiga conversar com a API
    {
        policy.WithOrigins("http://localhost:4200") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddDbContext<AppDbContext>(options => //registra o appdbcontext como um serviço (injeção de dependência)
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))); /*configura o serviço para usar  ngpsql é o driver do postgres
o motor do postgre | va no appsetings.json, procure a seção connectionstrings e traga a receita DefaultConnection*/

var app = builder.Build();

//bloco para a a aplicar migrations automaticamente ao iniciar a API
using (var scope = app.Services.CreateScope()) //cria um esopo de serviços temporários
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate(); //equivalente ao dotnet ef database update
}
//fim do bloco
//ativa a documentação interativa do swagger

    app.UseSwagger();
    app.UseSwaggerUI();


app.UseHttpsRedirection();

// ativa a política de CORS que definimos
app.UseCors("AllowAngularApp");

app.MapControllers();

app.Run(); //executar a aplicação