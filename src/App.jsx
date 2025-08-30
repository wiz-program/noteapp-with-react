import './App.css'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import { useState, useEffect } from 'react'
import uuid from 'react-uuid'

function App() {
  const [ notes, setNotes ] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      return parsedNotes.length > 0 ? parsedNotes : [];
    }
    return [];
  });
  const [ activeNote, setActiveNote ] = useState(false);

  useEffect(() => {
    //ローカルストレージにノードを保存する
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes])

  useEffect(() => {
    if (notes.length > 0 && !activeNote) {
      setActiveNote(notes[0].id);
    } else if (notes.length === 0) {
      // ノートが存在しない場合は、最初のノートを作成
      const initialNote = {
        id: uuid(),
        title: 'Welcome to Notes',
        content: '# Welcome to Your Notes App!\n\nThis is your first note. You can:\n- Edit the title and content\n- Create new notes\n- Delete notes\n- Use Markdown formatting\n\nTry editing this note to get started!',
        modDate: Date.now(),
      };
      setNotes([initialNote]);
      setActiveNote(initialNote.id);
    }
  }, [notes, activeNote]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: '',
      content: '',
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
    
    // 削除されたノートが現在アクティブなノートだった場合
    if (activeNote === id) {
      if (filterNotes.length > 0) {
        setActiveNote(filterNotes[0].id);
      } else {
        setActiveNote(false);
      }
    }
  }

  const getActiveNote = () => {
    if (!activeNote || notes.length === 0) {
      return null;
    }
    return notes.find((note) => note.id === activeNote) || null;
  }

 const onUpdateNote = (updatedNote) => {
  if (!updatedNote || !updatedNote.id) {
    return;
  }
  //修正された新しいノード配列を返す。
  const updatedNotesArray = notes.map((note) => {
    if(note.id === updatedNote.id) {
      return updatedNote;
    } else {
      return note;
    }
  });
  setNotes(updatedNotesArray);
  }

  return (
    <div className='app'>
      <Sidebar onAddNote={onAddNote} notes={notes} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote} />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App
