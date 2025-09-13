# build da Aplicação
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# copia e restaura as dependências primeiro
COPY *.csproj .
RUN dotnet restore

# copia o resto dos arquivos e publica a aplicação
COPY . .
RUN dotnet publish -c Release -o /app/publish

# imagem final
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "TarefaAPI.dll"]