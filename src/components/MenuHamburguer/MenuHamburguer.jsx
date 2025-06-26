import styled, { keyframes } from "styled-components";
import { CiBoxList } from "react-icons/ci";
import { MdPlaylistAdd } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";

const CorpoLista = styled.main`
  
`;

const ContainerLista = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  gap: 10px;
  

  @media (max-width: 1175px) {
    text-align: center;
    display: none; /* Esconde no mobile */
  }
`;

const slideIn = keyframes`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 50%;
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

const MobileMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  background: #222;
  padding: ${({isOpen}) =>  isOpen ? "24px" : ""};
  z-index: 100;
  overflow: hidden;
  flex-direction: column;
  gap: 15px;
  display: flex;
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease forwards;
  width: ${({ isOpen }) => (isOpen ? '50%' : '0')};

`;

const MenuButton = styled.button`
  display: none;
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;

  p {
    font-size: 1.3rem;
  }

  @media (max-width: 1175px) {
    display: flex; /* Exibe o botão no mobile */
    gap: 5px;
    align-items: center;
    z-index: 1;
  }
`;

const ListName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  padding: 10px;
  background-color: ${({ isSelected }) =>
    isSelected ? "#d6c353" : "transparent"};
  cursor: pointer;
  border: 1px solid ${({isSelected}) => isSelected ? "#d6c353" : "#ccc"};
  border-radius: 18px;
  color: ${({ isSelected }) => (isSelected ? "#000" : "#fff")};
  

  input {
    width: 100px;
    background: transparent;
    border: none;
    color: ${({ isSelected }) => (isSelected ? "#000" : "#fff")};
    font-size: 1.1rem;

    &:focus {
      outline: none;
    }
  }
`;

const ListsContainerUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 400px;
  overflow-y: scroll;

  /* Estilização do scroll para navegadores WebKit (Chrome, Edge, Safari) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }
`;


const BotaoNovaLista = styled.button`
  width: 120px;
  padding: 5px;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 18px;
  cursor: pointer;
  background: transparent;
  font-size: 1rem;
  transition: .3s ease-in;

  &:hover {
    background-color: #424242;
    
  }
`;

const CloseButtom = styled.button`
  position: absolute;
  right: 25px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: aliceblue;

`;

export const MenuHamburguer = ({
  listas,
  criarNovaLista,
  deletarLista,
  listaSelecionada,
  handleChange,
  exibirListaSelecionada,
  editingId,
  setEditingId,
  menuAberto,
  setMenuAberto
}) => {
  
  

  const handleDoubleClick = (id) => {
    setEditingId(id); // Ativa o modo de edição para a lista clicada
  };

  const handleBlur = (id, name) => {
    if (!name.trim()) {
      handleChange(id, "Nova Lista"); // Define um valor padrão se o nome for vazio
    }
    setEditingId(null); // Desativa o modo de edição
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      setEditingId(null); // Desativa o modo de edição ao pressionar Enter
    }
  };

  return (
    <CorpoLista>
      {/* Botão de Menu no Mobile */}
      <MenuButton onClick={() => setMenuAberto(true)}><CiBoxList /><p>Minhas Listas</p></MenuButton>

      {/* Lista para Desktop */}
      <ContainerLista>

        <h3>Minhas listas</h3>

        <ListsContainerUl>
          {listas.map((lista) => (
            <ListName
              key={lista.id}
              isSelected={listaSelecionada === lista.id}
              onClick={() => exibirListaSelecionada(lista.id)}
              onDoubleClick={() => handleDoubleClick(lista.id)} // Ativa o modo de edição ao clicar 2 vezes
            >
              {editingId === lista.id ? (
                <input
                  type="text"
                  value={lista.name}
                  onChange={(e) => handleChange(lista.id, e.target.value)}
                  onBlur={() => handleBlur(lista.id, lista.name)}
                  onKeyDown={(e) => handleKeyPress(e, lista.id)} // Permite desativar ao pressionar Enter
                  autoFocus
                />
              ) : (
                <span>{lista.name}</span> // Exibe o nome da lista normalmente quando não está em edição
              )}
              <IoCloseCircleOutline size={"24px"} isSelected={listaSelecionada === lista.id}
                onClick={() => deletarLista(lista.id)} />
                  
            </ListName>
          ))}
        </ListsContainerUl>
        
          <BotaoNovaLista onClick={criarNovaLista}><MdPlaylistAdd /> Nova Lista</BotaoNovaLista>
        

      </ContainerLista>

      {/* Lista dentro do menu hambúrguer no Mobile */}
      <MobileMenu isOpen={menuAberto}>
        <h3>Minhas listas</h3>
        <ListsContainerUl>
          {listas.map((lista) => (
            <ListName
              key={lista.id}
              isSelected={listaSelecionada === lista.id}
              onClick={() => exibirListaSelecionada(lista.id)}
              onDoubleClick={() => handleDoubleClick(lista.id)} // Ativa o modo de edição ao clicar 2 vezes
            >
              {editingId === lista.id ? (
                <input
                  type="text"
                  value={lista.name}
                  onChange={(e) => handleChange(lista.id, e.target.value)}
                  onBlur={() => handleBlur(lista.id, lista.name)}
                  onKeyDown={(e) => handleKeyPress(e, lista.id)} // Permite desativar ao pressionar Enter
                  autoFocus={listaSelecionada === lista.id}
                />
              ) : (
                <span>{lista.name}</span> // Exibe o nome da lista normalmente quando não está em edição
              )}
              
              <IoCloseCircleOutline size={"24px"} isSelected={listaSelecionada === lista.id}
                onClick={() => deletarLista(lista.id)} />
            </ListName>
          ))}
        </ListsContainerUl>
        <div>
          <BotaoNovaLista onClick={criarNovaLista}><MdPlaylistAdd /> Nova Lista</BotaoNovaLista>
        </div>
        <CloseButtom>
        <IoCloseCircleOutline size={"24px"} onClick={() => setMenuAberto(false)}/>
        </CloseButtom>
      </MobileMenu>
    </CorpoLista>
  );
};
