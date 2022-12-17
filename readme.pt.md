<h1 align="center">Microserviço de Notificações - Ignite Lab NodeJS</h1>

<div align="right">
    <a href="./readme.md" target="_blank" />English Version</a>
</div>
<br />

<div align="center">
    <img alt="Diagrama Entidade-Relacionamento" title="Diagrama Entidade-Relacionamento" src="./prisma/ERD.png" />
</div>

<p>🚀 Nesse repositório você encontrará um microsserviço de notificações desenvolvido durante a edição NodeJS do programa Ignite Lab da <a href="https://www.rocketseat.com.br/" target="_blank">Rocketseat</a>.</p>

<p align="center">
 <a href="#status">Funcionalidades</a> • 
 <a href="#running">Executando</a> • 
 <a href="#contributing">Contribuindo</a> • 
 <a href="#license">Licença</a>
</p>

<h2 id="status"> ✅ Funcionalidades</h2>
<ul>
    <li>Arquitetura SOLID com NestJS;</li>
    <li>Criar, Cancelar, Ler, Des-ler, Contar e consultar uma notificação;</li>
    <li>Integração com o ORM Prisma;</li>
    <li>Teste unitário das principais funcionalidades;</li>
    <li>Kafka;</li>
</ul>

<h2 id="running"> 🖥 Executando</h2>
Após instalar o <a href="https://nodejs.org/en/" target="_blank">NodeJS</a>, você pode clonar esse repositório e rodar os seguintes comandos:
<br />
<pre>
    npm install
    npm run start:dev
</pre>

A coleção API do Insomnia pode ser encontrada em <a href="./insomnia.yaml">./insomnia.yaml</a>

Para rodar esse projeto com Kafka, você precisará realizar a configuração do arquivo .env com suas configurações Kafka. O consumer espera os campos content, category e recipientId do producer.

<h2 id="contributing">🤝 Contribuindo</h2>
<p>Encontrou algum BUG ou tem uma contribução a fazer? Sinta-se a vontade para contribuir.</p>

<h2 id="licence">📘 Licença</h2>
<a href="https://choosealicense.com/licenses/unlicense/" target="_blank" />Unlicense</a>

