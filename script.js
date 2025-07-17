import { db } from "./firebase-config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const calendarDays = document.querySelector(".calendar-days");
const calendarMonth = document.querySelector(".calendar-month");
const prevBtn = document.querySelector(".calendar-prev");
const nextBtn = document.querySelector(".calendar-next");
const eventsList = document.querySelector(".events-list");

const eventos = [
  { date: "2025-01-07", title: "Feira de Artesanato", description: "Exposição local com produtos artesanais." },
  { date: "2025-01-14", title: "Show na Praça", description: "Banda local às 19h na praça central." },
  { date: "2025-01-23", title: "Cinema ao ar livre", description: "Filme gratuito na praça." },
];

let currentDate = new Date();

function generateCalendar(date) {
  calendarDays.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  calendarMonth.textContent = date.toLocaleString("pt-BR", { month: "long", year: "numeric" });

  const offset = (firstDay + 6) % 7;
  for (let day = 1; day <= lastDate; day++) {
    const span = document.createElement("span");
    span.classList.add("day"); // adicionei essa classe base

    // Cria a estrutura: número + bolinha (se tiver evento)
    const dayNumber = document.createElement("div");
    dayNumber.textContent = day;

    const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    if (eventos.some(evento => evento.date === fullDate)) {
      const dot = document.createElement("div");
      dot.classList.add("event-dot");
      span.appendChild(dayNumber);
      span.appendChild(dot);
    } else {
      span.appendChild(dayNumber);
    }

    span.addEventListener("click", () => {
      highlightDay(span);
      showEvents(fullDate);
    });

    calendarDays.appendChild(span);
  }
}

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate);
});
nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate);
});

function showEvents(dateString) {
  eventsList.innerHTML = "";
  const eventosDoDia = eventos.filter(evento => evento.date === dateString);

  if (eventosDoDia.length === 0) {
    eventsList.innerHTML = `
      <div class="no-event-message">
        <p>Não há eventos neste dia selecionado</p>
        <button class="view-all-btn" onclick="showAllEvents()">
          <i class="bi bi-arrow-repeat"></i> Ver todos os eventos
        </button>
      </div>
    `;
    // Remove destaque do dia selecionado
    document.querySelectorAll(".calendar-days span").forEach(span => {
      span.classList.remove("active");
    });
    return;
  }

  eventosDoDia.forEach(evento => {
    const card = document.createElement("div");
    card.classList.add("event-card");
    card.innerHTML = `<h4>${evento.title}</h4><p>${evento.description}</p>`;
    eventsList.appendChild(card);
  });
}


function highlightDay(selectedSpan) {
  document.querySelectorAll(".calendar-days span").forEach(span => {
    span.classList.remove("active");
  });
  selectedSpan.classList.add("active");
}

generateCalendar(currentDate);


function toggleEventDetails(headerElement) {
  const details = headerElement.nextElementSibling;
  const arrow = headerElement.querySelector(".arrow");

  details.classList.toggle("show");

  if (details.classList.contains("show")) {
    arrow.innerHTML = "&#9650;"; // seta para cima
  } else {
    arrow.innerHTML = "&#9660;"; // seta para baixo
  }
}


// document.getElementById("form-adicionar").addEventListener("submit", function (event) {
//   event.preventDefault();

//   // Aqui você pode adicionar a lógica de envio do formulário / salvar no banco de dados.

//   // Redireciona para a home
//   window.location.href = "home-admin.html";
// });

async function carregarHoteis() {
  const servicosRef = collection(db, "servicos");
  const q = query(servicosRef, where("tipo", "==", "hotel"), where("status", "==", true));
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");

  querySnapshot.forEach((doc) => {
    const hotel = doc.data();
    const hotelCard = document.createElement("section");
    hotelCard.classList.add("hotel-card");

    hotelCard.innerHTML = `
      <img src="${hotel.fotos[0]}" alt="${hotel.nome}">
      <div class="info">
        <h2>${hotel.nome}</h2>
        <p>${hotel.descricao}</p>
        <a href="especificao.html?hotelId=${doc.id}" class="btn"><span>Confira mais Informações</span></a>
      </div>
    `;

    container.appendChild(hotelCard);
  });
}

async function carregarRestaurante() {
  const servicosRef = collection(db, "servicos");
  const q = query(servicosRef, where("tipo", "==", "restaurante"), where("status", "==", true));
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");

  querySnapshot.forEach((doc) => {
    const restaurante = doc.data();
    const restauranteCard = document.createElement("section");
    restauranteCard.classList.add("hotel-card");

    restauranteCard.innerHTML = `
      <img src="${restaurante.fotos[0]}" alt="${restaurante.nome}">
      <div class="info">
        <h2>${restaurante.nome}</h2>
        <p>${restaurante.descricao}</p>
        <a href="especificao.html?hotelId=${doc.id}" class="btn"><span>Confira mais Informações</span></a>
      </div>
    `;

    container.appendChild(restauranteCard);
  });
}

async function carregarTransporte() {
  const servicosRef = collection(db, "transporte");
  const q = query(servicosRef, );
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");

  querySnapshot.forEach((doc) => {
    const transporte = doc.data();
    const transporteCard = document.createElement("section");
    transporteCard.classList.add("hotel-card");

    transporteCard.innerHTML = `
      <img src="${transporte.foto[0]}" alt="${transporte.nome}">
      <div class="info">
        <h2>${transporte.nome}</h2>
        <p>${transporte.descricao}</p>
        <a href="especificao.html?hotelId=${doc.id}" class="btn"><span>Confira mais Informações</span></a>
      </div>
    `;

    container.appendChild(transporteCard);
  });
}

async function carregarGuia() {
  const servicosRef = collection(db, "servicos");
  const q = query(servicosRef, where("tipo", "==", "guia"), where("status", "==", true));
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");

  querySnapshot.forEach((doc) => {
    const guia = doc.data();
    const guiaCard = document.createElement("section");
    guiaCard.classList.add("hotel-card");

    guiaCard.innerHTML = `
      <img src="${guia.fotos[0]}" alt="${guia.nome}">
      <div class="info">
        <h2>${guia.nome}</h2>
        <p>${guia.descricao}</p>
        <a href="especificao.html?hotelId=${doc.id}" class="btn"><span>Confira mais Informações</span></a>
      </div>
    `;

    container.appendChild(guiaCard);
  });
}


const page = document.body.dataset.page;

if (page === "home") {
  carregarHoteis();
}
if (page === "restaurante") {
  carregarRestaurante();
}
if (page === "transporte") {
  carregarTransporte();
}
if (page === "guia") {
  carregarGuia();
}

if (window.location.pathname.includes("chegar.html") || window.location.pathname.includes("fazer.html")) {
  const agenda = document.getElementById("agenda-cultural");
  if (agenda) {
    agenda.style.display = "none";
  }
}
