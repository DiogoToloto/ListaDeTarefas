import { useState } from "react";
import styled from "styled-components";

const AsideContainer = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #313131;
  width: 250px;
  height: 100vh;
  padding: 15px;
  color: aliceblue;

  @media (max-width: 1175px) {
    align-items: center;
    height: auto;
    width: 100%;
    position: relative;
  }
`;

const ContainerLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListName = styled.div`
  display: flex;
  justify-content: space-between;
  width: 190px;
  padding: 10px;
  background-color: ${({ isSelected }) =>
    isSelected ? "#d6c353" : "transparent"};
  cursor: pointer;
  border-radius: 5px;

  input {
    width: 100px;
    background: transparent;
    border: none;
    color: ${({ isSelected }) => (isSelected ? "#000000" : "#fff")};
    font-size: 1.1rem;

    &:focus{
      outline: none;
    }
  }
`;

const ListsContainerUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  list-style: none;
  color: aliceblue;

  @media (max-width: 1175px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Botao = styled.button`
  border-radius: 50%;
  padding: 2px 5px;
  background: transparent;
  border: none;
  color: ${({ isSelected }) => (isSelected ? "#000000" : "#fff")};
  font-weight: bolder;
  cursor: pointer;

  &:hover{
    background-color: #fff;
    color: #000;
  }
`;

const BotaoNovaLista = styled.div`
  
  color: #9c9c9c;
  cursor: pointer;
`

export const BarraDeListas = ({
  listas,
  exibirListaSelecionada,
  deletarLista,
  handleChange,
  listaSelecionada,
  setListas
}) => {

  const [lista, setLista] = useState("");

  const criarNovaLista = () => {

    const novaLista = { id: Date.now(), name: lista, task: [] };
    setListas([...listas, novaLista]);
    exibirListaSelecionada(novaLista.id)
  };

  

  return (
    <AsideContainer>
      <div>
        <h2 style={{ fontSize: "2rem" }}>Todo List</h2>
      </div>
      <ContainerLista>
        <h3>Minhas listas</h3>
        <ListsContainerUl>
          {listas.map((lista) => (
            <ListName
              key={lista.id}
              isSelected={listaSelecionada === lista.id}
              onClick={() => exibirListaSelecionada(lista.id)}
            >
              <input
                type="text"
                value={lista.name}
                onChange={(e) => {
                  handleChange(lista.id, e.target.value);
                }}
                onBlur={(e) => {
                  if (!e.target.value.trim()) {
                    e.target.value = "Nova Lista"; // Define um valor padrão se for deixado vazio
                    handleChange(lista.id, "Nova Lista");
                    e.target.focus();
                  }
                }}
                autoFocus={listaSelecionada === lista.id}
              />
              <Botao isSelected={listaSelecionada === lista.id} onClick={() => deletarLista(lista.id)}>X</Botao>
            </ListName>
          ))}
        </ListsContainerUl>
      </ContainerLista>
      <div>
        <BotaoNovaLista onClick={criarNovaLista}>+ Nova Lista</BotaoNovaLista>
      </div>
    </AsideContainer>
  );
};
