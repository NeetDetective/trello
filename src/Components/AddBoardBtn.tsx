import styled from "styled-components";
import { toDoState } from "../store";

const AddBoardButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  background-color: ${(props) => props.theme.bgColor};
  border: none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.5s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  svg {
    width: 50px;
    height: 50px;
    fill: white;
  }
`;

function AddBoardBtn() {
  const { toDos, addBoard } = toDoState();
  const handleAddBoard = () => {
    const newBoardId = prompt("새 보드의 이름을 입력하세요");
    if (!newBoardId) return;
    if (newBoardId && !toDos[newBoardId]) {
      addBoard(newBoardId);
    } else if (toDos[newBoardId]) {
      alert("Board with this name already exists!");
    }
  };
  return (
    <AddBoardButton onClick={handleAddBoard}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
      </svg>
    </AddBoardButton>
  );
}

export default AddBoardBtn;
