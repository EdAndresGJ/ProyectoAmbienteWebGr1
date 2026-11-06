"use strict";

const servicios = [
  {
    id: 1, nombre: "Carlos M.", especialidad: "Jardinería y chapia",
    categorias: ["Chapear", "Jardinería"], puntuacion: "4.9", resenas: 32,
    descripcion: "Realizo trabajos de chapear, limpieza de terrenos, mantenimiento de jardines y áreas verdes.",
    precio: 15000, unidad: "por jornada", imagen: "chapear.jpg", avatar: "avatar-carlos.jpg"
  },
  {
    id: 2, nombre: "Luis R.", especialidad: "Pintura en general",
    categorias: ["Pintura", "Pintura de techos"], puntuacion: "4.8", resenas: 27,
    descripcion: "Pintura de interiores y exteriores, techos, paredes y acabados de calidad.",
    precio: 18000, unidad: "por día", imagen: "pintura.jpg", avatar: "avatar-luis.jpg"
  },
  {
    id: 3, nombre: "Andrés G.", especialidad: "Pintura de techos",
    categorias: ["Pintura", "Impermeabilización"], puntuacion: "4.7", resenas: 19,
    descripcion: "Pintura de techos, impermeabilización y mantenimiento en general.",
    precio: 20000, unidad: "por día", imagen: "viviendas.jpg", avatar: "avatar-andres.jpg"
  },
  {
    id: 4, nombre: "José A.", especialidad: "Plomería",
    categorias: ["Plomería", "Reparaciones"], puntuacion: "4.9", resenas: 42,
    descripcion: "Instalación y reparación de tuberías, lavamanos, sanitarios y más.",
    precio: 16000, unidad: "por servicio", imagen: "plomeria.jpg", avatar: "avatar-jose.jpg"
  },
  {
    id: 5, nombre: "Diego L.", especialidad: "Electricidad",
    categorias: ["Electricidad", "Instalaciones"], puntuacion: "4.8", resenas: 36,
    descripcion: "Instalación y reparación eléctrica, cableado, luminarias y tableros.",
    precio: 17000, unidad: "por servicio", imagen: "electricidad.jpg", avatar: "avatar-diego.jpg"
  },
  {
    id: 6, nombre: "María F.", especialidad: "Limpieza del hogar",
    categorias: ["Limpieza", "Hogar"], puntuacion: "4.9", resenas: 21,
    descripcion: "Limpieza profunda y mantenimiento de casas, apartamentos y oficinas.",
    precio: 12000, unidad: "por servicio", imagen: "limpieza.jpg", avatar: "avatar-maria.jpg"
  },
  {
    id: 7, nombre: "Ricardo S.", especialidad: "Carpintería",
    categorias: ["Carpintería", "Muebles"], puntuacion: "4.7", resenas: 15,
    descripcion: "Fabricación y reparación de muebles, puertas, repisas y más.",
    precio: 22000, unidad: "por servicio", imagen: "carpinteria.jpg", avatar: "avatar-ricardo.jpg"
  },
  {
    id: 8, nombre: "Kevin P.", especialidad: "Hombre de mantenimiento",
    categorias: ["Otros", "Mantenimiento"], puntuacion: "4.6", resenas: 12,
    descripcion: "Pequeñas reparaciones, instalación de repisas, montaje de muebles y más.",
    precio: 14000, unidad: "por servicio", imagen: "mantenimiento.jpg", avatar: "avatar-kevin.jpg"
  }
];

const grid = document.getElementById("services-grid");
const input = document.getElementById("search-input");
const counter = document.getElementById("results-count");
const activeFilter = document.getElementById("active-filter");
const filterLabel = document.getElementById("filter-label");
const emptyState = document.getElementById("empty-state");
const categoryButtons = [...document.querySelectorAll(".category-card")];
const profileDialog = document.getElementById("profile-dialog");
const infoDialog = document.getElementById("info-dialog");
let selectedCategory = "";

