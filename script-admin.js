import { db } from "./firebase-config.js";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

async function carregarHoteis() {
  const servicosRef = collection(db, "servicos");
  const q = query(servicosRef, where("tipo", "==", "hotel"));
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");
  // Limpa o container antes de adicionar novos cards para evitar duplicatas
  container.innerHTML = '';

  querySnapshot.forEach((doc) => {
    const hotel = doc.data();
    const hotelCard = document.createElement("section");
    hotelCard.classList.add("hotel-card");

    // Determina o texto do botão e a classe com base no status atual do hotel
    // Se hotel.status for true, o texto é 'Desativar', senão 'Ativar'.
    const statusBtnText = hotel.status === true ? 'Desativar' : 'Ativar';
    // Ambos os botões (Ativar/Desativar) usarão a mesma classe CSS 'desativar'
    const statusBtnClass = 'desativar';
    const colecaoServico = 'servicos'; // Hotéis estão na coleção 'servicos'

    hotelCard.innerHTML = `
            <img src="${hotel.fotos && hotel.fotos.length > 0 ? hotel.fotos[0] : 'imgs/placeholder.png'}" alt="${hotel.nome}">
            <div class="info">
                <h2>${hotel.nome}</h2>
                <p>${hotel.descricao}</p>
                <p>Status: ${hotel.status === true ? 'Ativo' : 'Inativo'}</p> <div class="acoes">
                    <button class="editar" onclick="window.location.href='editar-hotel.html?id=${doc.id}'">Editar</button>
                    <button class="${statusBtnClass}" onclick="alternarStatusServicoBooleano('${doc.id}', '${colecaoServico}', ${hotel.status})">${statusBtnText}</button>
                    <button class="deletar" onclick="deletarServico('${doc.id}', '${colecaoServico}')">Deletar</button> 
                </div>
            </div>
        `;

    container.appendChild(hotelCard);
  });
}

async function carregarRestaurante() {
  const servicosRef = collection(db, "servicos");
  const q = query(servicosRef, where("tipo", "==", "restaurante")); // Filtra por tipo "restaurante"
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");
  // Limpa o container antes de adicionar novos cards para evitar duplicatas
  container.innerHTML = '';

  querySnapshot.forEach((doc) => {
    const restaurante = doc.data();
    const restauranteCard = document.createElement("section");
    restauranteCard.classList.add("hotel-card"); // Você pode querer uma classe como "restaurante-card" aqui para estilização específica

    // Determina o texto do botão e a classe com base no status atual do restaurante
    // Se restaurante.status for true, o texto é 'Desativar', senão 'Ativar'.
    const statusBtnText = restaurante.status === true ? 'Desativar' : 'Ativar';
    // Ambos os botões (Ativar/Desativar) usarão a mesma classe CSS 'desativar'
    const statusBtnClass = 'desativar';
    const colecaoServico = 'servicos'; // Restaurantes estão na coleção 'servicos'

    restauranteCard.innerHTML = `
            <img src="${restaurante.fotos && restaurante.fotos.length > 0 ? restaurante.fotos[0] : 'imgs/placeholder.png'}" alt="${restaurante.nome}">
            <div class="info">
                <h2>${restaurante.nome}</h2>
                <p>${restaurante.descricao}</p>
                <p>Status: ${restaurante.status === true ? 'Ativo' : 'Inativo'}</p> <div class="acoes">
                    <button class="editar" onclick="window.location.href='editar-restaurante.html?id=${doc.id}'">Editar</button>
                    <button class="${statusBtnClass}" onclick="alternarStatusServicoBooleano('${doc.id}', '${colecaoServico}', ${restaurante.status})">${statusBtnText}</button>
                    <button class="deletar" onclick="deletarServico('${doc.id}', '${colecaoServico}')">Deletar</button>
                </div>
            </div>
        `;

    container.appendChild(restauranteCard);
  });
}

