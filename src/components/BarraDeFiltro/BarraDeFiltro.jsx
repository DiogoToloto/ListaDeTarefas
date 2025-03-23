import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

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
  position: fixed;
  right: 0;
  background-color: #313131;
  width: 500px;
  height: 100vh;
  padding: 20PX;

  @media (max-width: 1175px) {
    align-items: center;
    height: 500px;
    bottom: 0;
    width: 100%;
    position: relative;
  }
`;

export const BarraDeFiltro = () => {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  return (
    <SectionContainer>
      <CustomCalendar onChange={setDataSelecionada} value={dataSelecionada} />
      
    </SectionContainer>
  );
};
