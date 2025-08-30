import React from 'react'
import './Main.css'
import ReactMarkdown from 'react-markdown';

export default function Main({ activeNote, onUpdateNote }) {

  const onEditNote = (key, value) => {
    if (!activeNote || !activeNote.id) {
      return;
    }
    onUpdateNote({
      ...activeNote,
      id : activeNote.id,
      [key] : value,
      modDate : Date.now(),
    })
  }

  if(!activeNote) {
    return <div className='no-active-note'>No active note</div>;
  }
  return (
    <div className='app-main'>
      <div className='app-main-note-edit'>
        <input 
        id='title'
        type='text'
        placeholder='input your note title here...'
        value={activeNote.title || ''}
        onChange={(e) => onEditNote('title', e.target.value)}
        />
        <textarea
        id='content'
        placeholder='input your note here...'
        value={activeNote.content || ''}
        onChange={(e) => onEditNote('content', e.target.value)}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title || 'Untitled'}</h1>
        <div className="markdown-preview">
          <ReactMarkdown>
            {activeNote.content || ''}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
