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
  const [date, setDate] = useState(new Date());
  const [tarefasFiltradas, setTarefasFiltradas] = useState([]);

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

  const handleDateChange = (dataSelecionada) => {
    setDate(dataSelecionada);
  
    const dia = String(dataSelecionada.getDate()).padStart(2, "0");
    const mes = String(dataSelecionada.getMonth() + 1).padStart(2, "0"); // +1 porque os meses começam do 0
    const ano = dataSelecionada.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;
  
    // Correção do flatMap e nome correto do array de tarefas
    const tarefasDoDia = listas.flatMap(lista =>
      lista.task.filter(tarefa => tarefa.dataAgendamento === dataFormatada)
    );
  
    setTarefasFiltradas(tarefasDoDia);
    console.log(tarefasDoDia)
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

      <BarraDeFiltro handleDateChange={handleDateChange} date={date} tarefasFiltradas={tarefasFiltradas} listas={listas}/>
    </ContainerApp>
  );
}

export default App;
