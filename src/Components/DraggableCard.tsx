import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import styled from "styled-components";

const Card = styled.div<{ $isDragging: boolean }>`
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 10px 15px;
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  background-color: ${(props) => props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  &:hover {
    outline: 2px solid #74b9ff;
  }
`;

interface IProps {
  id: number;
  text: string;
  index: number;
}

function DraggableCard({ id, text, index }: IProps) {
  return (
    <Draggable draggableId={id + ""} index={index}>
      {(provide, snapshot) => (
        <Card
          ref={provide.innerRef}
          {...provide.draggableProps}
          {...provide.dragHandleProps}
          $isDragging={snapshot.isDragging}
        >
          {text}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
