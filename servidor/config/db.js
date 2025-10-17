const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'tienda_online'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa con el ID ' + connection.threadId);
});

module.exports = connection;