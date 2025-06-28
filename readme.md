# Brev.ly | Encurtador de URLs

Projeto desenvolvido como parte do **Desafio 1 do Módulo Fundamentos Técnicos e Estratégicos (120h)** da pós-graduação em Desenvolvimento Full Stack pela [Faculdade de Tecnologia Rocketseat](https://rocketseat.com.br).

O objetivo foi criar uma aplicação **Full Stack** de encurtamento de URLs, com funcionalidades robustas no backend e uma interface moderna no frontend.

## ✨ Funcionalidades

- Criação de links encurtados únicos;
- Redirecionamento a partir do link curto;
- Listagem de links já criados com contagem de acesso;
- Exclusão de link selecionado;
- Exportação CSV de todos os dados dos links;
- Tratativa de links acesso a links inválidos.

## 🧱 Tecnologias Utilizadas

### 🛠 Back-end

- **Node.js + TypeScript** — Plataforma escalável para construção de aplicações com código moderno e seguro;
- **Fastify** — Framework web rápido e leve, ideal para APIs performáticas;
- **Zod** — Biblioteca de validação de dados com tipagem forte, integrada ao TypeScript;
- **Drizzle ORM + PostgreSQL** — ORM moderno e typesafe, com foco em produtividade e segurança, utilizando PostgreSQL como banco de dados relacional;
- **Docker** — Empacotamento da aplicação em containers para garantir portabilidade entre ambientes;
- **Cloudflare R2** — Armazenamento de arquivos escalável, utilizado para hospedar os relatórios CSV gerados pela aplicação;
- **Swagger (Fastify Swagger)** — Geração automática de documentação interativa da API, permitindo testes diretos e melhor integração com consumidores.

### 💻 Front-end

- **React + TypeScript** — Biblioteca declarativa para criação de interfaces reativas, com segurança de tipos e desenvolvimento moderno;
- **Vite** — Ferramenta de build ultrarrápida e otimizada para projetos com React;
- **Tailwind CSS** — Framework de utilitários CSS que permite estilização rápida e responsiva diretamente no JSX;
- **React Router** — Biblioteca de roteamento que permite a criação de Single Page Applications (SPA) com navegação fluida;
- **Zustand** — Biblioteca leve e minimalista para gerenciamento global de estado;
- **Zod** — Utilizado para validação de formulários e integração com React Hook Form;
- **Framer Motion** — Biblioteca de animações fluídas para React, melhorando a experiência visual.

## ⚙️ Rodando o Projeto Localmente

Para isso siga os passos a passos dentro do arquivo `readme` das pastas `server` e `web`.
