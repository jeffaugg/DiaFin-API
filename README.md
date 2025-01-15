# DiaFin-API

<p align="center">
  <img src="https://media1.tenor.com/m/kLyqHbWuiQ4AAAAd/dollars-usd.gif" alt="DiaFin-API">
</p>

**DiaFin-API** é uma aplicação backend desenvolvida em TypeScript que utiliza o framework Fastify para fornecer uma API RESTful destinada ao gerenciamento de finanças pessoais. Seu objetivo é facilitar o rastreamento de gastos, permitindo que os usuários cadastre despesas em seus orçamentos diários baseados em seus perfis financeiros. A aplicação integra o Prisma como ORM para interagir com um banco de dados PostgreSQL.

---

## Funcionalidades

- **Gerenciamento de Usuários**: Cadastro e autenticação de usuários, com armazenamento seguro de senhas.  
- **Perfil Financeiro**: Definição de perfis financeiros personalizados para cada usuário, permitindo um controle mais preciso dos gastos.  
- **Controle de Despesas**: Registro de despesas com detalhes como valor, data, descrição e categoria.  
- **Orçamento Diário**: Definição e acompanhamento de orçamentos diários para auxiliar no controle financeiro.  
- **Categorias de Despesas**: Classificação de despesas em categorias personalizadas para melhor organização.  
- **Receitas**: Registro de fontes de renda para um panorama completo das finanças.

---

## Estrutura do Projeto

- **prisma/**: Contém os arquivos relacionados ao Prisma, incluindo o esquema do banco de dados (*schema.prisma*).
- **src/**: Diretório principal do código-fonte, incluindo controladores, modelos e rotas.
- **.eslintignore** e **.eslintrc.js**: Arquivos de configuração para o ESLint, utilizados para manter a qualidade e consistência do código.
- **docker-compose.yml**: Arquivo de configuração para o Docker Compose, facilitando a orquestração de contêineres para a aplicação e seus serviços dependentes.
- **package.json** e **package-lock.json**: Arquivos que gerenciam as dependências do projeto e scripts de execução.
- **tsconfig.json**: Arquivo de configuração do TypeScript, definindo as opções de compilação do projeto.

---

## Dependências Principais

- **fastify**: Framework web rápido e eficiente para Node.js utilizado para construir a API RESTful.
- **prisma**: ORM utilizado para interagir com o banco de dados de forma eficiente.
- **typescript**: Superset do JavaScript que adiciona tipagem estática ao código.

---

## Configuração e Execução

### Instalação das Dependências

```bash
npx prisma migrate dev
```

## Execução da Aplicação

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Uso do Docker

Para facilitar a execução e o desenvolvimento, um arquivo `docker-compose.yml` está disponível.
Certifique-se de ter o Docker instalado e execute:

```bash
docker-compose up
```

Isso iniciará a aplicação juntamente com suas dependências em contêineres separados.



