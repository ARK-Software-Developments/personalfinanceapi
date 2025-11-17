"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createConnection({
    host: process.env.REACT_APP_DBSERVER,
    user: process.env.REACT_APP_DBUSER,
    password: process.env.REACT_APP_DBPASS,
    database: process.env.REACT_APP_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.default = pool;
