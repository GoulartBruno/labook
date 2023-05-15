# Projeto Labook

##### Acesse a documentação através do link:

[Labook Documentation](https://documenter.getpostman.com/view/25826658/2s93eeS9hk)

<div style="display: flex;justify-content:center;">
</div>
<div style="text-align:justify; margin: 20px 0">
O projeto consiste em uma API REST chamada de Labook que exerce algumas funcionalidades de uma rede social. A API permite criar um usuário e fazer um sign in com email e senha informados. O usuário pode criar publicações, editar e deletar suas publicações conforme desejar. Além disso, cada usuário pode visualizar as publicações de outros usuários do Labook e interagir com elas por meio de reações positivas ou negativas. O projeto identifica cada usuário logado no sistema por meio de tokens jwt (JSON Web Token) disponibilizados ao cliente ao efetuar um cadastro ou o próprio login na API. Outro aspecto relevante é o armazenamento de senhas dos usuários. Ao efetuar o cadastro, o usuário cria uma senha que é enviada para a API, que utiliza o algorítmo Bcrypt de criptografia irreversível nas senhas para então armazená-las no banco de dados. As senhas são armazenadas em um formato ilegível, ou seja, nem os desenvolvedores e nem possíveis invasores detêm conhecimento das senhas originais. O login é possível apenas pela comparação da senha armazenada no banco de dados com a senha informada pelo usuário no momento do login.

## Ìndice

- <a href="#funcionalidades">Funcionalidades do Projeto</a>
- <a href="#arquitetura">Arquitetura de Projeto</a>
- <a href="#rodar">Como rodar este projeto?</a>
- <a href="#tecnologias">Tecnologias Utilizadas</a>
- <a href="#autor">Autor</a>

## Funcionalidades do projeto (endpoints)

- [x] Criar usuário;
- [x] Efetuar login de usuário;
- [x] Criar publicação;
- [x] Editar publicação;
- [x] Excluir publicação;
- [x] Visualizar as publicações de todos os usuários;
- [x] Efetuar like/dislike em uma publicação.

## Arquitetura do projeto

<div style="text-align:justify; margin: 20px 0">
O projeto foi organizado conforme a arquitetura em camadas. A API possui sete endpoints, um para cada funcionalidade, as quais foram previamente descritas anteriormente. Cada enpoint executa uma ação conforme os dados de entrada do cliente. Os dados de entrada do cliente são recebidos no arquivo Index, onde são direcionados entre duas possíveis rotas, usuários ou publicações. Logo após, os dados chegam à camada Router (de usuários ou de publicações) e são direcionados para a funcionalidade solicitada pelo cliente. Então os dados chegam à camada Controller, onde são recebidos e conferidos se os dados atendem aos requisitos de tipagem e formato necessários para executar as funcionalidades. Os dados são enviados então à cama Business, onde os dados são conferidos de acordo com as regras da API e tratados para garantir a comunicação correta com a base de dados. Após a Business, os dados chegam à camada Database, que faz a comunicação direta com o banco de dados, resgatando, editando, deletando ou inserindo informações que estão armazenadas na base de dados, conforme solicitação do cliente e atendimento aos requisitos conferidos nas camadas anteriores. Após esse processo de entrada de dados na API, a resposta segue o fluxo no sentido contrário ao descrito, isto é: Database --> Business --> Controller. A controller é responsável pelo envio da resposta ao usuário. A camada Controller informa ao usuário se a operação solicitada foi atendida ou se ocorreu um erro, caso o ocorra a segunda opção, o cliente é informado sobre o tipo de erro encontrado e o motivo da falha de operação. A estrutura em camadas torna o código escalável e de fácil manutenção, uma vez que cada camada possui o seu papel definido e os meios de comunicação entre elas são facilmente identificados, logo, ao efetuar manutenção, o desenvolvedor pode facilmente acessar o setor específico do código onde deseja realizar uma atualização ou correção de erros.
</div>
        
## Como rodar este projeto?

```bash
# Clone este repositório
$ git clone https://github.com/GoulartBruno/labook

# Acesse a pasta do projeto no seu terminal
$ cd labook

# Instale as dependências do Node.JS e bibliotecas
$ npm install

# Crie um arquivo your_database_name.db na pasta src do projeto.

# Neste caso, para a criação e manipulação do banco de dados, foi utilizado o SQLite. Se deseja utilizar também o SQLite, crie um servidor com o VSCode selecionando a opção SQLite e vincule ao seu arquivo.db criado anteriormente.

# Abra o arquivo database.sql e execute as queries de CREATE TABLE e INSERT INTO TABLE para criar as estruturas de dados e inserir os primeiros dados para teste.

# Crie um arquivo .env na sua pasta raíz com base no .env.example presenta na pasta do projeto.

# Execute a aplicação
$ npm run dev

# A aplicação será iniciada na porta 3003 do seu computador, caso não indique outra porta no seu arquivo .env.

# Feitos esses passos, você deve utilizar uma plataforma de requisições HTTP como o Postman para utilizar os endpoints da API ou construir sua própria interface gráfica para efetuar as requisições como client-side.
```

Para a correta utilização da API, consulte a documentação utilizando o link abaixo:

[Labook Documentation](https://documenter.getpostman.com/view/25826658/2s93eeS9hk)

## Tecnologias utilizadas

1. [NodeJS](https://nodejs.org/)
2. [Express](https://expressjs.com)
3. [Knex](https://knexjs.org)
4. [SQLite](https://sqlite.org/index.html)
5. [Zod](https://www.npmjs.com/package/zod)
6. [UUID lib](https://www.npmjs.com/package/uuid/)
7. [Token jwt](https://de.wikipedia.org/wiki/JSON_Web_Token)
8. [.env](https://en.wikipedia.org/wiki/Env)
9. [Bcrypt](https://www.npmjs.com/package/bcrypt/)
10. [Typescript](https://www.typescriptlang.org/)

## Autor

## Bruno Goulart

[Linkedin](https://www.linkedin.com/in/goulartbruno/)
