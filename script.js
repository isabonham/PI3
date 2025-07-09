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
