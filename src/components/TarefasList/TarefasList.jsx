import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ImBin } from "react-icons/im";
import { MdKeyboardArrowUp } from "react-icons/md";

const abrir = keyframes`
  from {
    height: 30px;
  }
  to {
    height: 200px;
  }
`;

const ContainerSection = styled.section`
  display: flex;
  flex-direction: column;
  width: auto;
  background-color: #1d1d1d;
  color: aliceblue;
  gap: 24px;
  padding: 50px;
  margin: 0px 500px 0px 250px;
  overflow-y: scroll;

  @media (max-width: 1175px) {
    margin: auto;
   
    height: 100vh;
    padding: 35px;
  }
`;

const ContainerTarefas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContainerTitulo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ContainerData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.3rem;
`;

const Saudacao = styled.h2`
  font-size: 3.5rem;

  @media (max-width: 1175px) {
    font-size: 2.7rem;
  }
`;

const SubTitulo = styled.h4`
  font-size: 2rem;
  color: #a0a0a0;

  @media (max-width: 1175px) {
    font-size: 1.5rem;
  }
`

const FormTarefa = styled.form`
  width: 100%;
  background-color: #4e4e4e;
  padding: 25px;
  border-radius: 10px;
`;

const DadosContainer = styled.div`
  position: relative;
  display: ${({ campoSelecionado }) => (campoSelecionado ? "flex" : "none")};
  transition: display 5s ease-in-out;
  flex-direction: column;
  gap: 40px;
  padding-top: 40px;
  animation: ${({ campoSelecionado }) => (campoSelecionado ? abrir : "")};
  animation-duration: 0.5s;
  z-index: 0;
`;

const InputAddTarefa = styled.input`
  background: transparent;
  border: none;
  font-size: 1rem;
  color: #ffffff;

  &:focus {
    outline: none;
  }
`;

const ContainerNovaTarefa = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
`;

const NovaTarefa = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  background-color: #4e4e4e;
  padding: 15px 15px;
  border-radius: 10px;
`;

const Botao = styled.button`
  padding: 5px 10px;
  background-color: #d6c353;
  border: 2px solid #d6c353;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #cfc483;
  }
`;

const DivAlteravel = styled.div`
  
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: ${({desabilitado}) => (desabilitado ? "none" : "auto")};
  opacity: ${({desabilitado}) => (desabilitado ? "0.5" : "1")};

  p{
    text-decoration: ${({desabilitado}) => (desabilitado ? "line-through" : "")};
  }
