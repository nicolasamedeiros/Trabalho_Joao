import React from "react"; 
import axios from "axios"; 
import styled from "styled-components"; 
import { FaTrash, FaEdit } from "react-icons/fa"; 
import { toast } from "react-toastify"; 

// Estiliza a tabela
const Table = styled.table`
  width: 150%; // Define a largura da tabela
  background-color: #fff; // Define a cor de fundo da tabela
  padding: 20px; // Adiciona espaçamento interno à tabela
  box-shadow: 0px 0px 5px #ccc; // Adiciona sombra à tabela
  border-radius: 5px; // Adiciona bordas arredondadas à tabela
  max-width: 1120px; // Define a largura máxima da tabela
  margin: 20px auto; // Centraliza a tabela horizontalmente
  word-break: break-all; // Define quebras de linha automática para palavras longas
  border-collapse: collapse; /* Para garantir que as bordas colidem corretamente */
`;

// Estiliza os elementos da tabela
const Thead = styled.thead`
  display: flex; // Define o cabeçalho da tabela como um contêiner flexível
  flex-wrap: wrap; /* Permite que os cabeçalhos se ajustem em linhas */
`;

const Tbody = styled.tbody``; // Estiliza o corpo da tabela

const Tr = styled.tr`
  width: 100%; // Define a largura de cada linha como 100%
  display: flex; // Define a linha como um contêiner flexível
  justify-content: flex-start; // Alinha os elementos à esquerda
  align-items: center; // Centraliza verticalmente os elementos
  border-bottom: 1px solid #ddd; /* Adiciona uma borda inferior para cada linha */
`;

const Th = styled.th`
  text-align: left; // Alinha o texto à esquerda dentro do cabeçalho
  padding: 10px; // Adiciona espaçamento interno ao cabeçalho
  flex: 1; // Distribui igualmente os cabeçalhos dentro do contêiner flexível
`;

const Td = styled.td`
  padding: 10px; // Adiciona espaçamento interno às células de dados
  text-align: left; // Alinha o texto à esquerda dentro das células de dados
  flex: 1; // Distribui igualmente as células de dados dentro do contêiner flexível
`;

// Componente Grid que exibe a tabela de usuários
const Grid = ({ users, setUsers, setOnEdit }) => {
  // Função para lidar com a edição de um usuário
  const handleEdit = (item) => {
    setOnEdit(item); // Define o usuário a ser editado
  };

  // Função para lidar com a exclusão de um usuário
  const handleDelete = async (id) => {
    try {
      // Faz uma solicitação DELETE à API para excluir o usuário pelo ID
      const response = await axios.delete(`http://localhost:8800/${id}`);

      // Verifica se a exclusão foi bem-sucedida
      if (response.status === 200) {
        // Filtra os usuários para remover o usuário excluído da lista
        const newArray = users.filter((user) => user.id !== id);
        setUsers(newArray); // Atualiza o estado dos usuários
        toast.success(response.data); // Exibe uma mensagem de sucesso
      }
    } catch (error) {
      toast.error(error.response.data); // Exibe uma mensagem de erro caso ocorra um problema na exclusão
    }
    setOnEdit(null); // Limpa o estado de edição
  };

  return (
    <Table>
      <Thead> 
        <Tr> 
          
          <Th>Nome</Th>
          <Th>Sobrenome</Th>
          <Th>Cpf</Th>
          <Th>Telefone</Th>
          <Th onlyWeb>E-mail</Th>
          <Th onlyWeb>Senha</Th>
          <Th onlyWeb>Endereço</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody> 
        {users.map((item, i) => ( // Mapeia os usuários e renderiza cada um em uma linha da tabela
          <Tr key={i}> {/* Linha da tabela */}
            {/* Células de dados */}
            <Td>{item.nome}</Td>
            <Td>{item.sobrenome}</Td>
            <Td>{item.cpf}</Td>
            <Td>{item.celular}</Td>
            <Td onlyWeb>{item.email}</Td>
            <Td onlyWeb>{item.senha}</Td>
            <Td onlyWeb>{item.endereco}</Td>
            <Td alignCenter> {/* Célula com ícone de edição */}
              <FaEdit onClick={() => handleEdit(item)} style={{ cursor: "pointer" }} /> {/* Ícone de edição */}
            </Td>
            <Td alignCenter> {/* Célula com ícone de exclusão */}
              <FaTrash onClick={() => handleDelete(item.id)} style={{ cursor: "pointer" }} /> {/* Ícone de exclusão */}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid; // Exporta o componente Grid
