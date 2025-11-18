import mysql from 'mysql2/promise';

console.log("Inicializa Pool");
/**
 * Método para crear una conexión a la base de datos MySQL.
 * @returns 
 */
export function Pool(): Promise<mysql.Connection> {
  try {
    const pool = mysql.createConnection({
      host: 'localhost',
      user: 'desarrollo',
      password: 'Desarrollo2025',
      database: 'personalfinance',
      port: 3306,
      connectionLimit: 10
    });
    console.log("antes del connect");
    return pool;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
};