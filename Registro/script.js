// Mostrar / ocultar contraseña - campo 1
const btnEye1 = document.getElementById('btn-eye-1');
const passwordInput = document.getElementById('reg-password');

btnEye1.addEventListener('click', function () {
  const visible = passwordInput.type === 'text';
  passwordInput.type = visible ? 'password' : 'text';
  btnEye1.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
});

// Mostrar / ocultar contraseña - campo 2
const btnEye2 = document.getElementById('btn-eye-2');
const confirmarInput = document.getElementById('reg-confirmar');

btnEye2.addEventListener('click', function () {
  const visible = confirmarInput.type === 'text';
  confirmarInput.type = visible ? 'password' : 'text';
  btnEye2.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
});

// Validación del formulario
const registroForm = document.getElementById('registro-form');

registroForm.addEventListener('submit', function (e) {
  e.preventDefault();
  registroForm.classList.add('was-validated');

  if (passwordInput.value !== confirmarInput.value) {
    confirmarInput.setCustomValidity('no-coinciden');
    document.getElementById('confirmar-msg').textContent = 'Las contraseñas no coinciden.';
  } else {
    confirmarInput.setCustomValidity('');
  }

  if (!registroForm.checkValidity()) return;

  alert('Cuenta creada con éxito. Ya puedes iniciar sesión.');
});