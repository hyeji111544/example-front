import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditableTitle from './EditableTitle';

const initialItems1 = [];
  
const initialItems2 = [];
   
const initialItems3 = [];
   

const MakeDrag = () => {

    const [items1, setItems1] = useState(initialItems1);
    const [items2, setItems2] = useState(initialItems2);
    const [items3, setItems3] = useState(initialItems3);
    const [newItemName, setNewItemName] = useState('');

    const handleAddTask = () => {
        // 새 아이템의 이름이 비어 있는지 확인합니다.
        if (!newItemName.trim()) {
            alert('아이템 이름을 입력하세요.');
            return;
        }

        // 현재 상태에서 새 아이템을 추가합니다.
        const newItem = { id: `item-${items1.length + items2.length + items3.length + 1}`, content: newItemName };
        setItems1([...items1, newItem]);

        // 입력 필드 초기화
        setNewItemName('');
    };

    const handleChangeNewItemName = (event) => {
        setNewItemName(event.target.value);
    };

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
          } else if (source.droppableId === "droppable2") {
            const newItems = Array.from(items2);
            const [movedItem] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, movedItem);
            setItems2(newItems);
          } else if (source.droppableId === "droppable3") {
            const newItems = Array.from(items3);
            const [movedItem] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, movedItem);
            setItems3(newItems);
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
      source.droppableId === "droppable1" &&
      destination.droppableId === "droppable3"
    ) {
      const sourceItems = Array.from(items1);
      const destItems = Array.from(items3);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);
      setItems1(sourceItems);
      setItems3(destItems);
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
    } else if (
      source.droppableId === "droppable2" &&
      destination.droppableId === "droppable3"
    ) {
      const sourceItems = Array.from(items2);
      const destItems = Array.from(items3);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);
      setItems2(sourceItems);
      setItems3(destItems);
    } else if (
      source.droppableId === "droppable3" &&
      destination.droppableId === "droppable1"
    ) {
      const sourceItems = Array.from(items3);
      const destItems = Array.from(items1);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);
      setItems3(sourceItems);
      setItems1(destItems);
    } else if (
      source.droppableId === "droppable3" &&
      destination.droppableId === "droppable2"
    ) {
      const sourceItems = Array.from(items3);
      const destItems = Array.from(items2);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);
      setItems3(sourceItems);
      setItems2(destItems);
    }
  }
};


    return (
        <div className="container">
            <EditableTitle />

            <div className="input-group">
                <input 
                    type="text" 
                    placeholder="새로운 아이템 이름 입력" 
                    value={newItemName} 
                    onChange={handleChangeNewItemName} 
                />
                <button className="btn" onClick={handleAddTask}>할 일 추가</button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="kanban-board">
                    <Droppable droppableId="droppable1">
                        {(provided) => (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="kanban-column"
                            >
                            <h2>To Do</h2>
                            {items1.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`kanban-card draggable ${
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
                            className="kanban-column"
                            >
                            <h2>In Progress</h2>
                            {items2.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`kanban-card draggable ${
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


                    <Droppable droppableId="droppable3">
                        {(provided) => (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="kanban-column"
                            >
                            <h2>Done</h2>
                            {items3.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`kanban-card draggable ${
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
export default MakeDrag;