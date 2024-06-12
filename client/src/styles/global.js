// Importação necessária
import { createGlobalStyle } from "styled-components"; // Importa a função para criar estilos globais

// Definição de estilos globais
const Global = createGlobalStyle`
  * {
    margin: 0; // Remove a margem de todos os elementos
    padding: 0; // Remove o preenchimento de todos os elementos
    font-family: 'Poppins', sans-serif; // Define a fonte padrão para todos os elementos
  }
  
  body {
    
    display: flex; // Aplica o modelo de layout flexbox ao corpo
    justify-content: rigth; // Centraliza o conteúdo horizontalmente
    background-color: #f2f2f2; // Define a cor de fundo do corpo
  }
`;

// Exporta os estilos globais como padrão
export default Global;
