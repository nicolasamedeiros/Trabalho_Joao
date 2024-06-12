// Importa a biblioteca Express
import express from "express";
// Importa as rotas de usuários definidas no arquivo "users.js"
import userRoutes from "./routes/users.js";
// Importa a biblioteca CORS para habilitar CORS no servidor
import cors from "cors";

// Cria uma instância do aplicativo Express
const app = express();

// Middleware para interpretar requisições JSON
app.use(express.json());
// Middleware para habilitar CORS
app.use(cors());

// Define o uso das rotas de usuários para a raiz ("/")
app.use("/", userRoutes);

// Inicia o servidor na porta 8800 e exibe uma mensagem no console
app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});
