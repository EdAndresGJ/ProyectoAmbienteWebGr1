// Mostrar / ocultar contraseña
const btnEye = document.getElementById('btn-eye');
const passwordInput = document.getElementById('login-password');

btnEye.addEventListener('click', function () {
  const visible = passwordInput.type === 'text';
  passwordInput.type = visible ? 'password' : 'text';
  btnEye.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
});

// Validación del formulario
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!loginForm.checkValidity()) {
    loginForm.classList.add('was-validated');
    return;
  }
  alert('Inicio de sesión exitoso.');
});