// ===== OJO PARA MOSTRAR/OCULTAR CONTRASEÑA =====
function activarOjo(idBoton, idCampo) {
  const boton = document.getElementById(idBoton);
  const campo = document.getElementById(idCampo);
  const icono = boton.querySelector('i');

  boton.addEventListener('click', function () {
    const visible = campo.type === 'text';

    // Alterna entre ojo normal y ojo con slash
    icono.classList.toggle('bi-eye');
    icono.classList.toggle('bi-eye-slash');

    // Alterna entre password y text
    campo.type = visible ? 'password' : 'text';
    boton.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
  });
}

// Apartados
const nombreInput = document.getElementById('reg-nombre');
const apellidoInput = document.getElementById('reg-apellido');
const correoInput = document.getElementById('reg-email');
const telefonoInput = document.getElementById('reg-telefono');
const passwordInput = document.getElementById('reg-password');
const confirmarInput = document.getElementById('reg-confirmar');
const registroForm = document.getElementById('registro-form');

activarOjo('btnVerContrasena1', 'reg-password');
activarOjo('btnVerContrasena2', 'reg-confirmar');

// Validaciones
const valNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
const valCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const valTelefono = /^\d{8}$/;


// Nombre y apellido: solo letras y espacios.Mediante el replace se eliminan los caracteres no permitidos mientras se escribe.
[nombreInput, apellidoInput].forEach(function (campo) {
  campo.addEventListener('input', function () {
    this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g, '');
  });
});

// Teléfono: solo números y máximo 8 dígitos
telefonoInput.addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '').slice(0, 8);
});

// Al escribir en cualquier campo se limpia su error anterior
[nombreInput, apellidoInput, correoInput, telefonoInput, passwordInput, confirmarInput]
  .forEach(function (campo) {
    campo.addEventListener('input', function () {
      campo.setCustomValidity('');
    });
  });


// Marca el campo como inválido y cambia el mensaje que se muestra debajo
function validarCampo(campo, esValido, mensaje) {
  campo.setCustomValidity(esValido ? '' : mensaje);

  const feedback = campo.parentElement.querySelector('.invalid-feedback');
  if (feedback && !esValido) {
    feedback.textContent = mensaje;
  }
}

registroForm.addEventListener('submit', function (e) {
  e.preventDefault();
  registroForm.classList.add('was-validated');

  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();
  const correo = correoInput.value.trim();
  const telefono = telefonoInput.value.trim();

  validarCampo(
    nombreInput,
    valNombre.test(nombre),
    nombre === '' ? 'Ingresa tu nombre.' : 'El nombre solo puede contener letras.'
  );

  validarCampo(
    apellidoInput,
    valNombre.test(apellido),
    apellido === '' ? 'Ingresa tu apellido.' : 'El apellido solo puede contener letras.'
  );

  validarCampo(
    correoInput,
    valCorreo.test(correo),
    correo === '' ? 'Ingresa tu correo.' : 'Ingresa un correo válido, por ejemplo correo@ejemplo.com.'
  );

  validarCampo(
    telefonoInput,
    valTelefono.test(telefono),
    telefono === '' ? 'Ingresa tu teléfono.' : 'El teléfono debe tener 8 dígitos numéricos.'
  );

  validarCampo(
    confirmarInput,
    passwordInput.value === confirmarInput.value,
    'Las contraseñas no coinciden.'
  );

  if (!registroForm.checkValidity()) return;

  alert('Cuenta creada con éxito. Ya puedes iniciar sesión.');
});