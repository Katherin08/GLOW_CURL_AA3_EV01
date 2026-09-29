
// Importamos mysql2 para conectarnos con MySQL
const mysql = require("mysql2/promise");

// Cargamos las variables del archivo .env
require("dotenv").config();

// Creamos un grupo de conexiones con MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Si no se especifica el puerto, utiliza el 3306
    port: Number(process.env.DB_PORT) || 3306,

    // Permite esperar una conexión disponible
    waitForConnections: true,

    // Cantidad máxima de conexiones simultáneas
    connectionLimit: 10,

    // No limita las solicitudes que pueden quedar esperando
    queueLimit: 0
});

// Exportamos la conexión para utilizarla desde server.js
module.exports = pool;