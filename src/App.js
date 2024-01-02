
import React, { useState } from 'react';
import Note from './component/Note';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([
    { id: 1, text: 'Note 1', x: 50, y: 50, isPinned: false },
    { id: 2, text: 'Note 2', x: 150, y: 150, isPinned: false },
  ]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id.toString());
  };

  const handleDrag = (e, id) => {
    const newX = e.clientX - 50; 
    const newY = e.clientY - 50; 
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, x: newX, y: newY } : note
      )
    );
  };

  const handleDragEnd = (id) => {
    
  };

  const handleAddNote = () => {
    const newNote = {
      id: notes.length + 1,
      text: 'New Note',
      x: 0,
      y: 0,
      isPinned: false,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleEditNote = (id, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  const handlePinNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  return (
    <div className="appContainer">
      <button className="addBtn" onClick={handleAddNote}>
        +
      </button>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onDelete={handleDeleteNote}
          onEdit={handleEditNote}
          onPin={handlePinNote}
        />
      ))}
    </div>
  );
};

export default App;
