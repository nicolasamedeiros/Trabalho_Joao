import axios from "axios"; // Biblioteca para fazer requisições HTTP
import React, { useEffect, useRef } from "react"; 
import styled from "styled-components"; // Biblioteca para criar componentes estilizados
import { toast } from "react-toastify"; // Biblioteca para exibir notificações

// Definição de um componente estilizado para o formulário
const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

// Componente estilizado para a área de input
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

// Componente estilizado para o input
const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

// Componente estilizado para o label
const Label = styled.label``;

// Componente estilizado para o botão
const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

// Definição do componente Form
const Form = ({ getUsers, onEdit, setOnEdit }) => {
  // Criação de uma referência para o formulário
  const ref = useRef();

  // useEffect para preencher o formulário quando o estado de edição é alterado
  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      // Preenche os campos do formulário com os dados do usuário a ser editado
      user.nome.value = onEdit.nome || "";
      user.sobrenome.value = onEdit.sobrenome || "";
      user.cpf.value = onEdit.cpf || "";
      user.celular.value = onEdit.celular || "";
      user.email.value = onEdit.email || "";
      user.senha.value = onEdit.senha || "";
      user.endereco.value = onEdit.endereco || "";
    }
  }, [onEdit]); // Executa o efeito quando o estado onEdit é alterado

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const user = ref.current;

    // Verifica se todos os campos estão preenchidos
    if (
      !user.nome.value ||
      !user.sobrenome.value ||
      !user.cpf.value ||
      !user.celular.value ||
      !user.email.value ||
      !user.senha.value ||
      !user.endereco.value
    ) {
      return toast.warn("Preencha todos os campos!"); // Exibe um aviso se algum campo estiver vazio
    }

    // Se estiver editando um usuário, faz uma requisição PUT
    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          sobrenome: user.sobrenome.value,
          cpf: user.cpf.value,
          celular: user.celular.value,
          email: user.email.value,
          senha: user.senha.value,
          endereco: user.endereco.value,
        })
        .then(({ data }) => toast.success(data)) // Exibe uma notificação de sucesso
        .catch(({ data }) => toast.error(data)); // Exibe uma notificação de erro
    } else {
      // Se estiver criando um novo usuário, faz uma requisição POST
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          sobrenome: user.sobrenome.value,
          cpf: user.cpf.value,
          celular: user.celular.value,
          email: user.email.value,
          senha: user.senha.value,
          endereco: user.endereco.value,
        })
        .then(({ data }) => toast.success(data)) // Exibe uma notificação de sucesso
        .catch(({ data }) => toast.error(data)); // Exibe uma notificação de erro
    }

    // Limpa os campos do formulário após o envio
    user.nome.value = "";
    user.sobrenome.value = "";
    user.cpf.value = "";
    user.celular.value = "";
    user.email.value = "";
    user.senha.value = "";
    user.endereco.value = "";

    // Reseta o estado de edição e atualiza a lista de usuários
    setOnEdit(null);
    getUsers();
  };
  
  // Renderiza o formulário
  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Sobrenome</Label>
        <Input name="sobrenome" />
      </InputArea>
      <InputArea>
        <Label>Cpf</Label>
        <Input name="cpf" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="celular" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Senha</Label>
        <Input name="senha" type="password" />
      </InputArea>
      <InputArea>
        <Label>Endereço</Label>
        <Input name="endereco" />
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

// Exporta o componente Form como padrão
export default Form;
