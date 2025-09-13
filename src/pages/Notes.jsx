import "../styles/Notes.css";
import React, { useState } from "react";

const NotesApp = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Welcome to Notes",
      content:
        "This is your first note! You can edit, pin, archive, and even add checklists.",
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: true,
      isArchived: false,
    },
    {
      id: 2,
      title: "Shopping List",
      content: "🛒 Milk, Bread, Eggs, Coffee",
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
      isArchived: false,
    },
    {
      id: 3,
      title: "Ideas for Projects",
      content: "💡 Build a notes app, Create a personal blog, Learn React Native",
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
      isArchived: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [showArchived, setShowArchived] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // -------- CRUD logic --------
  const addNote = () => {
    if (!newNote.title.trim() && !newNote.content.trim()) return;

    const note = {
      id: Date.now(),
      title: newNote.title || "Untitled Note",
      content: newNote.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
      isArchived: false,
    };

    setNotes([note, ...notes]);
    setNewNote({ title: "", content: "" });
    setShowNewNote(false);
  };

  const updateNote = () => {
    setNotes(
      notes.map((note) =>
        note.id === editingNote.id
          ? { ...note, ...editingNote, updatedAt: new Date() }
          : note
      )
    );
    setEditingNote(null);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleArchive = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isArchived: !note.isArchived } : note
      )
    );
  };

  const togglePin = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  // -------- Filtering --------
  const filteredNotes = notes
    .filter((note) => (showArchived ? note.isArchived : !note.isArchived))
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.isPinned - a.isPinned); // pinned notes first

  return (
    <div className="notes-app">
      {/* Header */}
      <header className="notes-header">
        <h1 className="notes-title">Notes</h1>

        <div className="header-controls">
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <button
            onClick={() => setShowNewNote(true)}
            className="btn btn-primary"
          >
            ➕ New Note
          </button>

          <button
            onClick={() => setShowArchived(!showArchived)}
            className="btn btn-secondary"
          >
            {showArchived ? "Active" : "Archived"}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="main-content">
        {/* Create/Edit Note Form */}
        {(showNewNote || editingNote) && (
          <div className="new-note-form">
            <h2 className="form-title">
              {editingNote ? "Edit Note" : "Create New Note"}
            </h2>
            <input
              type="text"
              placeholder="Note title..."
              value={editingNote ? editingNote.title : newNote.title}
              onChange={(e) =>
                editingNote
                  ? setEditingNote({ ...editingNote, title: e.target.value })
                  : setNewNote({ ...newNote, title: e.target.value })
              }
              className="form-input"
            />
            <textarea
              placeholder="Write your note..."
              value={editingNote ? editingNote.content : newNote.content}
              onChange={(e) =>
                editingNote
                  ? setEditingNote({ ...editingNote, content: e.target.value })
                  : setNewNote({ ...newNote, content: e.target.value })
              }
              className="form-textarea"
            />
            <div className="form-actions">
              {editingNote ? (
                <>
                  <button onClick={updateNote} className="btn btn-primary">
                    Update Note
                  </button>
                  <button
                    onClick={() => setEditingNote(null)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={addNote} className="btn btn-primary">
                    Save Note
                  </button>
                  <button
                    onClick={() => setShowNewNote(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <div key={note.id} className="note-card">
              <h3>
                {note.title} {note.isPinned && "📌"}
              </h3>
              <p>{note.content}</p>

              <div className="note-actions">
                <button onClick={() => setEditingNote(note)}>Edit</button>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
                <button onClick={() => toggleArchive(note.id)}>
                  {note.isArchived ? "Unarchive" : "Archive"}
                </button>
                <button onClick={() => togglePin(note.id)}>
                  {note.isPinned ? "Unpin" : "Pin"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="empty-state">
            <p className="empty-message">
              {searchTerm
                ? "No notes match your search."
                : showArchived
                ? "No archived notes."
                : "No notes yet. Create your first note!"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NotesApp;
