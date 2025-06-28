# Brev.ly | Encurtador de URLs | Back-end

Projeto desenvolvido como parte do **Desafio 1 do Módulo Fundamentos Técnicos e Estratégicos (120h)** da pós-graduação em Desenvolvimento Full Stack pela [Faculdade de Tecnologia Rocketseat](https://rocketseat.com.br).

O objetivo foi criar uma aplicação **Full Stack** de encurtamento de URLs, com funcionalidades robustas no backend e uma interface moderna no frontend.

## ✨ Funcionalidades

- Criar um link sem duplicação de URL encurtada;
- Deletar links cadastrado;
- Obter a URL original pelo link encurtado;
- Listar todas as URLs cadastradas;
- Incrementar a contagem de acessos;
- Exportar os links em um arquivo CSV;
- Armazenar o CSV em uma CDN (Cloudflare R2);
- Nomear o arquivo CSV de forma única e aleatória.

## 🧱 Tecnologias Utilizadas

- **Node.js + TypeScript** — Plataforma escalável para construção de aplicações com código moderno e seguro;
- **Fastify** — Framework web rápido e leve, ideal para APIs performáticas;
- **Zod** — Biblioteca de validação de dados com tipagem forte, integrada ao TypeScript;
- **Drizzle ORM + PostgreSQL** — ORM moderno e typesafe, com foco em produtividade e segurança, utilizando PostgreSQL como banco de dados relacional;
- **Docker** — Empacotamento da aplicação em containers para garantir portabilidade entre ambientes;
- **Cloudflare R2** — Armazenamento de arquivos escalável, utilizado para hospedar os relatórios CSV gerados pela aplicação;
- **Swagger (Fastify Swagger)** — Geração automática de documentação interativa da API, permitindo testes diretos e melhor integração com consumidores.

## ⚙️ Rodando o Projeto Localmente

1. Primeiramente devemos definir as variáveis de ambiente, utilize o arquivo `.env.example` como base;

2. Agora executamos o ambiente para o banco de dados utilizando o `docker`;
```bash
docker compose up -d
```

3. Agora temos que criar nossas tabelas do banco de dados;
```bash
npm run db:migrate
```

3. Depois basta executar o seguinte comando para iniciar o servidor.
```bash
npm run dev
```
