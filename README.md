# 📌 FlowNote - Gerenciador de Tarefas

<br>

![Screenshot da Aplicação](https://raw.githubusercontent.com/caio-melodev/Desafio-Full-Stack-Developer-Keevo/refs/heads/main/docs/Todas.png)

<br>

## 📝 Descrição

O **FlowNote** é uma aplicação **Full Stack** para gerenciamento de tarefas (*To-Do List*), desenvolvida como parte de um desafio técnico.
O sistema conta com um **backend RESTful** em **.NET 8 (C#)** e um **frontend dinâmico** em **Angular e TypeScript**, proporcionando uma experiência **reativa, intuitiva e responsiva** para organização de atividades.

---

## ✅ Requisitos Atendidos

### Funcionais

* [x] Cadastrar nova tarefa
* [x] Editar tarefa
* [x] Remover tarefa
* [x] Alterar status da tarefa (pendente/concluída)
* [x] Visualizar lista de tarefas
* [x] Filtrar tarefas por status

### Técnicos

* [x] Backend em **.NET 8 / ASP.NET Core**
* [x] Frontend em **Angular**
* [x] Banco de Dados **PostgreSQL**
* [x] ORM **Entity Framework Core**

---

## ⭐ Pontos Extras

* [x] **Swagger/OpenAPI** para documentação da API
* [ ] **Docker** (em desenvolvimento)
* [ ] Funcionalidades extras (em planejamento)

---

## 🚀 Tecnologias Utilizadas

### Backend

* [.NET 8](https://dotnet.microsoft.com/download)
* **C# / ASP.NET Core Web API**
* **Entity Framework Core 8** (ORM)
* **PostgreSQL** (Banco de Dados)
* **Swagger/OpenAPI** (Documentação da API)

### Frontend

* [Angular 18+](https://angular.io/)
* **TypeScript**
* **HTML5 & CSS3** (Flexbox para layout responsivo)
* **RxJS** (Programação Reativa)

### Ferramentas de Apoio

* **Git & GitHub** (Versionamento)
* **Visual Studio Code**
* **.NET CLI & Angular CLI**
* **DBeaver** (Gerenciamento do Banco de Dados)
* **User Secrets** (Configuração de segredos em ambiente de desenvolvimento)

---

## ⚙️ Como Executar o Projeto

### 📌 Pré-requisitos

Certifique-se de ter instalado:

* [.NET 8 SDK](https://dotnet.microsoft.com/download)
* [Node.js (LTS)](https://nodejs.org/)
* [Angular CLI](https://angular.io/cli)
* [PostgreSQL](https://www.postgresql.org/download/)

---

### 🔹 Backend (API)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio/TarefaAPI

# Crie um banco de dados PostgreSQL vazio chamado "tarefasdb"

# Configure o User Secrets com sua string de conexão
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=tarefasdb;Username=postgres;Password=SUA_SENHA_AQUI"

# Instale ferramentas locais do EF Core
dotnet tool restore

# Rode a aplicação (as tabelas serão criadas automaticamente)
dotnet run
```

---

### 🔹 Frontend (Angular)

```bash
# Acesse a pasta do frontend
cd ../TarefaApp

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
ng serve

# Acesse em http://localhost:4200
```

---

## 📖 Documentação da API

A API possui uma documentação interativa gerada com Swagger (OpenAPI), permitindo que todos os endpoints sejam testados diretamente pelo navegador.

![Swagger geral](https://raw.githubusercontent.com/caio-melodev/Desafio-Full-Stack-Developer-Keevo/refs/heads/main/docs/Swagger%20geral.png)

![Swagger GET](https://raw.githubusercontent.com/caio-melodev/Desafio-Full-Stack-Developer-Keevo/refs/heads/main/docs/Swagger%20GET.png)
---

## 🐳 Executando com Docker (em desenvolvimento)

Em breve será possível rodar a aplicação inteira com:

```bash
docker-compose up --build
```

---

## 🏗️ Arquitetura e Decisões Técnicas

* **.NET + EF Core** para garantir robustez e fácil integração com PostgreSQL.
* **Angular + RxJS** no frontend para reatividade e performance.
* **Swagger** para facilitar o consumo e teste da API.
* **Docker (em progresso)** para padronizar ambiente e facilitar deploy.

---

## 📂 Estrutura do Projeto

```
seu-repositorio/
│── TarefaAPI/        # Backend (.NET 8 + EF Core + PostgreSQL)
│── TarefaApp/        # Frontend (Angular + TypeScript)
│── README.md         # Documentação do projeto
```

---

## 🤝 Contribuindo

1. Faça um **fork** do projeto
2. Crie uma **branch** (`git checkout -b feature/nova-funcionalidade`)
3. Realize suas alterações e faça o **commit** (`git commit -m 'feat: minha nova funcionalidade'`)
4. Envie para o repositório remoto (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request** 🎉
