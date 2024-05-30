import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../styles/multi.scss";

const initialItems1 = [
  { id: "item-1", content: "Item 1" },
  { id: "item-2", content: "Item 2" },
];

const initialItems2 = [
  { id: "item-3", content: "Item 3" },
  { id: "item-4", content: "Item 4" },
];

const Multi = () => {
  const [items1, setItems1] = useState(initialItems1);
  const [items2, setItems2] = useState(initialItems2);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // 드래그가 Droppable 영역 외부에서 끝난 경우
    if (!destination) {
      return;
    }

    // 동일한 Droppable 내에서의 이동
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "droppable1") {
        const newItems = Array.from(items1);
        const [movedItem] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, movedItem);
        setItems1(newItems);
      } else {
        const newItems = Array.from(items2);
        const [movedItem] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, movedItem);
        setItems2(newItems);
      }
    }
    // 다른 Droppable로의 이동
    else {
      if (
        source.droppableId === "droppable1" &&
        destination.droppableId === "droppable2"
      ) {
        const sourceItems = Array.from(items1);
        const destItems = Array.from(items2);
        const [movedItem] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, movedItem);
        setItems1(sourceItems);
        setItems2(destItems);
      } else if (
        source.droppableId === "droppable2" &&
        destination.droppableId === "droppable1"
      ) {
        const sourceItems = Array.from(items2);
        const destItems = Array.from(items1);
        const [movedItem] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, movedItem);
        setItems2(sourceItems);
        setItems1(destItems);
      }
    }
  };

  return (
    <div className="Multi">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="droppable-container">
          <Droppable droppableId="droppable1">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="droppable"
              >
                {items1.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable ${
                          snapshot.isDragging ? "is-dragging" : ""
                        }`}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="droppable2">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="droppable"
              >
                {items2.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable ${
                          snapshot.isDragging ? "is-dragging" : ""
                        }`}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Multi;