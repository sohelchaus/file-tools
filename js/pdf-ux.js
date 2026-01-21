// ----
// MAIN
// ----

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const chooseBtn = document.getElementById('chooseBtn');
const pdfEmbed = document.getElementById('pdfEmbed');
const annotationLayer = document.getElementById('annotationLayer');
const addNoteBtn = document.getElementById('addNoteBtn');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const clearNotesBtn = document.getElementById('clearNotes');
const stars = document.querySelectorAll('.star');
const feedbackText = document.getElementById('feedbackText');
const submitFeedback = document.getElementById('submitFeedback');
const feedbackStatus = document.getElementById('feedbackStatus');

let currentZoom = 1;
let rating = 0;

// Load PDF
function loadPDF(file) {
  const url = URL.createObjectURL(file);
  pdfEmbed.src = url;
  currentZoom = 1;
  pdfEmbed.style.transform = 'scale(1)';
  pdfEmbed.style.transformOrigin = 'top left';
}

// Drag & Drop
dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('dragover', e => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
dropzone.addEventListener('drop', e => {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type === 'application/pdf') loadPDF(file);
});

// File Input
chooseBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file && file.type === 'application/pdf') loadPDF(file);
});

// Zoom
zoomInBtn.addEventListener('click', () => {
  currentZoom = Math.min(2.5, currentZoom + 0.1);
  pdfEmbed.style.transform = `scale(${currentZoom})`;
});
zoomOutBtn.addEventListener('click', () => {
  currentZoom = Math.max(0.6, currentZoom - 0.1);
  pdfEmbed.style.transform = `scale(${currentZoom})`;
});

// Notes
function createNote(x = 40, y = 40, text = '') {
  const note = document.createElement('div');
  note.className = 'note';
  note.style.left = `${x}rem`;
  note.style.top = `${y}rem`;

  note.innerHTML = `
    <div class="note-header">
      <span>Note</span>
      <button class="delete-note">✕</button>
    </div>
    <textarea rows="3" placeholder="Type your comment...">${text}</textarea>
  `;

  annotationLayer.appendChild(note);

  // Dragging
  let dragging = false;
  let offsetX = 0, offsetY = 0;

  note.addEventListener('mousedown', e => {
    if (e.target.classList.contains('delete-note')) return;
    dragging = true;
    const rect = note.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const containerRect = annotationLayer.getBoundingClientRect();
    let nx = e.clientX - containerRect.left - offsetX;
    let ny = e.clientY - containerRect.top - offsetY;
    note.style.left = `${nx / 16}rem`; // convert px to rem
    note.style.top = `${ny / 16}rem`;
  });

  window.addEventListener('mouseup', () => dragging = false);

  // Delete
  note.querySelector('.delete-note').addEventListener('click', () => note.remove());
}

addNoteBtn.addEventListener('click', () => createNote());
clearNotesBtn.addEventListener('click', () => annotationLayer.innerHTML = '');

// Feedback
stars.forEach(star => {
  star.addEventListener('click', () => {
    rating = Number(star.dataset.value);
    stars.forEach(s => s.classList.toggle('active', Number(s.dataset.value) <= rating));
  });
});

submitFeedback.addEventListener('click', () => {
  const text = feedbackText.value.trim();
  if (!rating) {
    feedbackStatus.textContent = 'Please select a star rating.';
    return;
  }
  if (!text) {
    feedbackStatus.textContent = 'Please add a comment.';
    return;
  }
  feedbackStatus.textContent = `Thanks! Rating: ${rating}/5 recorded.`;
  feedbackText.value = '';
  stars.forEach(s => s.classList.remove('active'));
  rating = 0;
  setTimeout(() => feedbackStatus.textContent = '', 3000);
});
