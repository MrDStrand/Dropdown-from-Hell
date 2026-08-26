const MIN_YEAR = 1000;
const MAX_YEAR = 2026;
const TARGET_YEAR = 1987;

const yearSelect = document.getElementById('yearSelect');
const targetYear = document.getElementById('targetYear');
const timer = document.getElementById('timer');
const attempts = document.getElementById('attempts');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');

let startTime = null;
let timerHandle = null;
let attemptCount = 0;
let running = false;

function buildHellDropdown() {
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Choose a year...';
  yearSelect.replaceChildren(placeholder);

  // Deliberate UX crime: sort years alphabetically as strings, not numerically.
  const years = [];
  for (let year = MIN_YEAR; year <= MAX_YEAR; year++) {
    years.push(String(year));
  }

  years.sort((a, b) => a.localeCompare(b));

  for (const year of years) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
}

function updateTimer() {
  if (!running || startTime === null) return;
  const elapsed = (performance.now() - startTime) / 1000;
  timer.textContent = `${elapsed.toFixed(3)} s`;
}

function startGame() {
  running = true;
  attemptCount = 0;
  attempts.textContent = '0';
  yearSelect.value = '';
  yearSelect.disabled = false;
  startButton.disabled = true;
  message.textContent = '';
  message.className = 'message';

  startTime = performance.now();
  timerHandle = window.setInterval(updateTimer, 10);
  yearSelect.focus();
}

function finishGame() {
  running = false;
  window.clearInterval(timerHandle);
  updateTimer();
  yearSelect.disabled = true;
  startButton.disabled = false;
  startButton.textContent = 'Play again';

  const finalTime = ((performance.now() - startTime) / 1000).toFixed(3);
  timer.textContent = `${finalTime} s`;
  message.textContent = `Success. You survived in ${finalTime} seconds with ${attemptCount} selection${attemptCount === 1 ? '' : 's'}.`;
  message.className = 'message success';
}

function resetGame() {
  running = false;
  window.clearInterval(timerHandle);
  startTime = null;
  attemptCount = 0;
  timer.textContent = '0.000 s';
  attempts.textContent = '0';
  yearSelect.value = '';
  yearSelect.disabled = true;
  startButton.disabled = false;
  startButton.textContent = 'Start challenge';
  message.textContent = '';
  message.className = 'message';
}

// Disable keyboard-based jumping/searching. Users must use the dropdown itself.
yearSelect.addEventListener('keydown', (event) => {
  const blockedKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
  const isTyping = event.key.length === 1;

  if (blockedKeys.includes(event.key) || isTyping) {
    event.preventDefault();
  }
});

yearSelect.addEventListener('change', () => {
  if (!running) return;

  attemptCount += 1;
  attempts.textContent = String(attemptCount);

  if (yearSelect.value === String(TARGET_YEAR)) {
    finishGame();
  } else if (yearSelect.value) {
    message.textContent = 'Nope. Keep digging through the dropdown.';
    message.className = 'message';
  }
});

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

targetYear.textContent = String(TARGET_YEAR);
buildHellDropdown();
resetGame();
