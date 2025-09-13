using Microsoft.EntityFrameworkCore;
using TarefaAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// Adiciona o serviço do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddDbContext<AppDbContext>(options => //registra o appdbcontext
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))); /*configura o serviço para usar 
o motor do postgre | va no appsetings.json, procure a seção connectionstrings e traga a receita DefaultConnection*/

var app = builder.Build();

//bloco para a a aplicar migrations automaticamente ao iniciar a API
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate(); //equivalente ao dotnet ef database update
}
//fim do bloco

    app.UseSwagger();
    app.UseSwaggerUI();


app.UseHttpsRedirection();

// ativa a política de CORS que definimos
app.UseCors("AllowAngularApp");

app.MapControllers();

app.Run();