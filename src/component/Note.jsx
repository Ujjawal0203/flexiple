import React, { useState } from 'react';
import './Note.css';

const Note = ({ note, onDragStart, onDrag, onDragEnd, onDelete, onEdit, onPin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(note.id, editedText);
    setIsEditing(false);
  };

  return (
    <div
      className={`note ${note.isPinned ? 'pinned' : ''}`}
      style={{
        left: note.x,
        top: note.y,
        userSelect: isEditing ? 'auto' : 'none',
      }}
      draggable={!note.isPinned}
      onDragStart={(e) => onDragStart(e, note.id)}
      onDrag={(e) => onDrag(e, note.id)}
      onDragEnd={() => onDragEnd(note.id)}
    >
      {isEditing ? (
        <>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            autoFocus
            onFocus={(e) => e.target.select()}
          />
          <button onClick={handleSaveEdit}>Save</button>
        </>
      ) : (
        <>
          <span onClick={handleEdit}>{note.text}</span>
          <button onClick={() => onDelete(note.id)}>x</button>
          <button onClick={() => onPin(note.id)}>Pin</button>
        </>
      )}
    </div>
  );
};

export default Note;
