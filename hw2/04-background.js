// 04-background.js

const mainElement = document.querySelector('main');
const inputElement = document.getElementById('input');
const toggleButton = document.getElementById('toggleButton');
let intervalId;

// Function to generate a random color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  // Generate random alpha between 0.5 and 1 for softer colors
  const alpha = Math.random() * 0.5 + 0.5;
  return [r, g, b, alpha];
}

function changeBackgroundColor() {
  const colorArray = getRandomColor();
  // Convert the colorArray into rgba format
  const rgbaString = `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${colorArray[3]})`;
  document.body.style.backgroundColor = rgbaString;
}

// Function to start changing the background color
function startBackgroundChange(interval) {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(changeBackgroundColor, interval);
}

// Event listener for the toggle button
toggleButton.addEventListener('click', function () {
  if (toggleButton.classList.contains('btn-primary')) {
    // Convert seconds to milliseconds
    if (inputElement.value === '' || inputElement.value < 1) {
      alert('Please enter a valid number of seconds.');
      return;
    }
    const interval = inputElement.value * 1000;
    startBackgroundChange(interval);
    toggleButton.textContent = 'Stop';
    toggleButton.classList.remove('btn-primary');
    toggleButton.classList.add('btn-danger');
  } else {
    clearInterval(intervalId);
    toggleButton.textContent = 'Start';
    toggleButton.classList.remove('btn-danger');
    toggleButton.classList.add('btn-primary');
  }
});
