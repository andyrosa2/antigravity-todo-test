const noteForm = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

async function loadNotes() {
  const notes = await (await fetch('/notes')).json();
  notesList.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note.content;
    notesList.appendChild(li);
  });
}

async function addNote(content) {
  await fetch('/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  loadNotes();
}

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addNote(noteInput.value);
});

loadNotes();
