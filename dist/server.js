"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/modules/users/routes"));
const routes_2 = __importDefault(require("./src/modules/entities/routes"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
const chalk = require('chalk');
const http = require('http');
const app = (0, express_1.default)();
const bodyParser = require('body-parser');
// //// SEGURIDAD ////
app.disable('x-powered-by');
const environment = process.env.NODE_ENV || 'prod';
console.log(`${chalk.green(new Date(Date.now()).toISOString() + ' Environment enabled to')} ${environment}`);
// Creacion de Server, middlewares, routes
app.use(express_1.default.json({ limit: '200mb' }));
app.use(express_1.default.urlencoded({ limit: '200mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'POST, GET, PUT, DELETE, OPTIONS, HEAD, authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
    next();
});
// Sirve los archivos estáticos desde la carpeta 'build'
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.use(express_1.default.json());
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'build', 'index.html'));
});
app.use('/api', routes_1.default);
app.use('/api', routes_2.default);
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
