import { useState } from "react";
import styled from "styled-components";
import { MenuHamburguer } from "../MenuHamburguer/MenuHamburguer";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";



const AsideContainer = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
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
    justify-content: space-between;
  }
`;

const Logo = styled.h1`
  
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export const BarraDeListas = ({
  listas,
  exibirListaSelecionada,
  deletarLista,
  handleChange,
  listaSelecionada,
  setListas,
  menuAberto,
  setMenuAberto,
}) => {
  const [lista, setLista] = useState("Nova Lista");
  const [editingId, setEditingId] = useState(null); // Estado para controlar o id da lista sendo editada

  const criarNovaLista = () => {
    const novaLista = { id: Date.now(), name: lista, task: [] };
    setListas([...listas, novaLista]);
    exibirListaSelecionada(novaLista.id);
    setEditingId(novaLista.id);
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
        editingId={editingId}
        setEditingId={setEditingId}
        menuAberto={menuAberto}
        setMenuAberto={setMenuAberto}
      />
      <div style={{display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
      <HiMiniClipboardDocumentList size={"20px"}/>
        <Logo>Todo List</Logo>
      </div>
    </AsideContainer>
  );
};
