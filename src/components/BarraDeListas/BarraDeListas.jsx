import { useState } from "react";
import styled from "styled-components";
import { MenuHamburguer } from "../MenuHamburguer/MenuHamburguer";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { BarraDeFiltro } from "../BarraDeFiltro/BarraDeFiltro";
import { MenuAgendamentos } from "../MenuAgendamentos/MenuAgendamentos";



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

const ContainerLogo = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  @media (max-width: 1175px){
    display: none;
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
  handleDateChange,
  tarefasFiltradas,
  date,
  menuAbertoAG,
  setMenuAbertoAG
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
      <ContainerLogo>
      <HiMiniClipboardDocumentList size={"20px"}/>
        <Logo>Todo List</Logo>
      </ContainerLogo>
      <div>
        <MenuAgendamentos handleDateChange={handleDateChange}
        date={date}
        tarefasFiltradas={tarefasFiltradas}
        listas={listas}
        menuAbertoAG={menuAbertoAG}
        setMenuAbertoAG={setMenuAbertoAG}
        />
      </div>
    </AsideContainer>
  );
};
