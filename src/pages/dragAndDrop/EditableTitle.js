import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';


// npm install react-icons
const EditableTitle = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('My Title');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="editable-title">
       {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
        />
      ) : (
        <h2
          onClick={handleTitleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={isHovered ? 'hovered' : ''}
        >
          {title}{' '}
          {isHovered && (
            <span className="edit-icon">
              <FaEdit />
            </span>
          )}
        </h2>
      )}
    </div>
  );
};

export default EditableTitle;