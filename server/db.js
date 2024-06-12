import mysql from "mysql";

// Cria uma conexão com o banco de dados MySQL
export const db = mysql.createConnection({
    host: "localhost",      // Define o host do banco de dados
    user: "root",           // Define o usuário do banco de dados
    password: "Ra5*136617", // Define a senha do banco de dados
    database: "crudreact"   // Define o nome do banco de dados
});
