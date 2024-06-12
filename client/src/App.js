import GlobalStyle from "./styles/global"; 
import styled from "styled-components"; 
import Form from "./components/Form.js"; 
import Grid from "./components/Grid"; 
import { useEffect, useState } from "react"; 
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import axios from "axios"; 

// Componente estilizado para o container principal
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

// Componente estilizado para o título
const Title = styled.h2``;

// Definição do componente principal App
function App() {
  // Declaração de estados
  const [users, setUsers] = useState([]); // Estado para armazenar os usuários
  const [onEdit, setOnEdit] = useState(null); // Estado para controlar o usuário em edição

  // Função para obter os usuários da API
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800"); // Faz uma requisição GET para obter os usuários
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1))); // Ordena os usuários por nome e atualiza o estado
    } catch (error) {
      toast.error(error); // Exibe uma notificação de erro em caso de falha
    }
  };

  // useEffect para obter os usuários quando o componente é montado ou quando setUsers muda
  useEffect(() => {
    getUsers();
  }, [setUsers]);

  // Renderiza o componente App
  return (
    <>
      <Container>
        <Title>CADASTRO CLIENTE</Title> {/* Título da página */}
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} /> {/* Componente de formulário */}
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} /> {/* Componente de grid */}
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} /> {/* Container para notificações */}
      <GlobalStyle /> {/* Aplica os estilos globais */}
    </>
  );
}

// Exporta o componente App como padrão
export default App;
