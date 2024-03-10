<h1> Api Explorer Food</h1>
<hr/>
<h2>Guia de Uso</h2>

<hr>

<h3>Descrição</h3>
<p>Este repositório contém uma API construída com Express, destinada a resolução do desafio final do curso explorer da rocketSeat. Cujo o intuito é Desenvolver uma aplicação completa para um cardápio digital utilizando HTML, CSS, JavaScript, Node.js e React.js. O projeto envolve a criação de uma interface amigável para a visualização e interação com os pratos de um restaurante fictício, oferecendo uma experiência imersiva desde a seleção até o pagamento do pedido. E esse repositório é o nosso backend para gerenciar todos os endpoints da aplicação.</p>

<h3>Pré-requisitos</h3>
<ul>
    <li>Node.js instalado (v18.x ou superior)</li>
    <li>npm (Node Package Manager) ou yarn</li>
</ul>

<h3>Instalação</h3>
<ol>
    <li>Clone este repositório em sua máquina local:
        <li>git clone: <code>git@github.com:MarceloAlmd/API_explore_food.git</code></li>
    <li>Acesse o diretório do projeto:
        <code>cd API_explore_food</code></li>
    <li>Instale as dependências do projeto:
        <code>npm install</code></li>
</ol>

<h3>Configuração</h3>
<ol>
    <li>Renomeie o arquivo <code>.env.example</code> para <code>.env</code>.</li>
    <li>Abra o arquivo <code>.env</code> e configure as variáveis de ambiente conforme necessário.</li>
</ol>
 <h3>Defina as variáveis locais no arquivo <code>.env</code>:</h3>

```plaintext
AUTH_SECRET=c58406e7584da96d7646a4fc7813cbe0
PORT=3333
```

<h3>Uso</h3>
<ol>
    <li>Inicie o servidor:
        <code>npm start</code> ou <code>npm run dev</code></li>
        </li>
    <li>A API estará disponível em <code>http://localhost:3333</code> por padrão.</li>
</ol>

<h3>Faça Login:</h3>

```plaintext
Email: customer@email.com (cliente) ou admin@email.com (administrador)
Password: 123456 para ambos os emails
```

<h3>Teste Online (DEPLOY):</h3>
<strong>Front-End:</strong> https://web-explorer-food.netlify.app/



<h3>Endpoints Disponíveis:</h3>
<h3>Users</h3>
<ul>
  <li><strong>POST localhost:3333/users</strong>: Cria um novo usuário com o padrão customer.</li>
  <li><strong>PUT localhost:3333/users</strong>: Atualiza o usuário com base no ID no banco de dados.</li>
  <li><strong>DELETE localhost:3333/users</strong>: Deleta um usuário (Apenas perfil Master pode deletar).</li>  
</ul>

<hr/>

<h3>Dishes</h3>
<ul>
  <li><strong>POST localhost:3333/dishes</strong>: Cria um novo prato.</li>
  <li><strong>PUT localhost:3333/dishes</strong>: Atualiza o prato com base no ID no banco de dados.</li>
  <li><strong>GET localhost:3333/dishes/:id</strong>: Mostra os detalhes de um prato com base no ID.</li>
  <li><strong>GET localhost:3333/dishes</strong>: Lista todos os pratos disponíveis.</li>
  <li><strong>DELETE localhost:3333/dishes/:id</strong>: Deleta o prato com base no ID (apenas admin pode deletar).</li>  
</ul>

<hr/>

<h3>Favorites</h3>
<ul>
  <li><strong>PATCH localhost:3333/favorites/favorites/:id</strong>: Atualiza o campo isFavorite da tabela dishes para true ou false com base no ID.</li>
  <li><strong>GET localhost:3333/favorites</strong>: Lista todos os pratos favoritos da tabela.</li>
</ul>

<hr/>

<h3>Ingredients</h3>
<ul>
  <li><strong>PATCH localhost:3333/ingredients/:id</strong>: Atualiza a imagem do ingrediente com base no ID.</li>
</ul>

<hr/>

<h3>Order</h3>
<ul>
  <li><strong>GET localhost:3333/order</strong>: Lista todos os pratos pedidos no restaurante.</li>
  <li><strong>GET localhost:3333/order/:id</strong>: Retorna o detalhe de um pedido.</li>
  <li><strong>PATCH localhost:3333/order/:id</strong>: Atualiza o campo "status" para preparing ou delivered.</li>
  <li><strong>POST localhost:3333/order</strong>: Cria um novo pedido na tabela.</li>
</ul>

<hr/>

<h3>Files</h3>
<ul>
  <li><strong>GET localhost:3333/files/dish/path-image</strong>: Retorna a imagem do prato.</li>
  <li><strong>GET localhost:3333/files/ingredient/path-image</strong>: Retorna a imagem do ingredient.</li>
</ul>

<hr/>

<h3>Sessions</h3>
<ul>
  <li><strong>POST localhost:3333/sessions</strong>: Cria uma sessão(login) na aplicação.</li>
</ul>

<hr/>