async function carregarTransporte() {
  const servicosRef = collection(db, "transporte");
  const q = query(servicosRef); // Pega todos os documentos da coleção "transporte"
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");
  // Limpa o container antes de adicionar novos cards para evitar duplicatas
  container.innerHTML = '';

  querySnapshot.forEach((doc) => {
    const transporte = doc.data();
    const transporteCard = document.createElement("section");
    transporteCard.classList.add("hotel-card"); // Você pode querer uma classe como "transporte-card" aqui para estilização específica

    // Determina o texto do botão e a classe com base no status atual do transporte
    const statusBtnText = transporte.status === 'ativo' ? 'Desativar' : 'Ativar';
    const statusBtnClass = 'desativar';
    const colecaoTransporte = 'transporte'; // Nome da coleção para transportes

    transporteCard.innerHTML = `
            <img src="${transporte.fotos && transporte.fotos.length > 0 ? transporte.fotos[0] : 'imgs/placeholder.png'}" alt="${transporte.nome}">
            <div class="info">
                <h2>${transporte.nome}</h2>
                <p>${transporte.descricao}</p>
                <p>Status: ${transporte.status === 'ativo' ? 'Ativo' : 'Inativo'}</p> <div class="acoes">
                    <button class="editar" onclick="window.location.href='editar-transporte.html?id=${doc.id}'">Editar</button>
                    <button class="${statusBtnClass}" onclick="alternarStatusServico('${doc.id}', '${colecaoTransporte}', '${transporte.status}')">${statusBtnText}</button>
                    <button class="deletar" onclick="deletarServico('${doc.id}', '${colecaoTransporte}')">Deletar</button>
                </div>
            </div>
        `;

    container.appendChild(transporteCard);
  });
}

async function carregarGuia() {
  const servicosRef = collection(db, "servicos");
  const q = query(servicosRef, where("tipo", "==", "guia")); // Filtra por tipo "guia"
  const querySnapshot = await getDocs(q);

  const container = document.querySelector(".content");
  container.innerHTML = '';

  querySnapshot.forEach((doc) => {
    const guia = doc.data();
    const guiaCard = document.createElement("section");
    guiaCard.classList.add("hotel-card"); // Você pode querer uma classe como "guia-card" aqui para estilização específica

    // Determina o texto do botão e a classe com base no status atual do guia
    const statusBtnText = guia.status === 'ativo' ? 'Desativar' : 'Ativar';
    // Ambos os botões (Ativar/Desativar) usarão a mesma classe CSS 'desativar'
    const statusBtnClass = 'desativar';
    const colecaoServico = 'servicos'; // Nome da coleção para guias (estão na coleção 'servicos')

    guiaCard.innerHTML = `
            <img src="${guia.fotos && guia.fotos.length > 0 ? guia.fotos[0] : 'imgs/placeholder.png'}" alt="${guia.nome}">
            <div class="info">
                <h2>${guia.nome}</h2>
                <p>${guia.descricao}</p>
                <p>Status: ${guia.status === 'ativo' ? 'Ativo' : 'Inativo'}</p> <div class="acoes">
                    <button class="editar" onclick="window.location.href='editar-guia.html?id=${doc.id}'">Editar</button>
                    <button class="${statusBtnClass}" onclick="alternarStatusServico('${doc.id}', '${colecaoServico}', '${guia.status}')">${statusBtnText}</button>
                    <button class="deletar" onclick="deletarServico('${doc.id}', '${colecaoServico}')">Deletar</button>
                </div>
            </div>
        `;

    container.appendChild(guiaCard);
  });
}



const page = document.body.dataset.page;

if (page === "home-admin") {
  carregarHoteis();
}
if (page === "restaurante-admin") {
  carregarRestaurante();
}
if (page === "transporte-admin") {
  carregarTransporte();
}
if (page === "guia-admin") {
  carregarGuia();
}


