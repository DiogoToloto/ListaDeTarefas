import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ImBin } from "react-icons/im";
import { MdKeyboardArrowUp } from "react-icons/md";
import { data } from "react-router-dom";

const abrir = keyframes`
  from {
    height: 70px;
    
  }
  to {
    height: 278px;
  }
`;

const fechar = keyframes`
  from {
    height: 200px;
  }
  to {
    height: 70px;
  }
`;

const ContainerSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #1d1d1d;
  color: aliceblue;
  gap: 24px;
  min-height: 100vh;
  padding: 50px;
  margin: 0px 500px 0px 250px;
  pointer-events: ${({$menuAberto, $menuAbertoAG}) => ($menuAberto || $menuAbertoAG ? "none" : "auto")};

  @media (max-width: 1175px) {
    overflow-y: initial;
    padding: 35px 10px;
    margin: 0;
    padding-top: 80px;
    min-height: 100vh;
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
`;

const FormTarefa = styled.form`
  width: 100%;
  background-color: #4e4e4e;
  padding: 25px;
  border-radius: 32px;
  animation: ${({ campoSelecionado }) => (campoSelecionado ? abrir : fechar)};
  animation-duration: 0.5s;
  box-shadow: 0px 2px 15px rgba(0,0,0, 0.5);
`;

const DadosContainer = styled.div`
  position: relative;
  display: ${({ campoSelecionado }) => (campoSelecionado ? "flex" : "none")};
  transition: display 5s ease-in-out;
  flex-direction: column;
  gap: 30px;
  padding-top: 25px;
  z-index: 0;
  
`;

const InputAddTarefa = styled.input`
  background: transparent;
  font-size: 1rem;
  color: #ffffff;
  border: none;
  width: 90%;

  &:focus {
    outline: 1px solid #fff;
    padding: 5px;
    border-radius: 5px;
  }

  &::placeholder {
    color: #fff;
  }
`;

const ContainerNovaTarefa = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
`;

const Botao = styled.button`
  padding: 5px 10px;
  background-color: #d6c353;
  border: 2px solid #d6c353;
  border-radius: 14px;
  cursor: pointer;
  color: #000;
  
`;

const DivAlteravel = styled.div`
  display: flex;
  flex-direction: column;
  word-break: break-word;
  pointer-events: ${({ desabilitado }) => (desabilitado ? "none" : "auto")};
  opacity: ${({ desabilitado }) => (desabilitado ? "0.5" : "1")};

  p {
    text-decoration: ${({ desabilitado }) =>
      desabilitado ? "line-through" : ""};
  }
`;

const NovaTarefa = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  width: 100%;
  background-color: #4e4e4e;
  padding: 15px 15px;
  border-radius: 32px;
`;

const PrioridadeContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  p {
    font-size: 0.8rem;
  }
`;

const CheckboxInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => props.bordaCor || "#d6c353"};
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: ${(props) => props.bordaCor || "#d6c353"};
  }

  &:checked::before {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    color: white;
  }
`;

const TimeInput = styled.input`
  border: 1px solid #fff;
  border-radius: 16px;
  padding: 6px;
  font-size: 16px;
  background: transparent;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  color: #fff;
  width: 80%;

  &:focus {
    background: transparent;
    outline: 1px solid #d6c353;
  }

  &::-webkit-calendar-picker-indicator {
    background-color: transparent;
    cursor: pointer;
  }
`;

const InputData = styled.input`
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 14px;
  padding: 6px;
  color: #fff;
  font-size: 1rem;
  width: 80%;

  &:focus{
    outline: 1px solid #d6c353;
  }
`

const ContainerInputs =styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 22px;
  padding: 6px;
  background-color: #797979;
`;

const ContainerInputRadio = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 22px;
  padding: 6px;
  gap: 20px;

  &:hover {
    border: 1px solid #d6c353;
  }

  label {
    cursor: pointer;
  }

  input {
    cursor: pointer;
  }
  
