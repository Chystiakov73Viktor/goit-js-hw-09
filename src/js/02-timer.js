import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const divContEl = document.querySelector('.timer');
const startBtnEl = document.querySelector('[data-start]');
const dataDaysEl = document.querySelector('[data-days]');
const dataHoursEl = document.querySelector('[data-hours]');
const dataMinutesEl = document.querySelector('[data-minutes]');
const dataSecondsEl = document.querySelector('[data-seconds]');
const spanEl = document.querySelectorAll('.value');

document.body.style.backgroundColor = '#daddec';
divContEl.style.display = 'flex';
divContEl.style.gap = '30px';
divContEl.style.marginTop = '40px';
divContEl.style.justifyContent = 'center';

[...divContEl.children].forEach(element => {
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
});

[...spanEl].forEach(element => {
  element.style.display = 'flex';
  element.style.justifyContent = 'center';
  element.style.fontWeight = '600';
  element.style.fontSize = '30px';
  element.style.lineHeight = '1.2';
});

let intervalId = null;
let targetDate = null;
let currentDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    targetDate = selectedDates[0].getTime();
    currentDate = new Date().getTime();

    if (targetDate < currentDate) {
      window.alert('Please choose a date in the future');
      startBtnEl.disabled = true;
      return;
    } else {
      startBtnEl.removeAttribute('disabled');
      return;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtnEl.addEventListener('click', onStartCounter);
startBtnEl.disabled = true;

function onStartCounter() {
  intervalId = setInterval(() => {
    const deltaTime = targetDate - currentDate;
    const time = convertMs(deltaTime);

    createTimer(time);

    console.log(convertMs(deltaTime));
    if (deltaTime < 1000) {
      clearInterval(intervalId);
      inputEl.disabled = false;
      return;
    } else {
      currentDate += 1000;
      convertMs(currentDate);
      startBtnEl.disabled = true;
      inputEl.disabled = true;
      return;
    }
  }, 1000);
}

function createTimer({ days, hours, minutes, seconds }) {
  dataDaysEl.textContent = days;
  dataHoursEl.textContent = hours;
  dataMinutesEl.textContent = minutes;
  dataSecondsEl.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
