import { db } from "./firebase-config.js";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

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
  const acao = novoStatus === 'ativo' ? 'ativar' : 'desativar';

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
  const acao = novoStatus === true ? 'ativar' || 'ativado' : 'desativar' || 'desativado';

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