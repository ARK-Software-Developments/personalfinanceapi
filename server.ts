import express from 'express';
import usersRoutes from './src/modules/users/routes';
import entitiesRoutes from './src/modules/entities/routes';
import fs from 'fs';
import path from 'path';

require('dotenv').config();

const chalk = require('chalk');
const http = require('http');
const app = express();

const bodyParser = require('body-parser');

// //// SEGURIDAD ////
app.disable('x-powered-by');
const environment = process.env.NODE_ENV || 'prod';

console.log(`${chalk.green(new Date(Date.now()).toISOString() + ' Environment enabled to')} ${environment}`);

// Creacion de Server, middlewares, routes
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'POST, GET, PUT, DELETE, OPTIONS, HEAD, authorization, Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
    next();
});

app.use(express.json());

app.use('/api', usersRoutes);
app.use('/api', entitiesRoutes);

// Opciones para HTTPS
/*
const options = {
  key: fs.readFileSync(path.join(__dirname, 'path/to/your/private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'path/to/your/certificate.crt'))
};
*/

// Inicia el servidor HTTPS
http.createServer(app).listen(process.env.REACT_APP_PORT, () => {
  console.log(`Servidor HTTPS escuchando en ${process.env.REACT_APP_PUBLIC_URL}:${process.env.REACT_APP_PORT}`);
});
