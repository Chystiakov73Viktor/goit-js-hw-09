import '../css/common.css';

const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;

startBtnEl.addEventListener('click', onColorChange);
stopBtnEl.addEventListener('click', onStopsColor);

function onColorChange() {
  timerId = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);

  // startBtnEl.toggleAttribute('disabled');
  // stopBtnEl.removeAttribute('disabled');
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;
}

function onStopsColor() {
  clearInterval(timerId);

  // stopBtnEl.toggleAttribute('disabled');
  // startBtnEl.removeAttribute('disabled');
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