`;

export const TarefasList = ({ listas, listaSelecionada, setListas }) => {
  const [texto, setTexto] = useState("");
  const [dataTarefa, setDataTarefa] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [campoSelecionado, setCampoSelecionado] = useState(null);
  const [data, setData] = useState("");
  const [mes, setMes] = useState("");
  const [tarefasDesabilitadas, setTarefasDesabilitadas] = useState({});

  const criarNovaTarefa = (id) => {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, "0");
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0"); // +1 porque os meses começam do 0
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    if (texto.trim() === "") return;

    let novaTarefa = {
      id: Date.now(),
      texto: texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase(),
      dataCriacao: dataFormatada,
      dataAgendamento: dataTarefa,
      prioridade: prioridade,
    };
    setListas((prevLista) =>
      prevLista.map((lista) =>
        lista.id === id
          ? { ...lista, task: [...lista.task, novaTarefa] }
          : lista
      )
    );
    setTexto("");
  };

  const deletarTarefa = (idLista, idTarefa) => {
    setListas((prevListas) =>
      prevListas.map((lista) =>
        lista.id === idLista
          ? {
              ...lista,
              task: lista.task.filter((tarefa) => tarefa.id !== idTarefa),
            }
          : lista
      )
    );
  };

  useEffect(() => {
    const meses = [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];

    const data = new Date();
    const mesNome = meses[data.getMonth()];
    const hour = new Date().getHours();
    const date = new Date().getDate();

    if (hour < 12) setMensagem("Bom dia!");
    else if (hour < 18) setMensagem("Boa tarde!");
    else setMensagem("Boa noite!");

    setData(date);
    setMes(mesNome);
  }, []);

  const toggleTarefa = (idTarefa) => {
    setTarefasDesabilitadas((prevState) => ({
      ...prevState,
      [idTarefa]: !prevState[idTarefa],
    }));
  };

  return (
    <ContainerSection>
      <ContainerTitulo>
        <ContainerData>
          <p>{mes}</p>
          <p>{data}</p>
        </ContainerData>
        <div>
          <Saudacao>{mensagem}</Saudacao>
          <SubTitulo>Quais são seus planos para hoje?</SubTitulo>
        </div>
      </ContainerTitulo>
      {listaSelecionada === null ? (
        <p>Selecione uma lista</p>
      ) : (
        listas.map(
          (lista) =>
            listaSelecionada === lista.id && (
              <ContainerTarefas>
                <FormTarefa
                  campoSelecionado={campoSelecionado}
                  onClick={() => setCampoSelecionado(true)}
                >
                  <InputAddTarefa
                    type="text"
                    placeholder="Adicionar nova tarefa"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    required
                  />
                  <DadosContainer campoSelecionado={campoSelecionado}>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <label htmlFor="">Data:</label>
                      <input
                        onChange={(e) => {
                          const dataISO = e.target.value; // Pega a data no formato YYYY-MM-DD
                          const [ano, mes, dia] = dataISO.split("-"); // Divide a string
                          const dataFormatada = `${dia}/${mes}/${ano}`; // Reorganiza no formato desejado
                          setDataTarefa(dataFormatada); // Armazena a data formatada
                        }}
                        type="date"
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#fff",
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "20px" }}>
                      <h4>Prioridade</h4>
                      <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                          <label htmlFor="">Baixa </label>
                          <input type="radio" name="prioridade" id="" />
                        </div>
                        <div>
                          <label htmlFor="">Media </label>
                          <input type="radio" name="prioridade" id="" />
                        </div>
                        <div>
                          <label htmlFor="">Alta </label>
                          <input type="radio" name="prioridade" id="" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Botao
                        type="submit"
                        onClick={(e) => {
                          e.stopPropagation();
                          criarNovaTarefa(lista.id);
                          setCampoSelecionado(texto.trim() === "");
                        }}
                      >
                        Criar
                      </Botao>
                    </div>
                    <MdKeyboardArrowUp
                      size={"24px"}
                      color="#fff"
                      style={{
                        position: "absolute",
                        top: "-25px",
                        right: "0px",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCampoSelecionado(false);
                      }}
                    />
                  </DadosContainer>
                </FormTarefa>

                <ContainerNovaTarefa key={Date.now()}>
                  {lista.task.map((tarefa) => (
                    <NovaTarefa key={tarefa.id}>
                      <div>
                        <input type="checkbox" checked={tarefasDesabilitadas[tarefa.id] || false} onChange={() => toggleTarefa(tarefa.id)}  style={{width: "20px", height: "20px", borderRadius: "50%"}}/>
                      </div>
                      <DivAlteravel desabilitado={tarefasDesabilitadas[tarefa.id]}>
                        <p style={{fontSize: "1.3rem"}}>{tarefa.texto}</p>
                        <p style={{ fontSize: "0.8rem" }}>
                          {tarefa.dataCriacao}
                        </p>
                      </DivAlteravel>
                      <div>
                        <ImBin
                          style={{cursor: "pointer"}}
                          onClick={() => deletarTarefa(lista.id, tarefa.id)}
                        />
                      </div>
                    </NovaTarefa>
                  ))}
                </ContainerNovaTarefa>
              </ContainerTarefas>
            )
        )
      )}
    </ContainerSection>
  );
};
