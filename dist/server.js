"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/modules/users/routes"));
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
    const origin = req.headers.origin || '';
    /*  if (environment === developmentMode) {
        res.header('Access-Control-Allow-Origin', '*');
      } else if (corsUrlsFrontend === origin) {
       // res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Origin', origin);
      }*/
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'POST, GET, PUT, DELETE, OPTIONS, HEAD, authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
    next();
});
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.listen(process.env.REACT_APP_PORT, () => {
    console.log(`Servidor corriendo en ${process.env.REACT_APP_PUBLIC_URL}:${process.env.REACT_APP_PORT}`);
});
