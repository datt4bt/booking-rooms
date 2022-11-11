# Backend API

## Requiment

- Nodejs >= 14
- PostgreSQL >= 12.12

### Installation

Requires [Node.js](https://nodejs.org/) v14+ to run.

```sh
$ sudo apt update
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
$ sudo apt -y install nodejs
$ node  -v
```

### Install the dependencies and devDependencies by `npm`.

```sh
$ npm install
```

### Start API with development environment

```sh
$ npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Start API with production environment

```sh
$ npm start
```

## Deployment

- Docker
- Docker Compose

### Start service.

```sh
docker-compose up -d --build
```

### Stop service.

```sh
docker-compose down
```
