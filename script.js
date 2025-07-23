import { db, storage } from "./firebase-config.js";
import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";

// Identifica a página atual usando o atributo data-page no <body>
const page = document.body.dataset.page;

// --- FUNÇÕES DE CARREGAMENTO DE SERVIÇOS (COM TRATAMENTO DE IMAGENS E STATUS) ---

async function carregarHoteis() {
  const servicosRef = collection(db, "servicos");
  // Filtra por tipo "hotel" E status "true" (visível para o usuário)
  const q = query(servicosRef, where("tipo", "==", "hotel"), where("status", "==", true));
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");
  container.innerHTML = ''; // Limpa o container antes de adicionar novos cards

  querySnapshot.forEach((doc) => {
    const hotel = doc.data();
    const hotelCard = document.createElement("section");
    hotelCard.classList.add("hotel-card");

    // Prepara o link do WhatsApp usando o campo 'contato'
    const contato = hotel.contato || ''; // Pega o valor do campo 'contato', ou string vazia se não existir
    // Remove caracteres não-numéricos e adiciona o código do Brasil (55)
    const whatsappLink = contato ? `https://wa.me/55${contato.replace(/\D/g, '')}` : '#';
    const buttonText = contato ? `Ir para o contato` : `Informações Indisponíveis`;
    const targetAttribute = contato ? `target="_blank"` : ``; // Abre em nova aba se tiver link

    hotelCard.innerHTML = `
            <img src="${hotel.fotos && hotel.fotos.length > 0 ? hotel.fotos[0] : 'imgs/placeholder.png'}" alt="${hotel.nome}">
            <div class="info">
                <h2>${hotel.nome}</h2>
                <p>${hotel.descricao}</p>
                <a href="${whatsappLink}" ${targetAttribute} class="btn whatsapp-btn">
                    <span>
                        ${buttonText}
                    </span>
                </a>
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
  container.innerHTML = ''; // Limpa o container

  querySnapshot.forEach((doc) => {
    const restaurante = doc.data();
    const restauranteCard = document.createElement("section");
    restauranteCard.classList.add("hotel-card"); // Pode ser 'restaurante-card' para CSS específico

    // Prepara o link do WhatsApp usando o campo 'contato'
    const contato = restaurante.contato || '';
    const whatsappLink = contato ? `https://wa.me/55${contato.replace(/\D/g, '')}` : '#';
    const buttonText = contato ? `Ir para o contato` : `Informações Indisponíveis`;
    const targetAttribute = contato ? `target="_blank"` : ``;

    restauranteCard.innerHTML = `
            <img src="${restaurante.fotos && restaurante.fotos.length > 0 ? restaurante.fotos[0] : 'imgs/placeholder.png'}" alt="${restaurante.nome}">
            <div class="info">
                <h2>${restaurante.nome}</h2>
                <p>${restaurante.descricao}</p>
                <a href="${whatsappLink}" ${targetAttribute} class="btn whatsapp-btn">
                    <span>
                        ${buttonText}
                    </span>
                </a>
            </div>
        `;
    container.appendChild(restauranteCard);
  });
}

async function carregarTransporte() {
  const servicosRef = collection(db, "transporte"); // Assumindo 'transporte' é uma coleção separada
  // Filtra por status "ativo" (consistente com o admin)
  const q = query(servicosRef, where("status", "==", "ativo"));
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");
  container.innerHTML = ''; // Limpa o container

  querySnapshot.forEach((doc) => {
    const transporte = doc.data();
    const transporteCard = document.createElement("section");
    transporteCard.classList.add("hotel-card"); // Pode ser 'transporte-card' para CSS específico

    // Prepara o link do WhatsApp usando o campo 'contato'
    const contato = transporte.contato || '';
    const whatsappLink = contato ? `https://wa.me/55${contato.replace(/\D/g, '')}` : '#';
    const buttonText = contato ? `Ir para o contato` : `Informações Indisponíveis`;
    const targetAttribute = contato ? `target="_blank"` : ``;

    transporteCard.innerHTML = `
            <img src="${transporte.fotos && transporte.fotos.length > 0 ? transporte.fotos[0] : 'imgs/placeholder.png'}" alt="${transporte.nome}">
            <div class="info">
                <h2>${transporte.nome}</h2>
                <p>${transporte.descricao}</p>
                <a href="${whatsappLink}" ${targetAttribute} class="btn whatsapp-btn">
                    <span>
                        ${buttonText}
                    </span>
                </a>
            </div>
        `;
    container.appendChild(transporteCard);
  });
}

