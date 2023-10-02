const elem = document.querySelector('input');

elem.addEventListener('input', handleInput);

const outputElement = document.querySelector('#output');

function handleInput() {
  const int = elem.value;
  if (int < 0) {
    outputElement.innerText = 'Please enter a positive number.';
    outputElement.className = 'text-danger';
    return;
  }
  const result = checkPalindrome(int);
  if (result === false) {
    outputElement.innerText = 'No. Try again.';
    outputElement.className = 'text-danger';
  }

  else {
    output.textContent = "Yes. This is a palindrome!";
    outputElement.className = 'text-success';
  }
}

function checkPalindrome(str) {
  const len = str.length;
  const mid = Math.floor(len / 2);
  for (let i = 0; i < mid; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}