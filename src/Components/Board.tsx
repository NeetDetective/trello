import { Droppable } from "@hello-pangea/dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IToDoItem, toDoState } from "../store";
import { useState } from "react";

interface IForm {
  toDo: string;
}

interface IProps {
  toDos: IToDoItem[];
  boardId: string;
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 250px;
  &:hover {
    outline: 2px solid #74b9ff;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  svg {
    cursor: pointer;
    fill: ${(props) => props.theme.textColor};
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.textColor};
`;

const Area = styled.div`
  background-color: transparent;
  flex-grow: 1;
  border-radius: 5px;
  transition: background-color 0.5s ease-in-out;
  padding: 0 20px;
`;

const Form = styled.form`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 10px;
  input {
    color: ${(props) => props.theme.textColor};
    width: 100%;
    padding: 10px 15px;
    border-radius: 15px;
    border: none;
    background-color: ${(props) => props.theme.cardColor};
    font-size: 16px;
    outline: none;
    margin-bottom: 10px;
  }
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    span,
    button {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      cursor: pointer;
      color: ${(props) => props.theme.textColor};
      background-color: ${(props) => props.theme.cardColor};
      padding: 5px 0;
      border: none;
      svg {
        width: 20px;
        height: 20px;
        fill: ${(props) => props.theme.textColor};
      }
    }
  }
`;

const Btn = styled.p`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  background-color: rgb(34, 39, 43);
  margin: 0 20px;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 10px;
  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.textColor};
    margin-right: 5px;
  }
  span {
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  }
`;

function Board({ toDos, boardId }: IProps) {
  const [addBtn, setAddBtn] = useState(true);
  const { register, handleSubmit, reset } = useForm<IForm>();
  const { addToDo, deleteBoard } = toDoState();
  const onSubmit = ({ toDo }: IForm) => {
    addToDo(boardId, toDo);
    setAddBtn(true);
    reset();
  };
  const onClick = () => {
    setAddBtn((prev) => !prev);
  };
  const handleDeleteBoard = () => {
    deleteBoard(boardId);
  };
  return (
    <Wrapper>
      <Header>
        <Title>{boardId}</Title>
        <svg
          onClick={handleDeleteBoard}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </Header>
      <Droppable droppableId={boardId}>
        {(provide) => (
          <Area ref={provide.innerRef} {...provide.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                id={toDo.id}
                text={toDo.text}
                index={index}
              />
            ))}
            {provide.placeholder}
          </Area>
        )}
      </Droppable>
      {!addBtn ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("toDo", { required: true })}
            placeholder={"Add a task..."}
          />
          <div>
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
              </svg>
            </button>
            <span onClick={onClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </span>
          </div>
        </Form>
      ) : (
        <Btn onClick={onClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
          <span>작업 추가</span>
        </Btn>
      )}
    </Wrapper>
  );
}

export default Board;