async function carregarGuia() {
  const servicosRef = collection(db, "servicos"); // Assumindo guias estão na coleção "servicos"
  const q = query(servicosRef, where("tipo", "==", "guia"), where("status", "==", "ativo"));
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");
  container.innerHTML = ''; // Limpa o container

  querySnapshot.forEach((doc) => {
    const guia = doc.data();
    const guiaCard = document.createElement("section");
    guiaCard.classList.add("hotel-card"); // Pode ser 'guia-card' para CSS específico

    // Prepara o link do WhatsApp usando o campo 'contato'
    const contato = guia.contato || '';
    const whatsappLink = contato ? `https://wa.me/55${contato.replace(/\D/g, '')}` : '#';
    const buttonText = contato ? `Ir para o contato` : `Informações Indisponíveis`;
    const targetAttribute = contato ? `target="_blank"` : ``;

    guiaCard.innerHTML = `
            <img src="${guia.fotos && guia.fotos.length > 0 ? guia.fotos[0] : 'imgs/placeholder.png'}" alt="${guia.nome}">
            <div class="info">
                <h2>${guia.nome}</h2>
                <p>${guia.descricao}</p>
                <a href="${whatsappLink}" ${targetAttribute} class="btn whatsapp-btn">
                    <span>
                        ${buttonText}
                    </span>
                </a>
            </div>
        `;
    container.appendChild(guiaCard);
  });
}


// --- LÓGICA DE CARREGAMENTO DINÂMICO DOS SERVIÇOS ---

// Essas chamadas de função serão executadas com base na página atual
document.addEventListener('DOMContentLoaded', () => {
    if (page === "home") {
        carregarHoteis();
    } else if (page === "restaurante") {
        carregarRestaurante();
    } else if (page === "transporte") { // Verifique se esta página tem data-page="transporte"
        carregarTransporte();
    } else if (page === "guia") { // Verifique se esta página tem data-page="guia"
        carregarGuia();
    }
});