// Função global para deletar um serviço
// Agora recebe o ID do documento e o nome da coleção
window.deletarServico = async function (servicoId, colecaoNome) {
  const confirmar = confirm(`Tem certeza que deseja deletar este serviço da coleção ${colecaoNome}? Esta ação é irreversível!`);

  if (confirmar) {
    try {
      console.log(`Tentando deletar documento ${servicoId} da coleção ${colecaoNome}`);
      const docRefToDelete = doc(db, colecaoNome, servicoId);
      await deleteDoc(docRefToDelete);

      alert("Serviço deletado com sucesso!");


      const botaoDeletar = document.querySelector(`button[onclick*="deletarServico('${servicoId}', '${colecaoNome}')"]`);
      if (botaoDeletar) {
        const cardParaRemover = botaoDeletar.closest(".hotel-card");
        if (cardParaRemover) {
          cardParaRemover.remove();
        }
      }

    } catch (error) {
      console.error("Erro ao deletar serviço:", error);
      alert("Erro ao deletar serviço. Verifique o console para mais detalhes.");
    }
  }
};

window.alternarStatusServico = async function (servicoId, colecaoNome, currentStatus) {
  const novoStatus = currentStatus === 'ativo' ? 'inativo' : 'ativo';
  const acao = novoStatus === 'ativo' || "true" ? 'ativar' : 'desativar';

  const confirmar = confirm(`Tem certeza que deseja ${acao} este serviço?`);

  if (confirmar) {
    try {
      const docRefToUpdate = doc(db, colecaoNome, servicoId);
      await updateDoc(docRefToUpdate, {
        status: novoStatus
      });

      alert(`Serviço ${acao} com sucesso!`);

      // Recarrega a página para atualizar os cards e o estado do botão
      window.location.reload();

    } catch (error) {
      console.error(`Erro ao ${acao} serviço:`, error);
      alert(`Erro ao ${acao} serviço. Verifique o console para mais detalhes.`);
    }
  }
};

// Adicione esta função ao seu script-admin.js, talvez logo abaixo de 'alternarStatusServico'
window.alternarStatusServicoBooleano = async function (servicoId, colecaoNome, currentStatus) {
  // Se o status atual é true, o novo será false. Se for false, o novo será true.
  const novoStatus = !currentStatus;
  const acao = novoStatus === true ? 'ativar' : 'desativar'

  const confirmar = confirm(`Tem certeza que deseja ${acao} este serviço?`);

  if (confirmar) {
    try {
      const docRefToUpdate = doc(db, colecaoNome, servicoId);
      await updateDoc(docRefToUpdate, {
        status: novoStatus
      });

      alert(`Serviço ${acao} com sucesso!`);

      // Recarrega a página para atualizar os cards e o estado do botão
      window.location.reload();

    } catch (error) {
      console.error(`Erro ao ${acao} serviço:`, error);
      alert(`Erro ao ${acao} serviço. Verifique o console para mais detalhes.`);
    }
  }
};




// --- NOVO BLOCO DO CALENDÁRIO PARA home-admin.html (COPIADO E ADAPTADO DO script.js) ---
// Note que este bloco só será executado se o body tiver data-page="home-admin"
const calendarSection = document.querySelector(".calendar-section");
if (page === "home-admin" || page === "comer-admin" || page === "restaurante-admin") { // <--- Alterado de "home" para "home-admin"
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

    console.log("Eventos carregados do Firestore (Admin):", allEvents);
    generateCalendar(currentDate);
    showEvents(null);
  }

  let currentDate = new Date();

  function generateCalendar(date) {
    calendarDays.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
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

  // Modificação da função showEvents para gerar os dropdowns
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

      // Crie os elementos individualmente para poder adicionar o listener
      const eventHeader = document.createElement("div");
      eventHeader.classList.add("event-header");
      eventHeader.innerHTML = `
        <div class="event-info"> <h4>${evento.title}</h4>
          <p>${formattedDate}</p>
        </div>
        <span class="arrow">&#9660;</span>
      `;

      const eventDetails = document.createElement("div");
      eventDetails.classList.add("event-details");
      eventDetails.innerHTML = `
        <p><strong>Local:</strong> ${evento.local || 'Não informado'}</p>
        <p><strong>Horário:</strong> ${evento.horario || 'Não informado'}</p>
        <p><strong>Descrição:</strong> ${evento.description || 'Nenhuma descrição disponível.'}</p>
        <div class="acoes-evento"> <button class="editar-evento" data-id="${evento.id}"><i class="bi bi-pencil"></i></button>
          <button class="deletar-evento" data-id="${evento.id}"><i class="bi bi-trash"></i></button>
        </div>
      `;

      // Anexe a função toggleEventDetails ao click do cabeçalho
      eventHeader.addEventListener("click", () => {
        toggleEventDetails(eventHeader);
      });

      card.appendChild(eventHeader);
      card.appendChild(eventDetails);
      eventsList.appendChild(card);
    });

    attachEventButtonListeners();
  }



  function highlightDay(selectedSpan) {
    document.querySelectorAll(".calendar-days span").forEach(span => {
      span.classList.remove("active");
    });
    if (selectedSpan) {
      selectedSpan.classList.add("active");
    }
  }

  // Garanta que toggleEventDetails esteja acessível ou defina-a dentro deste bloco se preferir
  // Ou, se já está globalmente, remova a duplicação.
  // function toggleEventDetails(headerElement) { ... } // Se não global, defina aqui.


  loadEventsFromFirestore().then(() => {
    generateCalendar(currentDate);
    showEvents(null);
  });
}
// --- FIM DO BLOCO DO CALENDÁRIO PARA home-admin.html ---

