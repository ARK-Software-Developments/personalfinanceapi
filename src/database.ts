import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '127.0.0.1', // Cambia según tu configuración
  user: 'pf2025',
  password: '*FE02DE1F49CED400B04DFA2370167154E20B4A00',
  database: 'personalfinance',
  port: 3306,
  connectionLimit: 10
});

pool.connect();

export default pool;