// --- BLOCO DO CALENDÁRIO (SÓ EXECUTA NA PÁGINA 'HOME' E 'COMER') ---
if (page === "home" || page === "comer") {
    const calendarDays = document.querySelector(".calendar-days");
    const calendarMonth = document.querySelector(".calendar-month");
    const prevBtn = document.querySelector(".calendar-prev");
    const nextBtn = document.querySelector(".calendar-next");
    const eventsList = document.querySelector(".events-list");

    let allEvents = [];
    let selectedDayInCalendar = null;

    async function loadEventsFromFirestore() {
        const eventosRef = collection(db, "eventos");
        const q = query(eventosRef);
        const querySnapshot = await getDocs(q);

        allEvents = [];
        querySnapshot.forEach((doc) => {
            const eventData = doc.data();
            allEvents.push({
                id: doc.id,
                date: eventData.data,
                title: eventData.nome,
                description: eventData.descricao,
                local: eventData.local,
                horario: eventData.horario
            });
        });

        allEvents.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.horario || '00:00'}`);
            const dateB = new Date(`${b.date}T${b.horario || '00:00'}`);
            return dateA - dateB;
        });

        console.log("Eventos carregados do Firestore:", allEvents);
        generateCalendar(currentDate);
        showEvents(null);
    }

    let currentDate = new Date();

    function generateCalendar(date) {
        calendarDays.innerHTML = "";
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay(); // 0 (Domingo) a 6 (Sábado)
        const lastDate = new Date(year, month + 1, 0).getDate();

        calendarMonth.textContent = date.toLocaleString("pt-BR", { month: "long", year: "numeric" });

        const offset = (firstDay + 6) % 7;

        for (let i = 0; i < offset; i++) {
            const emptySpan = document.createElement("span");
            calendarDays.appendChild(emptySpan);
        }

        for (let day = 1; day <= lastDate; day++) {
            const span = document.createElement("span");
            span.classList.add("day");

            const dayNumber = document.createElement("div");
            dayNumber.textContent = day;

            const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            if (allEvents.some(evento => evento.date === fullDate)) {
                const dot = document.createElement("div");
                dot.classList.add("event-dot");
                span.appendChild(dayNumber);
                span.appendChild(dot);
            } else {
                span.appendChild(dayNumber);
            }

            const today = new Date();
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                span.classList.add("current-day");
            }

            span.addEventListener("click", () => {
                highlightDay(span);
                selectedDayInCalendar = fullDate;
                showEvents(fullDate);
            });

            calendarDays.appendChild(span);
        }
    }

    prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
        showEvents(null);
    });
    nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
        showEvents(null);
    });

    function showEvents(dateString) {
        eventsList.innerHTML = "";

        let eventosParaExibir = [];
        if (dateString) {
            eventosParaExibir = allEvents.filter(evento => evento.date === dateString);
        } else {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            eventosParaExibir = allEvents.filter(evento => {
                const eventDate = new Date(evento.date);
                return eventDate.getFullYear() === year && eventDate.getMonth() === month;
            });
        }

        if (eventosParaExibir.length === 0) {
            eventsList.innerHTML = `
                <div class="no-event-message">
                    <p>Não há eventos ${dateString ? `neste dia (${new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR')})` : 'neste mês'} </p>
                    <button class="view-all-btn">
                        <i class="bi bi-arrow-repeat"></i> Ver todos os eventos do mês
                    </button>
                </div>
            `;
            document.querySelector(".view-all-btn").addEventListener("click", () => {
                showEvents(null);
                highlightDay(null);
            });
            return;
        }

        eventosParaExibir.forEach(evento => {
            const card = document.createElement("div");
            card.classList.add("event-card");

            const eventDate = new Date(evento.date + 'T00:00:00');
            const formattedDate = eventDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

            const eventHeader = document.createElement("div");
            eventHeader.classList.add("event-header");
            eventHeader.innerHTML = `
                <h4>${evento.title} - ${formattedDate}</h4>
                <span class="arrow">&#9660;</span>
            `;
            const eventDetails = document.createElement("div");
            eventDetails.classList.add("event-details");
            eventDetails.innerHTML = `
                <p><strong>Local:</strong> ${evento.local || 'Não informado'}</p>
                <p><strong>Horário:</strong> ${evento.horario || 'Não informado'}</p>
                <p><strong>Descrição:</strong> ${evento.description || 'Nenhuma descrição disponível.'}</p>
            `;
            eventHeader.addEventListener("click", () => {
                toggleEventDetails(eventHeader);
            });

            card.appendChild(eventHeader);
            card.appendChild(eventDetails);
            eventsList.appendChild(card);
        });
    }

    function highlightDay(selectedSpan) {
        document.querySelectorAll(".calendar-days span").forEach(span => {
            span.classList.remove("active");
        });
        if (selectedSpan) {
            selectedSpan.classList.add("active");
        }
    }

    loadEventsFromFirestore().then(() => {
        generateCalendar(currentDate);
        showEvents(null);
    });
}
// --- FIM DO BLOCO DO CALENDÁRIO ---


// --- FUNÇÕES GERAIS (INDEPENDENTES DA PÁGINA) ---

function toggleEventDetails(headerElement) {
  const details = headerElement.nextElementSibling;
  const arrow = headerElement.querySelector(".arrow");

  details.classList.toggle("show");

  if (details.classList.contains("show")) {
    arrow.innerHTML = "&#9650;";
  } else {
    arrow.innerHTML = "&#9660;";
  }
}