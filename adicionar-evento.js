// adicionar-evento.js
import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Referências aos elementos do formulário no HTML
const formAddEvento = document.getElementById("form-add-evento");
const nomeInput = document.getElementById("nome-evento");
const dataInput = document.getElementById("data-evento");
const horarioInput = document.getElementById("horario-evento");
const localInput = document.getElementById("local-evento");
const descricaoInput = document.getElementById("descricao-evento");

// Referências aos elementos do modal de cancelamento
const btnCancelarEvento = document.getElementById("btn-cancelar-evento");
const cancelModal = document.getElementById("cancelModal");
const modalConfirmCancel = document.getElementById("modal-confirm-cancel");
const modalCloseCancel = document.getElementById("modal-close-cancel");

// 1. Lógica para adicionar novo evento no Firestore
if (formAddEvento) {
    console.log("Formulário de adicionar evento encontrado. Anexando listener.");
    formAddEvento.addEventListener("submit", async (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página

        // Pega os valores dos campos do formulário
        const nome = nomeInput.value.trim();
        const data = dataInput.value; // Formato YYYY-MM-DD
        const horario = horarioInput.value; // Formato HH:MM
        const local = localInput.value.trim();
        const descricao = descricaoInput.value.trim();

        // Validação básica
        if (!nome || !data || !local) {
            alert("Por favor, preencha os campos obrigatórios: Nome, Data e Local.");
            return;
        }

        try {
            // Adiciona o novo documento na coleção "eventos"
            const docRef = await addDoc(collection(db, "eventos"), {
                nome: nome,
                data: data,
                horario: horario,
                local: local,
                descricao: descricao,
                createdAt: new Date().toISOString() // Opcional: timestamp de criação
            });

            console.log("Evento adicionado com ID: ", docRef.id);
            alert("Evento cadastrado com sucesso!");
            formAddEvento.reset(); // Limpa o formulário após o sucesso
            window.location.href = "home-admin.html"; // Redireciona para a home do admin (eventos)

        } catch (error) {
            console.error("Erro ao cadastrar evento:", error);
            alert("Erro ao cadastrar evento. Verifique o console para mais detalhes.");
        }
    });
}

// 2. Lógica do modal de cancelamento
if (btnCancelarEvento && cancelModal && modalConfirmCancel && modalCloseCancel) {
    // Quando o botão Cancelar é clicado, mostra o modal
    btnCancelarEvento.addEventListener("click", () => {
        cancelModal.style.display = "flex"; // Usa flex para centralizar
    });

    // Quando o botão "Não, Continuar Editando" é clicado, fecha o modal
    modalCloseCancel.addEventListener("click", () => {
        cancelModal.style.display = "none";
    });

    // Quando o usuário clica fora do modal, ele também fecha (opcional)
    window.addEventListener("click", (event) => {
        if (event.target === cancelModal) {
            cancelModal.style.display = "none";
        }
    });

    // Quando o botão "Sim, Cancelar" é clicado, limpa o formulário e redireciona
    modalConfirmCancel.addEventListener("click", () => {
        formAddEvento.reset(); // Limpa todos os campos do formulário
        cancelModal.style.display = "none"; // Esconde o modal
        window.location.href = "home-admin.html"; // Redireciona para a página principal do admin
    });
}