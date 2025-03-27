import styled from "styled-components";
import { CiBoxList } from "react-icons/ci";
import { MdPlaylistAdd } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";

const ContainerLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 1175px) {
    text-align: center;
    display: none; /* Esconde no mobile */
  }
`;

const MobileMenu = styled.div`
  display: none; /* Inicialmente escondido */
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background: #222;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 1175px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")}; /* Mostra quando aberto */
    flex-direction: column;
    gap: 15px;
    top: 0px;
    height: 100vh;
    width: 80%;
    z-index: 1;
    padding: 25px;
  }
`;

const MenuButton = styled.button`
  display: none;
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;

  @media (max-width: 1175px) {
    display: block; /* Exibe o botão no mobile */
    z-index: 1;
  }
`;

const ListName = styled.div`
  display: flex;
  justify-content: space-between;
  width: 190px;
  padding: 10px;
  background-color: ${({ isSelected }) =>
    isSelected ? "#d6c353" : "transparent"};
  cursor: pointer;
  border-radius: 5px;
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
  align-items: center;
  gap: 5px;
  list-style: none;
  color: aliceblue;

  @media (max-width: 1175px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Botao = styled.button`
  border-radius: 50%;
  padding: 2px 5px;
  background: transparent;
  border: none;
  color: ${({ isSelected }) => (isSelected ? "#000" : "#fff")};
  font-weight: bolder;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const BotaoNovaLista = styled.div`
  color: #9c9c9c;
  cursor: pointer;
`;

const CloseButtom = styled.div`
  position: absolute;
  right: 25px;

  button {
    border-radius: 50%;
    height: 24px;
    width: 24px;
    border: none;
  }
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
    <>
      {/* Botão de Menu no Mobile */}
      <MenuButton onClick={() => setMenuAberto(true)}><CiBoxList /></MenuButton>

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
        <div>
          <BotaoNovaLista onClick={criarNovaLista}><MdPlaylistAdd /> Nova Lista</BotaoNovaLista>
        </div>
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
    </>
  );
};
