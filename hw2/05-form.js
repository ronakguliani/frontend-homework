const form = document.querySelector('form');

form.onsubmit = (event) => {
  event.preventDefault();

  const checkboxes = document.querySelectorAll('input');

  if (form.elements.fullName.value) {
    console.log('========== Form Submission ========== ');
    console.log('Full Name:', form.elements.fullName.value);
    console.log('Email:', form.elements.email.value);

    if (form.elements.registration.value === 'choose-option') {
      console.log('Status: Not Specified');
    } else {
      console.log('Status: ', form.elements.registration.value);
    }

    console.log('Courses: ');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        console.log('   ' + checkbox.value);
      }
    });

    console.log('Anything Else:', form.elements.infoArea.value);
  } else {
    console.warn('Please enter your full name');
  }

  document.getElementById('reset').click();
};
