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

    // Tratamento para garantir que a imagem exista
    hotelCard.innerHTML = `
            <img src="${hotel.fotos && hotel.fotos.length > 0 ? hotel.fotos[0] : 'imgs/placeholder.png'}" alt="${hotel.nome}">
            <div class="info">
                <h2>${hotel.nome}</h2>
                <p>${hotel.descricao}</p>
                <a href="especificao.html?servicoId=${doc.id}" class="btn"><span>Confira mais Informações</span></a>
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

    restauranteCard.innerHTML = `
            <img src="${restaurante.fotos && restaurante.fotos.length > 0 ? restaurante.fotos[0] : 'imgs/placeholder.png'}" alt="${restaurante.nome}">
            <div class="info">
                <h2>${restaurante.nome}</h2>
                <p>${restaurante.descricao}</p>
                <a href="especificao.html?servicoId=${doc.id}" class="btn"><span>Confira mais Informações</span></a>
            </div>
        `;
    container.appendChild(restauranteCard);
  });
}

async function carregarTransporte() {
  const servicosRef = collection(db, "transporte");
  // Filtra por status "ativo" (consistente com o admin)
  const q = query(servicosRef, where("status", "==", "ativo"));
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");
  container.innerHTML = ''; // Limpa o container

  querySnapshot.forEach((doc) => {
    const transporte = doc.data();
    const transporteCard = document.createElement("section");
    transporteCard.classList.add("hotel-card"); // Pode ser 'transporte-card' para CSS específico

    transporteCard.innerHTML = `
            <img src="${transporte.fotos && transporte.fotos.length > 0 ? transporte.fotos[0] : 'imgs/placeholder.png'}" alt="${transporte.nome}">
            <div class="info">
                <h2>${transporte.nome}</h2>
                <p>${transporte.descricao}</p>
                <a href="especificao.html?servicoId=${doc.id}" class="btn"><span>Confira mais Informações</span></a>
            </div>
        `;
    container.appendChild(transporteCard);
  });
}

async function carregarGuia() {
  const servicosRef = collection(db, "servicos");
  const q = query(servicosRef, where("tipo", "==", "guia"), where("status", "==", "ativo"));
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");
  container.innerHTML = ''; // Limpa o container

  querySnapshot.forEach((doc) => {
    const guia = doc.data();
    const guiaCard = document.createElement("section");
    guiaCard.classList.add("hotel-card"); // Pode ser 'guia-card' para CSS específico

    guiaCard.innerHTML = `
            <img src="${guia.fotos && guia.fotos.length > 0 ? guia.fotos[0] : 'imgs/placeholder.png'}" alt="${guia.nome}">
            <div class="info">
                <h2>${guia.nome}</h2>
                <p>${guia.descricao}</p>
                <a href="especificao.html?servicoId=${doc.id}" class="btn"><span>Confira mais Informações</span></a> 
            </div>
        `;
    container.appendChild(guiaCard);
  });
}

// --- LÓGICA DE CARREGAMENTO DINÂMICO DOS SERVIÇOS ---

// Essas chamadas de função serão executadas com base na página atual
if (page === "home") {
  carregarHoteis();
} else if (page === "restaurante") {
  carregarRestaurante();
} else if (page === "transporte") {
  carregarTransporte();
} else if (page === "guia") {
  carregarGuia();
}

// --- BLOCO DO CALENDÁRIO (SÓ EXECUTA NA PÁGINA 'HOME') ---
if (page === "home") {
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
    // getDay() retorna 0 para domingo, 1 para segunda... ajustado para segunda como primeiro dia
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    calendarMonth.textContent = date.toLocaleString("pt-BR", { month: "long", year: "numeric" });

    // Calcula o offset para que a semana comece na segunda-feira (0-6)
    const offset = (firstDay + 6) % 7;
    for (let i = 0; i < offset; i++) {
      const emptySpan = document.createElement("span");
      calendarDays.appendChild(emptySpan); // Adiciona espaços vazios para alinhar
    }

    for (let day = 1; day <= lastDate; day++) {
      const span = document.createElement("span");
      span.classList.add("day");

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
                    <button class="view-all-btn">
                        <i class="bi bi-arrow-repeat"></i> Ver todos os eventos
                    </button>
                </div>
            `;
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

  generateCalendar(currentDate); // Chamada inicial para gerar o calendário
}
// --- FIM DO BLOCO DO CALENDÁRIO ---


// --- FUNÇÕES GERAIS (INDEPENDENTES DA PÁGINA) ---

// Função para expandir/colapsar detalhes de eventos (usado no HTML estático do calendário)
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

// Lógica de formulário para adicionar (se estiver usando no usuário, senão pode ser removida)
// É mais provável que isso esteja no script-admin.js
/*
document.getElementById("form-adicionar").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = e.target[0].value;
    const descricao = e.target[1].value;
    const localizacao = e.target[2].value;
    const fotos = document.getElementById("foto").files;

    try {
        const fotoUrls = [];

        for (let i = 0; i < fotos.length; i++) {
            const foto = fotos[i];
            const storageRef = ref(storage, `hoteis/${Date.now()}-${foto.name}`);
            await uploadBytes(storageRef, foto);
            const url = await getDownloadURL(storageRef);
            fotoUrls.push(url);
        }

        await addDoc(collection(db, "servicos"), {
            nome,
            descricao,
            localizacao,
            fotos: fotoUrls,
            tipo: "hotel",
            createdAt: new Date(),
            status: true // Adicionado status padrão para true
        });

        alert("Hotel salvo com sucesso!");
        window.location.href = "home-admin.html";
    } catch (error) {
        console.error("Erro ao adicionar hotel:", error);
        alert("Erro ao salvar hotel.");
    }
});
*/