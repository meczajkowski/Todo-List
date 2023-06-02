const userNameInput = document.querySelector('#name');

userNameInput.value = localStorage.getItem('userName') || '';

userNameInput.addEventListener('input', () => {
  localStorage.setItem('userName', userNameInput.value);
});
