
// Profesionales de ejemplo
const profesionalesIniciales = [
    {
        id: 1,
        nombre: "Carlos Rodríguez",
        especialidad: "Electricidad",
        ubicacion: "San José",
        telefono: "8888-1111",
        correo: "carlos@ejemplo.com",
        descripcion: "Instalación y mantenimiento de sistemas eléctricos.",
        icono: "⚡"
    },
    {
        id: 2,
        nombre: "María Fernández",
        especialidad: "Limpieza",
        ubicacion: "Heredia",
        telefono: "8888-2222",
        correo: "maria@ejemplo.com",
        descripcion: "Limpieza general de hogares y oficinas.",
        icono: "🧹"
    },
    {
        id: 3,
        nombre: "Andrés Vargas",
        especialidad: "Plomería",
        ubicacion: "Cartago",
        telefono: "8888-3333",
        correo: "andres@ejemplo.com",
        descripcion: "Reparación de tuberías, grifos y fugas de agua.",
        icono: "🔧"
    },
    {
        id: 4,
        nombre: "Lucía Morales",
        especialidad: "Pintura",
        ubicacion: "Alajuela",
        telefono: "8888-4444",
        correo: "lucia@ejemplo.com",
        descripcion: "Pintura de interiores y exteriores.",
        icono: "🎨"
    },
    {
        id: 5,
        nombre: "José Ramírez",
        especialidad: "Carpintería",
        ubicacion: "San José",
        telefono: "8888-5555",
        correo: "jose@ejemplo.com",
        descripcion: "Fabricación y reparación de muebles de madera.",
        icono: "🪚"
    },
    {
        id: 6,
        nombre: "Ana Solís",
        especialidad: "Jardinería",
        ubicacion: "Heredia",
        telefono: "8888-6666",
        correo: "ana@ejemplo.com",
        descripcion: "Mantenimiento de jardines y zonas verdes.",
        icono: "🌱"
    },
    {
        id: 7,
        nombre: "Pedro Jiménez",
        especialidad: "Chapear",
        ubicacion: "Cartago",
        telefono: "8888-7777",
        correo: "pedro@ejemplo.com",
        descripcion: "Limpieza y chapea de terrenos.",
        icono: "🌾"
    },
    {
        id: 8,
        nombre: "Sofía Castro",
        especialidad: "Otros",
        ubicacion: "San José",
        telefono: "8888-8888",
        correo: "sofia@ejemplo.com",
        descripcion: "Servicios generales de mantenimiento del hogar.",
        icono: "🛠️"
    }
];

// Declaracion de constantes para elementos.

const buscarProfesional = document.getElementById("buscarProfesional");
const filtrarEspecialidad = document.getElementById("filtrarEspecialidad");
const btnBuscarProfesional = document.getElementById("btnBuscarProfesional");
const btnLimpiarBusqueda = document.getElementById("btnLimpiarBusqueda");

const listaProfesionales = document.getElementById("listaProfesionales");
const cantidadResultados = document.getElementById("cantidadResultados");
const sinResultados = document.getElementById("sinResultados");

const dialogPerfil = document.getElementById("dialogPerfil");
const cerrarPerfil = document.getElementById("cerrarPerfil");

const dialogRegistro = document.getElementById("dialogRegistro");
const cerrarRegistro = document.getElementById("cerrarRegistro");
const btnRegistroProfesional = document.getElementById("btnRegistroProfesional");
const formRegistroProfesional = document.getElementById("formRegistroProfesional");

// Guarda el ID del profesional que estamos editando
let idProfesionalEditando = null;



// Profesionales creados desde el formulario
let profesionalesRegistrados = [];

try {
    const datosGuardados = JSON.parse(
        localStorage.getItem("profesionalesRegistrados") || "[]"
    );

    if (Array.isArray(datosGuardados)) {
        profesionalesRegistrados = datosGuardados;
    }

} catch (error) {
    console.log("No se pudieron cargar los profesionales.");
}

// Unir profesionales iniciales y registrados
let profesionales = [
    ...profesionalesIniciales,
    ...profesionalesRegistrados
];

// Guardar cambios en el navegador
function guardarProfesionales() {
    localStorage.setItem(
        "profesionalesRegistrados",
        JSON.stringify(profesionalesRegistrados)
    );
}

// Actualizar el arreglo completo
function actualizarLista() {
    profesionales = [
        ...profesionalesIniciales,
        ...profesionalesRegistrados
    ];

    buscarProfesionales();
}


