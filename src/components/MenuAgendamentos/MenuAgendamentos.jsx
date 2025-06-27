import styled, { keyframes } from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ImBin } from "react-icons/im";
import { TfiAgenda } from "react-icons/tfi";

const slideIn = keyframes`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 70%;
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    width: 50%;
    opacity: 1;
  }
  to {
    width: 0;
    opacity: 0;
  }
`;

const CustomCalendar = styled(Calendar)`
  background: #313131;
  border: none;

  .react-calendar__tile {
    color: #a7a7a7;
  }

  .react-calendar__tile--active {
    background: #d6c353;
    color: black;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #e22a12;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    color: #fff;
    font-size: 1rem;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #8b8b8b;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #d6c353;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none !important;
    border-bottom: none !important;
  }
`;

const SectionContainer = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 25px;
  background-color: #313131;
  height: 100vh;
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease forwards;
  padding: 20px;

  @media (max-width: 1175px) {
  }
`;

const TituloTarefas = styled.h3`
  color: aliceblue;
`;

const AgendamentosContainer = styled.div`
  width: 325px;
  height: 300px;
  overflow-y: scroll;

  ul {
    list-style: none;
    color: #fff;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #fff;
      border-radius: 5px;
      padding: 5px 10px;
      margin-bottom: 10px;

      input {
        background: transparent;
        color: #fff;
        border: none;
        padding: 5px;

        &:focus {
          outline: none;
        }
      }

      button {
        background: transparent;
        border: none;
      }
    }
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Tags = styled.button`
  padding: 5px;
  background-color: #808080;
  color: #fff;
  border: 2px solid #696969;
  border-radius: 5px;
`;

const ButtonClose = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  padding: 5px;
`;

const Agendamentos = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: transparent;
  border: none;
  padding: 10px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
`;

export const MenuAgendamentos = ({
  handleDateChange,
  tarefasFiltradas,
  date,
  menuAbertoAG,
  setMenuAbertoAG,
}) => {
  return (
    <div>
        <div className="d-flex">
            <p>Agendamento</p>
                  <Agendamentos onClick={() => setMenuAbertoAG(true)}>
            {" "}
            <TfiAgenda />
                  </Agendamentos>
        </div>

      <SectionContainer isOpen={menuAbertoAG}>
        <CustomCalendar onChange={handleDateChange} value={date} />
        <div>
          <TituloTarefas>
            Tarefas para {date.toLocaleDateString("pt-BR")}:
          </TituloTarefas>
        </div>
        <AgendamentosContainer>
          <ul>
            {tarefasFiltradas.length > 0 ? (
              tarefasFiltradas.map((tarefa) => (
                <li key={tarefa.id}>
                  <p>
                    {tarefa.texto} \ {tarefa.horaAgendamento}
                  </p>
                  <button>
                    <ImBin
                      style={{ cursor: "pointer" }}
                      color="#fff"
                      size={"15px"}
                    />
                  </button>
                </li>
              ))
            ) : (
              <p>Sem tarefas para este dia.</p>
            )}
          </ul>
        </AgendamentosContainer>
        <TagsContainer>
          <Tags>Prioridade</Tags>
          <Tags>Data</Tags>
          <Tags>Concluidas</Tags>
        </TagsContainer>
        <ButtonClose onClick={() => setMenuAbertoAG(false)}>x</ButtonClose>
      </SectionContainer>
    </div>
  );
};
