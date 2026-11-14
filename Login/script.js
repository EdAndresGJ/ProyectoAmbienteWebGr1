// Icono de ojo
function activarOjo(idBoton, idCampo) {
  const boton = document.getElementById(idBoton);
  const campo = document.getElementById(idCampo);
  const icono = boton.querySelector('i');

  boton.addEventListener('click', function () {
    const visible = campo.type === 'text';

    icono.classList.toggle('bi-eye');
    icono.classList.toggle('bi-eye-slash');

    campo.type = visible ? 'password' : 'text';
    boton.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
  });
}

// Apartados
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('log-email');
const passwordInput = document.getElementById('log-password');

activarOjo('btnVerContrasena', 'log-password');

// Validacion
const valCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Al escribir se limpia el error anterior
[emailInput, passwordInput].forEach(function (campo) {
  campo.addEventListener('input', function () {
    campo.setCustomValidity('');
  });
});

function validarCampo(campo, esValido, mensaje) {
  campo.setCustomValidity(esValido ? '' : mensaje);

  const feedback = campo.parentElement.querySelector('.invalid-feedback');
  if (feedback && !esValido) {
    feedback.textContent = mensaje;
  }
}

// Envio del formulario
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  loginForm.classList.add('was-validated');

  const correo = emailInput.value.trim();

  validarCampo(
    emailInput,
    valCorreo.test(correo),
    correo === '' ? 'Ingresa tu correo.' : 'Ingresa un correo válido, por ejemplo correo@ejemplo.com.'
  );

  validarCampo(
    passwordInput,
    passwordInput.value !== '',
    'Ingresa tu contraseña.'
  );

  if (!loginForm.checkValidity()) return;

  alert('Inicio de sesión exitoso.');
});