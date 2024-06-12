import { db } from "../db.js";

// Função para obter todos os usuários
export const getUsers = (_, res) => {
  const q = "SELECT * FROM cliente"; // Consulta SQL para selecionar todos os clientes

  // Executa a consulta no banco de dados
  db.query(q, (err, data) => {
    if (err) return res.json(err); // Retorna um erro se houver

    return res.status(200).json(data); // Retorna os dados dos usuários com status 200
  });
};

// Função para adicionar um novo usuário
export const addUser = (req, res) => {
  const q =
    "INSERT INTO cliente(`nome`, `sobrenome`, `cpf`, `celular`, `email`, `senha`, `endereco`) VALUES (?, ?, ?, ?, ?, ?, ?)"; // Consulta SQL para inserir um novo cliente

  // Valores a serem inseridos no banco de dados, retirados do corpo da requisição
  const values = [
    req.body.nome,
    req.body.sobrenome,
    req.body.cpf,
    req.body.celular,
    req.body.email,
    req.body.senha,
    req.body.endereco,
  ];

  // Executa a consulta no banco de dados
  db.query(q, values, (err) => {
    if (err) return res.json(err); // Retorna um erro se houver

    return res.status(200).json("Usuário cadastrado com sucesso."); // Retorna uma mensagem de sucesso
  });
};

// Função para atualizar um usuário existente
export const updateUser = (req, res) => {
  const q =
    "UPDATE cliente SET nome = ?, sobrenome = ?, cpf = ?, celular = ?, email = ?, senha = ?, endereco = ? WHERE id = ?"; // Consulta SQL para atualizar um cliente

  // Valores a serem atualizados no banco de dados, retirados do corpo da requisição
  const values = [
    req.body.nome,
    req.body.sobrenome,
    req.body.cpf,
    req.body.celular,
    req.body.email,
    req.body.senha,
    req.body.endereco,
  ];

  // Executa a consulta no banco de dados
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err); // Retorna um erro se houver

    return res.status(200).json("Usuário atualizado com sucesso."); // Retorna uma mensagem de sucesso
  });
};

// Função para deletar um usuário
export const deleteUser = (req, res) => {
  const q = "DELETE FROM cliente WHERE `id` = ?"; // Consulta SQL para deletar um cliente

  // Executa a consulta no banco de dados
  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err); // Retorna um erro se houver

    return res.status(200).json("Usuário deletado com sucesso."); // Retorna uma mensagem de sucesso
  });
};
