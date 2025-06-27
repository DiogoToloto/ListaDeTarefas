import { useEffect, useState } from "react";
import { BarraDeListas } from "./components/BarraDeListas/BarraDeListas";
import { TarefasList } from "./components/TarefasList/TarefasList";
import styled from "styled-components";
import { BarraDeFiltro } from "./components/BarraDeFiltro/BarraDeFiltro";
import { Fundo } from "./components/Fundo/Fundo";

const ContainerApp = styled.div`
  position: relative;
  display: flex;
  height: 100%;

  @media (max-width: 1175px) {
    flex-direction: column;
  }
`;

function App() {
  const [listas, setListas] = useState([]);
  const [listaSelecionada, setListaSelecionada] = useState(null);
  const [date, setDate] = useState(new Date());
  const [tarefasFiltradas, setTarefasFiltradas] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);
  const [menuAbertoAG, setMenuAbertoAG] = useState(false);

  useEffect(() => {
    const handleRiseze = () => {
      if (window.innerWidth > 1175 && menuAberto) {
        setMenuAberto(false);
      }

      if (window.innerWidth > 1175 && menuAbertoAG) {
        setMenuAbertoAG(false);
      }
    };

    window.addEventListener("resize", handleRiseze);

    handleRiseze();

    return () => window.removeEventListener("resize", handleRiseze);
  }, [menuAberto, menuAbertoAG]);

  useEffect(() => {
    if (menuAbertoAG || menuAberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  
    // Cleanup (caso o componente desmonte com o menu aberto)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuAbertoAG, menuAberto]);

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
    const tarefasDoDia = agendamentos.filter(
      (tarefa) => tarefa.dataAgendamento === dataFormatada
    );

    setTarefasFiltradas(tarefasDoDia);
  };

  return (
    <ContainerApp>
      <Fundo menuAberto={menuAberto} menuAbertoAG={menuAbertoAG} />
      <BarraDeListas
        listas={listas}
        setListas={setListas}
        exibirListaSelecionada={exibirListaSelecionada}
        deletarLista={deletarLista}
        handleChange={handleChange}
        listaSelecionada={listaSelecionada}
        menuAberto={menuAberto}
        menuAbertoAG={menuAbertoAG}
        setMenuAberto={setMenuAberto}
        setMenuAbertoAG={setMenuAbertoAG}
        handleDateChange={handleDateChange}
        date={date}
        tarefasFiltradas={tarefasFiltradas}
      />
      
      <TarefasList
        listas={listas}
        listaSelecionada={listaSelecionada}
        setListas={setListas}
        setAgendamentos={setAgendamentos}
        agendamentos={agendamentos}
        menuAberto={menuAberto}
        menuAbertoAG={menuAbertoAG}
      />

      <BarraDeFiltro
        handleDateChange={handleDateChange}
        date={date}
        tarefasFiltradas={tarefasFiltradas}
        listas={listas}
      />
    </ContainerApp>
  );
}

export default App;