`;

export const TarefasList = ({
  listas,
  listaSelecionada,
  setListas,
  setAgendamentos,
  agendamentos,
  menuAberto,
  menuAbertoAG
}) => {
  const [texto, setTexto] = useState("");
  const [dataTarefa, setDataTarefa] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [campoSelecionado, setCampoSelecionado] = useState(null);
  const [data, setData] = useState("");
  const [mes, setMes] = useState("");
  const [tarefasDesabilitadas, setTarefasDesabilitadas] = useState({});
  const [hora, setHora] = useState("");

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
    setPrioridade("");
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

  const criarAgendamento = () => {
    if (texto.trim() === "") return;
    if (dataTarefa.trim() === "") return;

    let novoAgendamento = {
      id: Date.now(),
      texto: texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase(),
      dataAgendamento: dataTarefa,
      horaAgendamento: hora
    };

    setAgendamentos([...agendamentos, novoAgendamento]);
    setTexto("");
    setHora("")
    
    console.log(hora)
    
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

  const corBordaPrioridade = (prioridade) => {
    switch (prioridade) {
      case "baixa":
        return "#f1c40f"; // Amarelo
      case "media":
        return "#e67e22"; // Laranja
      case "alta":
        return "#e74c3c"; // Vermelho
      default:
        return "#a0a0a0"; // Default (amarelo)
    }
  };

  return (
      <ContainerSection $menuAberto={menuAberto} $menuAbertoAG={menuAbertoAG}>
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
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <InputAddTarefa
                      type="text"
                      placeholder="Adicionar nova tarefa"
                      value={texto}
                      onChange={(e) => setTexto(e.target.value)}
                    />
                    <DadosContainer campoSelecionado={campoSelecionado}>
                      <ContainerInputs >
                        <label htmlFor="">Data:</label>
                        <InputData
                          onChange={(e) => {
                            const dataISO = e.target.value; // Pega a data no formato YYYY-MM-DD
                            const [ano, mes, dia] = dataISO.split("-"); // Divide a string
                            const dataFormatada = `${dia}/${mes}/${ano}`; // Reorganiza no formato desejado
                            setDataTarefa(dataFormatada); // Armazena a data formatada
                          }}
                          type="date"
                          
                        />
                      </ContainerInputs>
                      <ContainerInputs >
                        <label htmlFor="">Horario: </label>
                        <TimeInput type="time" value={hora} onChange={(e) => {
                          setHora(e.target.value)
                        }}/>
                      </ContainerInputs>
                      <ContainerInputs>
                        <label htmlFor="">Prioridade:</label>
                        <div style={{ display: "flex", gap: "20px" }}>
                          <ContainerInputRadio>
                            <label htmlFor="prioridade-baixa">Baixa </label>
                            <input
                              type="radio"
                              name="prioridade"
                              id="prioridade-baixa"
                              checked={prioridade === "baixa"}
                              onChange={() => setPrioridade("baixa")}
                            />
                          </ContainerInputRadio>
                          <ContainerInputRadio>
                            <label htmlFor="prioridade-media">Média </label>
                            <input
                              type="radio"
                              name="prioridade"
                              id="prioridade-media"
                              checked={prioridade === "media"}
                              onChange={() => setPrioridade("media")}
                            />
                          </ContainerInputRadio>
                          <ContainerInputRadio>
                            <label htmlFor="prioridade-alta">Alta </label>
                            <input
                              type="radio"
                              name="prioridade"
                              id="prioridade-alta"
                              checked={prioridade === "alta"}
                              onChange={() => setPrioridade("alta")}
                            />
                          </ContainerInputRadio>
                        </div>
                      </ContainerInputs>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <Botao
                          type="submit"
                          onClick={(e) => {
                            e.stopPropagation();
                            criarNovaTarefa(lista.id);
                            setCampoSelecionado(texto.trim() === "");
                          }}
                        >
                          Criar tarefa
                        </Botao>
                        <Botao
                          onClick={(e) => {
                            e.stopPropagation();
                            criarAgendamento();
                            setCampoSelecionado(texto.trim() === "");
                          }}
                        >
                          Agendar
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
                    {lista.task
                      .sort((a, b) => (tarefasDesabilitadas[a.id] ? 1 : -1)) // Ordena: checked no final
                      .map((tarefa) => (
                        <NovaTarefa key={tarefa.id}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "15px",
                            }}
                          >
                            <div>
                              <CheckboxInput
                                type="checkbox"
                                checked={tarefasDesabilitadas[tarefa.id] || false}
                                onChange={() => toggleTarefa(tarefa.id)}
                                bordaCor={corBordaPrioridade(tarefa.prioridade)}
                              />
                            </div>
                            <DivAlteravel
                              desabilitado={tarefasDesabilitadas[tarefa.id]}
                            >
                              <p style={{ fontSize: "1.1rem" }}>{tarefa.texto}</p>
                              <p style={{ fontSize: "0.8rem" }}>
                                {tarefa.dataCriacao}
                              </p>
                            </DivAlteravel>
                          </div>
                          <PrioridadeContainer>
      
                            <ImBin
                              style={{ cursor: "pointer" }}
                              onClick={() => deletarTarefa(lista.id, tarefa.id)}
                            />
                          </PrioridadeContainer>
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
