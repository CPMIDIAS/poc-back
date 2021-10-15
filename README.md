# PoC back end em Node.js e TypeScript

[![License](https://img.shields.io/badge/License-MIT-lightgray)](/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-lightblue)](/code_of_conduct.md)
![love](https://img.shields.io/badge/Code%20with-%F0%9F%96%A4-lightgreen)

Repositório destinado à uma aplicação simples - *Proof of Concept* - para aprendizado da linguagem
TypeScript com Node.js.

## Contexto

A proposta desta PoC é desenvolver um blog com autenticação de repórteres (*user*) e criação de
reportagens (*article*).
Os requisitos deste sistema são:
1. Página Inicial com a listagem de todas as postagens realizadas por  todos os repórteres.
2. Página para cadastro das notícias com as seguintes informações:
    - Título.
    - Linha fina.
    - Imagem
    - Texto da reportagem.
    - Autor.
    - Data da postagem.
3. Haverá também uma página de Administração (acesso com autenticação) que poderá:
    - Cadastrar novos repórteres para usuários com permissão de administrador
    - Criar ou editar uma reportagem
    - Publicar uma reportagem
4. Tela de login com autenticação.
5. Possibilidade de extração de relatórios com número de postagem  por repórter.

## Execução local

Esta PoC esta configurada em docker e com este [Makefile](./Makefile) que "resume" os comandos do
docker-compose. Note que existem dois docker-compose, o Makefile cobre o do ambiente de
desenvolvimento.

### Para subir o projeto:
```bash
$ make up
```
Utilizar o Postman ou similar em <http://localhost:3000>.

### Executar o lint (precisa do comando anterior em execução):
```bash
# precisa de outro terminal aberto executando o 'make up'
$ make lint
```

### Executar o pgadmin4:
```bash
$ make pgadmin4
```
Basta a acessar <http://localhost:15432>. As credenciais são os valores de `PGADMIN_DEFAULT_EMAIL`
e `PGADMIN_DEFAULT_PASSWORD` disponíveis no [docker-dev.env](./envs/docker-dev.env). No primeiro
acesso você precisará criar um acesso em *Object > Create > Server...*, dê um nome para esse
servidor e na aba *Connection*, em *Host name/address* preencha db-back (*localhost* não funcionará
pois o PostgreSQL esta acessível apenas dentro do docker).
