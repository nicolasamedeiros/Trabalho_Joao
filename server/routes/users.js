// Importa a biblioteca Express
import express from "express";

// Importa as funções do controlador de usuários
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user.js";

// Cria uma instância do roteador do Express
const router = express.Router();

// Define a rota para obter todos os usuários, utilizando a função getUsers
router.get("/", getUsers);

// Define a rota para adicionar um novo usuário, utilizando a função addUser
router.post("/", addUser);

// Define a rota para atualizar um usuário existente, utilizando a função updateUser
router.put("/:id", updateUser);

// Define a rota para deletar um usuário, utilizando a função deleteUser
router.delete("/:id", deleteUser);

// Exporta o roteador como padrão
export default router;
