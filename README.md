<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Documentación

## Stack

- [NodeJs](https://nodejs.org/en/)
- [Nest](https://github.com/nestjs/nest)
- [PostgreSQL](https://www.postgresql.org/download/) para prueba en local
- [Docker](https://docs.docker.com/engine/install/) 

## Installation
- Nota tener instalado NodeJs y Postgres, docker es opcional 
```bash
# Instalar Nestjs
$ npm i -g @nestjs/cli

# Luego instalar las dependencias del repositorio 
$ npm install
```

## Ambientes de desarrollo
- Tenemos de guia el archivo .env.example, ahí estan todas las credenciales que se usan para este backend.
- Para ejecutar el backend necesitamos crear un archivo .env.develop donde utilizaremos las keys del archivo .env.example, donde unicamente vamos a remplazar el valor de las credenciales.

- si queremos ejecutar el backend en develop, debemos crear un archivo .env.develop 

## Running the app

```bash
# develop
$ npm run dev
```

### Para usar Docker Compose, debes tener instalados Docker y Docker Compose en tu máquina.

- Antes de ejecutar los contenedores, asegúrate de que la variable de entorno DB_HOST tenga el valor correcto
```bash
DB_HOST=db
```
Esto es porque, dentro de Docker Compose, el contenedor de PostgreSQL se llama db y para que nos logremos conectar debemos apuntar a db.

- y ahora si
## Running the app dockercompose
```bash
$ docker compose up
```

## Test

```bash
# unit tests
$ npm run test
```

## Endpoints
```bash
# obtener todos los productos GET
curl --location 'localhost:7001/products'

# Crear un producto POST
curl --location 'localhost:7001/products' \
--header 'Content-Type: application/json' \
--header 'x-api-key: test-key' \
--data '{
    "name": "Taza Cerámica",
    "sku": "TAZ-0021",
    "price": 0,
    "stock": 10
}'

# Actualizar el stock PATCH
curl --location --request PATCH 'localhost:7001/products/1/stock' \
--header 'Content-Type: application/json' \
--header 'x-api-key: test-key' \
--data '{
    "stock": 10
}'

# Simulacipon de un reindex POST
curl --location 'localhost:7001/products/4/reindex' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Taza Cerámica",
    "sku": "TAZ-001e224",
    "price": 0,
    "stock": 0
}'
```

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
