import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../App.css";
import Basic from '../../components/Basic';
import Multi from '../../components/Multi';

const DragPage = () => {

 
  return (
    <div className="DragPage">
    <h3>기본</h3>
    <Basic />

    <h3>확장</h3>
    <Multi />
  </div>
  )
}

export default DragPage;