// Obtener icono según especialidad
function obtenerIcono(especialidad) {

    const iconos = {
        "Chapear": "🌾",
        "Pintura": "🎨",
        "Plomería": "🔧",
        "Electricidad": "⚡",
        "Limpieza": "🧹",
        "Carpintería": "🪚",
        "Jardinería": "🌱",
        "Otros": "🛠️"
    };

    return iconos[especialidad] || "👷";
}


function crearElemento(etiqueta, clase, contenido) {

    const elemento = document.createElement(etiqueta);

    elemento.className = clase;
    elemento.textContent = contenido;

    return elemento;
}


function mostrarProfesionales(lista) {

    listaProfesionales.innerHTML = "";

    cantidadResultados.textContent =
        lista.length + " profesionales encontrados";

    sinResultados.hidden = lista.length > 0;

    lista.forEach(function(profesional) {

        // Columna Bootstrap
        const columna = document.createElement("div");
        columna.className = "col-12 col-md-6 col-lg-4";

        // Tarjeta
        const tarjeta = document.createElement("div");
        tarjeta.className = "np-card";

        // Icono
        const imagen = crearElemento(
            "div",
            "np-card-imagen",
            profesional.icono || obtenerIcono(profesional.especialidad)
        );

        // Contenido
        const contenido = document.createElement("div");
        contenido.className = "np-card-contenido";

        const nombre = crearElemento(
            "h3",
            "np-card-nombre",
            profesional.nombre
        );

        const especialidad = crearElemento(
            "p",
            "np-card-especialidad",
            profesional.especialidad
        );

        const ubicacion = crearElemento(
            "p",
            "np-card-ubicacion",
            "📍 " + profesional.ubicacion
        );

        const descripcion = crearElemento(
            "p",
            "np-card-descripcion",
            profesional.descripcion
        );

        // Botón Ver perfil
        const btnPerfil = crearElemento(
            "button",
            "btn btn-primary",
            "Ver perfil"
        );

        btnPerfil.type = "button";

        btnPerfil.addEventListener("click", function() {
            mostrarPerfil(profesional);
        });

        contenido.appendChild(nombre);
        contenido.appendChild(especialidad);
        contenido.appendChild(ubicacion);
        contenido.appendChild(descripcion);
        contenido.appendChild(btnPerfil);

        // Comprobar si fue registrado por el formulario
        const estaRegistrado = profesionalesRegistrados.some(function(p) {
            return p.id === profesional.id;
        });

        if (estaRegistrado) {

            // Contenedor de botones
            const botonesAdmin = document.createElement("div");
            botonesAdmin.className = "d-flex gap-2 mt-2";

            // Botón Editar
            const btnEditar = crearElemento(
                "button",
                "btn btn-warning flex-fill",
                "Editar"
            );

            btnEditar.type = "button";

            btnEditar.addEventListener("click", function() {
                editarProfesional(profesional);
            });

            // Botón Eliminar
            const btnEliminar = crearElemento(
                "button",
                "btn btn-danger flex-fill",
                "Eliminar"
            );

            btnEliminar.type = "button";

            btnEliminar.addEventListener("click", function() {
                eliminarProfesional(profesional.id);
            });

            botonesAdmin.appendChild(btnEditar);
            botonesAdmin.appendChild(btnEliminar);

            contenido.appendChild(botonesAdmin);
        }

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(contenido);

        columna.appendChild(tarjeta);
        listaProfesionales.appendChild(columna);
    });
}



function buscarProfesionales() {

    const texto = buscarProfesional.value.toLowerCase().trim();
    const especialidad = filtrarEspecialidad.value;

    const resultados = profesionales.filter(function(profesional) {

        const coincideTexto =
            profesional.nombre.toLowerCase().includes(texto) ||
            profesional.especialidad.toLowerCase().includes(texto) ||
            profesional.ubicacion.toLowerCase().includes(texto);

        const coincideEspecialidad =
            especialidad === "" ||
            profesional.especialidad === especialidad;

        return coincideTexto && coincideEspecialidad;
    });

    mostrarProfesionales(resultados);
}

// Eventos del buscador
btnBuscarProfesional.addEventListener("click", buscarProfesionales);
buscarProfesional.addEventListener("input", buscarProfesionales);
filtrarEspecialidad.addEventListener("change", buscarProfesionales);

// Limpiar búsqueda
btnLimpiarBusqueda.addEventListener("click", function() {

    buscarProfesional.value = "";
    filtrarEspecialidad.value = "";

    mostrarProfesionales(profesionales);
});



