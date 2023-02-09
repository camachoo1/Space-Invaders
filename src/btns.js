// Elements
const howToPlay = document.querySelector('.how-to-play');
const overlay = document.querySelector('.overlay');
const btnCloseInstructPane = document.querySelector(
  '.close-how-to-play'
);
const btnOpenInstructPane = document.querySelector(
  '.show-how-to-play'
);

// Event Handlers
const openInstructions = () => {
  howToPlay.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeInstructions = () => {
  howToPlay.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Event Listeners
btnOpenInstructPane.addEventListener('click', openInstructions);
btnCloseInstructPane.addEventListener('click', closeInstructions);
overlay.addEventListener('click', closeInstructions);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !howToPlay.classList.contains('hidden')) {
    closeInstructions();
  }
});
