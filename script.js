const noteForm = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

async function loadNotes() {
  try {
    const response = await fetch('/notes');
    const notes = await response.json();
    notesList.innerHTML = '';
    notes.forEach(note => {
      const li = document.createElement('li');
      li.textContent = note.content;
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => deleteNote(note.id);
      li.appendChild(deleteBtn);
      notesList.appendChild(li);
    });
  } catch (error) {
    console.error('Error loading notes:', error);
  }
}

async function addNote(content) {
  try {
    const response = await fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    });
    if (response.ok) {
      noteInput.value = '';
      loadNotes();
    }
  } catch (error) {
    console.error('Error adding note:', error);
  }
}

async function deleteNote(id) {
  try {
    const response = await fetch(`/notes/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      loadNotes();
    }
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const content = noteInput.value.trim();
  if (content) {
    addNote(content);
  }
});

loadNotes();
