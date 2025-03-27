import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ImBin } from "react-icons/im";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  position: fixed;
  right: 0;
  background-color: #313131;
  width: 500px;
  height: 100vh;
  padding: 20px;

  @media (max-width: 1175px) {
    align-items: center;
    bottom: 0;
    width: 100%;
    position: relative;
  }
`;

const TituloTarefas = styled.h3`
  color: aliceblue;
`;

const AgendamentosContainer = styled.div`
  width: 310px;
  border: 2px solid #8a8787;
  border-radius: 10px;
  padding: 15px;

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

        &:focus{
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

export const BarraDeFiltro = ({
  handleDateChange,
  tarefasFiltradas,
  date,
  listas,
}) => {
  return (
    <SectionContainer>
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
                <p>{tarefa.texto} \ {tarefa.horaAgendamento}</p>
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
    </SectionContainer>
  );
};