function mostrarPerfil(profesional) {

    document.getElementById("tituloPerfil").textContent =
        profesional.nombre;

    document.getElementById("especialidadPerfil").textContent =
        "Especialidad: " + profesional.especialidad;

    document.getElementById("ubicacionPerfil").textContent =
        "Ubicación: " + profesional.ubicacion;

    document.getElementById("descripcionPerfil").textContent =
        profesional.descripcion;

    document.getElementById("telefonoPerfil").textContent =
        "Teléfono: " + profesional.telefono;

    dialogPerfil.showModal();
}

cerrarPerfil.addEventListener("click", function() {
    dialogPerfil.close();
});



// Preparar formulario para registrar
function prepararRegistro() {

    idProfesionalEditando = null;

    formRegistroProfesional.reset();

    dialogRegistro.querySelector("h2").textContent =
        "Registro de profesional";

    dialogRegistro.querySelector('button[type="submit"]').textContent =
        "Completar registro";
}

// Abrir registro
btnRegistroProfesional.addEventListener("click", function() {

    prepararRegistro();
    dialogRegistro.showModal();
});

// Cerrar registro
cerrarRegistro.addEventListener("click", function() {

    idProfesionalEditando = null;
    dialogRegistro.close();
});


function editarProfesional(profesional) {

    idProfesionalEditando = profesional.id;

    document.getElementById("nombreRegistro").value =
        profesional.nombre;

    document.getElementById("especialidadRegistro").value =
        profesional.especialidad;

    document.getElementById("ubicacionRegistro").value =
        profesional.ubicacion;

    document.getElementById("telefonoRegistro").value =
        profesional.telefono;

    document.getElementById("correoRegistro").value =
        profesional.correo || "";

    document.getElementById("descripcionRegistro").value =
        profesional.descripcion;

    // Cambiar título y botón
    dialogRegistro.querySelector("h2").textContent =
        "Editar profesional";

    dialogRegistro.querySelector('button[type="submit"]').textContent =
        "Guardar cambios";

    dialogRegistro.showModal();
}



function eliminarProfesional(id) {

    const confirmar = confirm(
        "¿Estás seguro de que deseas eliminar este profesional?"
    );

    if (!confirmar) {
        return;
    }

    // Eliminar del arreglo
    profesionalesRegistrados = profesionalesRegistrados.filter(
        function(profesional) {
            return profesional.id !== id;
        }
    );

    // Guardar cambios
    guardarProfesionales();

    // Actualizar tarjetas
    actualizarLista();

    alert("Profesional eliminado correctamente.");
}


formRegistroProfesional.addEventListener("submit", function(event) {

    event.preventDefault();

    // Obtener datos del formulario
    const nombre = document.getElementById("nombreRegistro").value.trim();

    const especialidad =
        document.getElementById("especialidadRegistro").value;

    const ubicacion =
        document.getElementById("ubicacionRegistro").value.trim();

    const telefono =
        document.getElementById("telefonoRegistro").value.trim();

    const correo =
        document.getElementById("correoRegistro").value.trim();

    const descripcion =
        document.getElementById("descripcionRegistro").value.trim();

    // Validación
    if (!nombre || !especialidad || !ubicacion ||
        !telefono || !correo || !descripcion) {

        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear objeto
    const nuevoProfesional = {
        id: idProfesionalEditando !== null
            ? idProfesionalEditando
            : Date.now(),

        nombre: nombre,
        especialidad: especialidad,
        ubicacion: ubicacion,
        telefono: telefono,
        correo: correo,
        descripcion: descripcion,
        icono: obtenerIcono(especialidad)
    };

    // Diferenciar registro de edición
    const esEdicion = idProfesionalEditando !== null;

    if (esEdicion) {

        const indice = profesionalesRegistrados.findIndex(
            function(profesional) {
                return profesional.id === idProfesionalEditando;
            }
        );

        if (indice === -1) {
            alert("No se encontró el profesional.");
            return;
        }

        // Modificar profesional existente
        profesionalesRegistrados[indice] = nuevoProfesional;

    } else {

        // Crear nuevo profesional
        profesionalesRegistrados.push(nuevoProfesional);
    }

    // Guardar en localStorage
    guardarProfesionales();

    // Limpiar filtros para mostrar el resultado
    buscarProfesional.value = "";
    filtrarEspecialidad.value = "";

    // Actualizar listado
    actualizarLista();

    // Limpiar formulario
    formRegistroProfesional.reset();

    idProfesionalEditando = null;

    dialogRegistro.close();

    if (esEdicion) {
        alert("Profesional actualizado correctamente.");
    } else {
        alert("Profesional registrado correctamente.");
    }

    prepararRegistro();
});



// Mostrar todos los profesionales al cargar
mostrarProfesionales(profesionales);
