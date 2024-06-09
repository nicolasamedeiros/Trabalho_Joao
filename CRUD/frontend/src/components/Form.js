import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

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

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome || "";
      user.sobrenome.value = onEdit.sobrenome || "";
      user.cpf.value = onEdit.cpf || "";
      user.celular.value = onEdit.celular || "";
      user.email.value = onEdit.email || "";
      user.senha.value = onEdit.senha || "";
      user.id_endereco.value = onEdit.id_endereco || "";
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.sobrenome.value ||
      !user.cpf.value ||
      !user.celular.value ||
      !user.email.value ||
      !user.senha.value ||
      !user.id_endereco.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const userData = {
      nome: user.nome.value,
      sobrenome: user.sobrenome.value,
      cpf: user.cpf.value,
      celular: user.celular.value,
      email: user.email.value,
      senha: user.senha.value,
      id_endereco: user.id_endereco.value,
    };

    try {
      if (onEdit) {
        const { data } = await axios.put(`http://localhost:8800/${onEdit.id}`, userData);
        toast.success(data);
      } else {
        const { data } = await axios.post("http://localhost:8800", userData);
        toast.success(data);
      }
    } catch (error) {
      toast.error(error.response.data);
    }

    user.nome.value = "";
    user.sobrenome.value = "";
    user.cpf.value = "";
    user.celular.value = "";
    user.email.value = "";
    user.senha.value = "";
    user.id_endereco.value = "";

    setOnEdit(null);
    getUsers();
  };

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
        <Input name="id_endereco" />
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

export default Form;
