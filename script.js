"use strict";

// Datos de ejemplo
const servicios = [
  { id: 1, nombre: "Carlos M.", especialidad: "Jardinería y chapia", categorias: ["Chapear", "Jardinería"], puntuacion: "4.9", resenas: 32, descripcion: "Realizo trabajos de chapear, limpieza de terrenos, mantenimiento de jardines y áreas verdes.", precio: 15000, unidad: "por jornada", imagen: "chapear.jpg", avatar: "avatar-carlos.jpg" },
  { id: 2, nombre: "Luis R.", especialidad: "Pintura en general", categorias: ["Pintura", "Pintura de techos"], puntuacion: "4.8", resenas: 27, descripcion: "Pintura de interiores y exteriores, techos, paredes y acabados de calidad.", precio: 18000, unidad: "por día", imagen: "pintura.jpg", avatar: "avatar-luis.jpg" },
  { id: 3, nombre: "Andrés G.", especialidad: "Pintura de techos", categorias: ["Pintura", "Impermeabilización"], puntuacion: "4.7", resenas: 19, descripcion: "Pintura de techos, impermeabilización y mantenimiento en general.", precio: 20000, unidad: "por día", imagen: "viviendas.jpg", avatar: "avatar-andres.jpg" },
  { id: 4, nombre: "José A.", especialidad: "Plomería", categorias: ["Plomería", "Reparaciones"], puntuacion: "4.9", resenas: 42, descripcion: "Instalación y reparación de tuberías, lavamanos, sanitarios y más.", precio: 16000, unidad: "por servicio", imagen: "plomeria.jpg", avatar: "avatar-jose.jpg" },
  { id: 5, nombre: "Diego L.", especialidad: "Electricidad", categorias: ["Electricidad", "Instalaciones"], puntuacion: "4.8", resenas: 36, descripcion: "Instalación y reparación eléctrica, cableado, luminarias y tableros.", precio: 17000, unidad: "por servicio", imagen: "electricidad.jpg", avatar: "avatar-diego.jpg" },
  { id: 6, nombre: "María F.", especialidad: "Limpieza del hogar", categorias: ["Limpieza", "Hogar"], puntuacion: "4.9", resenas: 21, descripcion: "Limpieza profunda y mantenimiento de casas, apartamentos y oficinas.", precio: 12000, unidad: "por servicio", imagen: "limpieza.jpg", avatar: "avatar-maria.jpg" },
  { id: 7, nombre: "Ricardo S.", especialidad: "Carpintería", categorias: ["Carpintería", "Muebles"], puntuacion: "4.7", resenas: 15, descripcion: "Fabricación y reparación de muebles, puertas, repisas y más.", precio: 22000, unidad: "por servicio", imagen: "carpinteria.jpg", avatar: "avatar-ricardo.jpg" },
  { id: 8, nombre: "Kevin P.", especialidad: "Hombre de mantenimiento", categorias: ["Otros", "Mantenimiento"], puntuacion: "4.6", resenas: 12, descripcion: "Pequeñas reparaciones, instalación de repisas, montaje de muebles y más.", precio: 14000, unidad: "por servicio", imagen: "mantenimiento.jpg", avatar: "avatar-kevin.jpg" }
];

const grid = document.getElementById("services-grid");
const searchInput = document.getElementById("search-input");
const counter = document.getElementById("results-count");
const activeFilter = document.getElementById("active-filter");
const filterLabel = document.getElementById("filter-label");
const emptyState = document.getElementById("empty-state");
const categoryButtons = [...document.querySelectorAll(".category-card")];
const profileModal = document.getElementById("profile-modal");
let selectedCategory = "";

