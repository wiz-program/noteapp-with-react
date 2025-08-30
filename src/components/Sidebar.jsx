import React from 'react'
import './Sidebar.css'

export default function Sidebar({ onAddNote, notes, onDeleteNote, activeNote, setActiveNote }) {

  const sortedNotes = notes ? notes.sort((a, b) => b.modDate - a.modDate) : [];
  
  return (
    <div className='app-sidebar'>
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add Note</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map((note)=> {
          if (!note || !note.id) return null;
          return (
            <div className={`app-sidebar-note ${note.id === activeNote && 'active'}`} key={note.id} onClick={() => setActiveNote(note.id)}>
              <div className="app-sidebar-note-title">
                <strong>{note.title || 'Untitled'}</strong>
                <button onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }}>Delete</button>
              </div>
              <p>{note.content || ''}</p>
              <small>{note.modDate ? new Date(note.modDate).toLocaleDateString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit',
              }) : ''}</small>
            </div>
          )
        })}
        
        
      </div>
    </div>
  )
}
