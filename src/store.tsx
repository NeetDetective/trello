import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IToDoItem {
  id: number;
  text: string;
}

export interface IToDo {
  [key: string]: IToDoItem[];
}

interface IToDoState {
  toDos: IToDo;
  addToDo: (boardId: string, text: string) => void;
  addBoard: (boardId: string) => void;
  deleteBoard: (boardId: string) => void;
  moveSameBoard: (
    droppableId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
  moveBetweenBoards: (
    sourceDroppableId: string,
    sourceIndex: number,
    destinationDroppableId: string,
    destinationIndex: number
  ) => void;
  deleteToDo: (boardId: string, index: number) => void;
  setBoard: (sourceIndex: number, destinationIndex: number) => void;
}

export const toDoState = create(
  persist<IToDoState>(
    (set) => ({
      toDos: {
        "할 일": [],
        진행중: [],
        완료: [],
      },
      addToDo: (boardId, text) => {
        set((state) => {
          const newToDo: IToDoItem = { id: Date.now(), text };
          return {
            toDos: {
              ...state.toDos,
              [boardId]: [...state.toDos[boardId], newToDo],
            },
          };
        });
      },
      addBoard: (boardId) => {
        set((state) => ({
          toDos: {
            ...state.toDos,
            [boardId]: [],
          },
        }));
      },
      deleteBoard: (boardId) => {
        set((state) => {
          const newToDos = { ...state.toDos };
          delete newToDos[boardId];
          return { toDos: newToDos };
        });
      },
      moveSameBoard: (droppableId, sourceIndex, destinationIndex) => {
        set((state) => {
          const boardCopy = [...state.toDos[droppableId]];
          const [removed] = boardCopy.splice(sourceIndex, 1);
          boardCopy.splice(destinationIndex, 0, removed);
          return {
            toDos: { ...state.toDos, [droppableId]: boardCopy },
          };
        });
      },
      moveBetweenBoards: (
        sourceDroppableId,
        sourceIndex,
        destinationDroppableId,
        destinationIndex
      ) => {
        set((state) => {
          const sourceBoard = [...state.toDos[sourceDroppableId]];
          const destinationBoard = [...state.toDos[destinationDroppableId]];
          const [removed] = sourceBoard.splice(sourceIndex, 1);
          destinationBoard.splice(destinationIndex, 0, removed);
          return {
            toDos: {
              ...state.toDos,
              [sourceDroppableId]: sourceBoard,
              [destinationDroppableId]: destinationBoard,
            },
          };
        });
      },
      deleteToDo: (boardId, index) => {
        set((state) => {
          const boardCopy = [...state.toDos[boardId]];
          boardCopy.splice(index, 1); // 특정 인덱스의 아이템 삭제
          return {
            toDos: {
              ...state.toDos,
              [boardId]: boardCopy,
            },
          };
        });
      },
      setBoard: (sourceIndex, destinationIndex) => {
        set((state) => {
          const boardIds = Object.keys(state.toDos);
          const [movedBoard] = boardIds.splice(sourceIndex, 1); // 보드 이동
          boardIds.splice(destinationIndex, 0, movedBoard);

          const newToDos: IToDo = {};
          boardIds.forEach((boardId) => {
            newToDos[boardId] = state.toDos[boardId];
          });

          return { toDos: newToDos };
        });
      },
    }),
    {
      name: "toDo-storage",
    }
  )
);
