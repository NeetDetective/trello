import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import styled from "styled-components";
import { toDoState } from "./store";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const Trash = styled.div<{ $isDraggingOver: boolean }>`
  background-color: ${(props) =>
    props.$isDraggingOver ? "rgba(0,0,0,0.5)" : props.theme.bgColor};
  position: fixed;
  bottom: 40px;
  right: 40px;
  padding: 10px;
  border-radius: 15px;
  transition: background-color 0.5s ease-in-out;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  svg {
    width: 50px;
    height: 50px;
    fill: white;
  }
`;

const Boards = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  padding: 10px;
`;

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

function App() {
  const {
    toDos,
    moveSameBoard,
    moveBetweenBoards,
    deleteToDo,
    addBoard,
    setBoard,
  } = toDoState();
  const onDragEnd = ({ destination, source, type }: DropResult) => {
    if (!destination) return;
    if (type === "BOARD") {
      setBoard(source.index, destination.index);
      return;
    }
    if (destination.droppableId === source.droppableId) {
      moveSameBoard(source.droppableId, source.index, destination.index);
    }
    if (destination.droppableId !== source.droppableId) {
      if (destination.droppableId === "trash") {
        deleteToDo(source.droppableId, source.index);
      } else {
        moveBetweenBoards(
          source.droppableId,
          source.index,
          destination.droppableId,
          destination.index
        );
      }
    }
  };

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
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <AddBoardButton onClick={handleAddBoard}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
        </AddBoardButton>
        <Droppable droppableId="boards" direction="horizontal" type="BOARD">
          {(provided) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {Object.keys(toDos).map((boardId, index) => (
                <Draggable draggableId={boardId} index={index} key={boardId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Board boardId={boardId} toDos={toDos[boardId]} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
        <Droppable droppableId="trash">
          {(provided, snapshot) => (
            <Trash
              $isDraggingOver={snapshot.isDraggingOver}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                {provided.placeholder}
              </svg>
            </Trash>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