// Função para expandir/colapsar detalhes de eventos (certifique-se que esta função está globalmente acessível ou dentro do bloco do calendário)
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

// Função para editar evento
window.editarEvento = async function (idEvento) {
  // Redireciona para a página de edição de evento, passando o ID na URL
  window.location.href = `editar-evento.html?id=${idEvento}`;
};

// Função para deletar evento (usando lógica similar à de deletarServico)
window.deletarEvento = async function (idEvento) {
  const confirmar = confirm("Tem certeza que deseja deletar este evento? Esta ação é irreversível!");

  if (confirmar) {
    try {
      console.log(`Tentando deletar evento ${idEvento} da coleção 'eventos'`);
      const docRefToDelete = doc(db, "eventos", idEvento); // 'eventos' é o nome da sua coleção de eventos
      await deleteDoc(docRefToDelete);

      alert("Evento deletado com sucesso!");

      // Opcional: Remover o card do DOM sem recarregar a página
      // Encontra o botão que foi clicado e sobe até o event-card pai para removê-lo
      const btnDeletar = document.querySelector(`.deletar-evento[data-id="${idEvento}"]`);
      if (btnDeletar) {
        const eventCardToRemove = btnDeletar.closest(".event-card");
        if (eventCardToRemove) {
          eventCardToRemove.remove();
        }
      }
      // Ou simplesmente recarregar todos os eventos após a exclusão
      // loadEventsFromFirestore();  Recarrega os eventos para atualizar a lista
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      alert("Erro ao deletar evento. Verifique o console para mais detalhes.");
    }
  }
};

// Adicionar listeners de evento aos botões de editar e deletar APÓS os eventos serem carregados
// Você precisa chamar isso após showEvents() ou loadEventsFromFirestore()
// Uma boa prática é adicionar isso no final de showEvents() ou em uma função separada que chame showEvents()
function attachEventButtonListeners() {
  document.querySelectorAll('.editar-evento').forEach(button => {
    button.onclick = () => editarEvento(button.dataset.id);
  });

  document.querySelectorAll('.deletar-evento').forEach(button => {
    button.onclick = () => deletarEvento(button.dataset.id);
  });
}

// Chame attachEventButtonListeners após os eventos serem exibidos.
// Modifique a função showEvents para chamar attachEventButtonListeners ao final:
function showEvents(dateString) {
  // ... (todo o código existente da showEvents) ...

  if (eventosParaExibir.length === 0) {
    // ... (código para mensagem de "Não há eventos") ...
    return;
  }

  eventosParaExibir.forEach(evento => {
    // ... (código para criar o card e seus elementos) ...

    eventsList.appendChild(card);
  });

  // CHAME A FUNÇÃO AQUI:
  attachEventButtonListeners();
}