import styled from "styled-components"

const FundoBlur = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
    backdrop-filter: ${({$menuAberto}) => ($menuAberto ? "blur(5px)" : "none")};
    z-index: 99;
    pointer-events: none;
    transition: filter 1s ease-in;
`;

export const Fundo = ({children, menuAberto}) => {
    return <FundoBlur $menuAberto={menuAberto}/>
}