function normalize(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function formatPrice(amount) {
  return "₡" + new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(amount);
}

function renderCard(servicio) {
  return `
    <article class="service-card">
      <img class="service-image" src="assets/images/${servicio.imagen}" alt="Trabajo de ${servicio.especialidad.toLowerCase()}" loading="lazy">
      <div class="service-body">
        <div class="profile-row">
          <img class="profile-avatar" src="assets/images/${servicio.avatar}" alt="" loading="lazy">
          <div><h3 class="profile-name">${servicio.nombre}</h3><p class="profile-specialty">${servicio.especialidad}</p></div>
        </div>
        <p class="rating"><span class="rating-star" aria-hidden="true">★</span><span class="rating-number">${servicio.puntuacion}</span> <span class="rating-total">(${servicio.resenas} reseñas)</span></p>
        <p class="card-description">${servicio.descripcion}</p>
        <div class="tag-row">${servicio.categorias.map(cat => `<span class="service-tag">${cat}</span>`).join("")}</div>
        <div class="card-bottom">
          <div class="price"><strong>${formatPrice(servicio.precio)}</strong><span>/ ${servicio.unidad}</span></div>
          <button class="profile-button" type="button" data-profile="${servicio.id}" aria-label="Ver perfil de ${servicio.nombre}">Ver perfil</button>
        </div>
      </div>
    </article>`;
}

function renderServices() {
  const keyword = normalize(input.value);
  const filtered = servicios.filter(servicio => {
    const matchesCategory = !selectedCategory || servicio.categorias.some(cat => cat === selectedCategory);
    const text = normalize([servicio.nombre, servicio.especialidad, servicio.descripcion, ...servicio.categorias].join(" "));
    return matchesCategory && (!keyword || text.includes(keyword));
  });

  grid.innerHTML = filtered.map(renderCard).join("");
  grid.hidden = filtered.length === 0;
  emptyState.hidden = filtered.length !== 0;
  counter.textContent = (selectedCategory || keyword) ? `${filtered.length} ${filtered.length === 1 ? "servicio encontrado" : "servicios encontrados"}` : "";

  const labels = [];
  if (selectedCategory) labels.push(selectedCategory);
  if (keyword) labels.push(`“${input.value.trim()}”`);
  activeFilter.hidden = labels.length === 0;
  filterLabel.textContent = labels.join(" · ");
  categoryButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.category === selectedCategory)));
}

function resetFilters() {
  selectedCategory = "";
  input.value = "";
  renderServices();
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = selectedCategory === button.dataset.category ? "" : button.dataset.category;
    renderServices();
    document.getElementById("profesionales").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

input.addEventListener("input", renderServices);
document.getElementById("search-form").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("profesionales").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.getElementById("show-all").addEventListener("click", resetFilters);
document.getElementById("clear-filter").addEventListener("click", resetFilters);
document.getElementById("empty-reset").addEventListener("click", resetFilters);

// Modal demostrativo de perfiles, sin conexión a servidor.
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-profile]");
  if (!button) return;
  const service = servicios.find(item => item.id === Number(button.dataset.profile));
  if (!service) return;
  document.getElementById("profile-content").innerHTML = `
    <img class="dialog-cover" src="assets/images/${service.imagen}" alt="Ejemplo de trabajo de ${service.especialidad}">
    <div class="dialog-details">
      <div class="dialog-profile"><img src="assets/images/${service.avatar}" alt=""><div><h2 id="dialog-name">${service.nombre}</h2><p>${service.especialidad}</p></div></div>
      <p class="dialog-rating"><span class="rating-star" aria-hidden="true">★</span> <strong>${service.puntuacion}</strong> · ${service.resenas} reseñas (datos de ejemplo)</p>
      <p>${service.descripcion}</p>
      <div class="dialog-tags">${service.categorias.map(cat => `<span class="service-tag">${cat}</span>`).join("")}</div>
      <div class="dialog-price"><div><strong>${formatPrice(service.precio)}</strong> <span>/ ${service.unidad}</span></div><button class="reset-button" type="button" data-request>Solicitar servicio</button></div>
      <div class="demo-note">Este es un perfil de demostración. Los datos, calificaciones y precios son ilustrativos. El envío de solicitudes se implementará con el backend.</div>
    </div>`;
  profileDialog.showModal();
});

const infoMessages = {
  "iniciar sesión": "La pantalla de inicio de sesión y la autenticación se agregarán en otra etapa, cuando se conecte el sistema con PHP y MySQL.",
  "registrarse": "El registro de clientes y profesionales se implementará en una siguiente entrega. Por ahora esta es la maqueta de la página de inicio.",
  "solicitar servicio": "Las solicitudes y contrataciones todavía no se almacenan. Esta funcionalidad se añadirá al desarrollar el backend."
};
function showInfo(type) {
  document.getElementById("info-message").textContent = infoMessages[type] || "Esta funcionalidad se añadirá en otra etapa.";
  if (profileDialog.open) profileDialog.close();
  infoDialog.showModal();
}
document.getElementById("profile-content").addEventListener("click", event => {});
document.getElementById("profile-close").addEventListener("click", () => profileDialog.close());
document.getElementById("info-close").addEventListener("click", () => infoDialog.close());
document.getElementById("info-confirm").addEventListener("click", () => infoDialog.close());
[profileDialog, infoDialog].forEach(dialog => dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
}));

// Menú responsivo.
const menuButton = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  mobileMenu.hidden = isOpen;
});
mobileMenu.querySelectorAll("a, button").forEach(element => element.addEventListener("click", () => {
  mobileMenu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
}));

renderServices();
