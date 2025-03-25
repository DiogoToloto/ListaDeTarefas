import { useState } from "react";
import styled from "styled-components";
import { MenuHamburguer } from "../MenuHamburguer/MenuHamburguer";

const AsideContainer = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
  background-color: #313131;
  width: 250px;
  height: 100vh;
  padding: 15px;
  color: aliceblue;
  justify-content: start;

  @media (max-width: 1175px) {
    height: auto;
    width: 100%;
    position: relative;
    flex-direction: row;
  }
`;

export const BarraDeListas = ({
  listas,
  exibirListaSelecionada,
  deletarLista,
  handleChange,
  listaSelecionada,
  setListas,
}) => {
  const [lista, setLista] = useState("");

  const criarNovaLista = () => {
    const novaLista = { id: Date.now(), name: lista, task: [] };
    setListas([...listas, novaLista]);
    exibirListaSelecionada(novaLista.id);
  };

  return (
    <AsideContainer>
      <MenuHamburguer
        listas={listas}
        criarNovaLista={criarNovaLista}
        deletarLista={deletarLista}
        handleChange={handleChange}
        listaSelecionada={listaSelecionada}
        exibirListaSelecionada={exibirListaSelecionada} // Adicione esta linha
      />
      <div>
        <h2 style={{ fontSize: "2rem" }}>Todo List</h2>
      </div>
      
    </AsideContainer>
  );
};
