import { useState } from "react";
import { BarraDeListas } from "./components/BarraDeListas/BarraDeListas";
import { TarefasList } from "./components/TarefasList/TarefasList";
import styled from "styled-components";
import { BarraDeFiltro } from "./components/BarraDeFiltro/BarraDeFiltro";

const ContainerApp = styled.div`
  display: flex;
  height: 100vh;
  
  @media (max-width: 1175px) {
    flex-direction: column;
  }
`;

function App() {
  const [listas, setListas] = useState([]);
  const [listaSelecionada, setListaSelecionada] = useState(null);

  const exibirListaSelecionada = (id) => {
    setListaSelecionada(id);
  };

  const deletarLista = (id) => {
    setListas(listas.filter((lista) => lista.id !== id));
    
  };

  const handleChange = (id, novoTexto) => {
    setListas((prevLista) =>
      prevLista.map((lista) =>
        lista.id === id ? { ...lista, name: novoTexto } : lista
      )
    );
  };

  return (
    <ContainerApp>
      <BarraDeListas
        listas={listas}
        setListas={setListas}
        exibirListaSelecionada={exibirListaSelecionada}
        deletarLista={deletarLista}
        handleChange={handleChange}
        listaSelecionada={listaSelecionada}
      />

      <TarefasList
        listas={listas}
        listaSelecionada={listaSelecionada}
        setListas={setListas}
      />

      <BarraDeFiltro/>
    </ContainerApp>
  );
}

export default App;