function normalize(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
function formatPrice(amount) {
  return "₡" + new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(amount);
}

function renderCard(servicio) {
  return `
    <div class="col-12 col-sm-6 col-xl-3">
      <article class="card service-card h-100">
        <img class="card-img-top service-image" src="assets/images/${servicio.imagen}" alt="Trabajo de ${servicio.especialidad.toLowerCase()}" loading="lazy">
        <div class="card-body service-body d-flex flex-column">
          <div class="profile-row d-flex align-items-center">
            <img class="profile-avatar" src="assets/images/${servicio.avatar}" alt="" loading="lazy">
            <div><h3 class="profile-name">${servicio.nombre}</h3><p class="profile-specialty">${servicio.especialidad}</p></div>
          </div>
          <p class="rating"><span class="rating-star" aria-hidden="true">★</span><span class="rating-number">${servicio.puntuacion}</span> <span class="rating-total">(${servicio.resenas} reseñas)</span></p>
          <p class="card-description">${servicio.descripcion}</p>
          <div class="tag-row d-flex flex-wrap mt-auto">${servicio.categorias.map(cat => `<span class="badge rounded-pill service-tag">${cat}</span>`).join("")}</div>
          <div class="card-bottom d-flex justify-content-between align-items-center flex-wrap">
            <div class="price"><strong>${formatPrice(servicio.precio)}</strong><span> / ${servicio.unidad}</span></div>
            <button class="btn btn-navy" type="button" data-bs-toggle="modal" data-bs-target="#profile-modal" data-profile="${servicio.id}" aria-label="Ver perfil de ${servicio.nombre}">Ver perfil</button>
          </div>
        </div>
      </article>
    </div>`;
}

function renderServices() {
  const keyword = normalize(searchInput.value);
  const results = servicios.filter(servicio => {
    const categoryMatches = !selectedCategory || servicio.categorias.includes(selectedCategory);
    const searchable = normalize([servicio.nombre, servicio.especialidad, servicio.descripcion, ...servicio.categorias].join(" "));
    return categoryMatches && (!keyword || searchable.includes(keyword));
  });

  grid.innerHTML = results.map(renderCard).join("");
  grid.hidden = results.length === 0;
  emptyState.hidden = results.length !== 0;
  counter.textContent = (selectedCategory || keyword) ? `${results.length} ${results.length === 1 ? "servicio encontrado" : "servicios encontrados"}` : "";

  const labels = [];
  if (selectedCategory) labels.push(selectedCategory);
  if (keyword) labels.push(`“${searchInput.value.trim()}”`);
  activeFilter.hidden = labels.length === 0;
  filterLabel.textContent = labels.join(" · ");
  categoryButtons.forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.category === selectedCategory));
  });
}

function resetFilters() {
  selectedCategory = "";
  searchInput.value = "";
  renderServices();
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = selectedCategory === button.dataset.category ? "" : button.dataset.category;
    renderServices();
    document.getElementById("profesionales").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
searchInput.addEventListener("input", renderServices);
document.getElementById("search-form").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("profesionales").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.getElementById("show-all").addEventListener("click", resetFilters);
document.getElementById("clear-filter").addEventListener("click", resetFilters);
document.getElementById("empty-reset").addEventListener("click", resetFilters);


profileModal.addEventListener("show.bs.modal", event => {
  const button = event.relatedTarget;
  const service = servicios.find(item => item.id === Number(button?.dataset.profile));
  if (!service) {
    event.preventDefault();
    return;
  }
  document.getElementById("profile-content").innerHTML = `
    <img class="dialog-cover" src="assets/images/${service.imagen}" alt="Trabajo de ${service.especialidad}">
    <div class="dialog-details">
      <div class="dialog-profile"><img src="assets/images/${service.avatar}" alt=""><div><h2 id="profile-modal-title">${service.nombre}</h2><p>${service.especialidad}</p></div></div>
      <p class="dialog-rating"><span class="rating-star" aria-hidden="true">★</span> <strong>${service.puntuacion}</strong> · ${service.resenas} reseñas</p>
      <p>${service.descripcion}</p>
      <div class="dialog-tags">${service.categorias.map(cat => `<span class="badge rounded-pill service-tag">${cat}</span>`).join("")}</div>
      <div class="dialog-price"><strong>${formatPrice(service.precio)}</strong> <span>/ ${service.unidad}</span></div>
    </div>`;
});


renderServices();
