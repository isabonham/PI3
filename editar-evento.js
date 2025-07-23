import { db } from "./firebase-config.js";
import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const urlParams = new URLSearchParams(window.location.search);
const eventoId = urlParams.get("id");

if (!eventoId) {
    console.error("ID do evento não encontrado na URL. Redirecionando...");
    alert("ID do evento não encontrado na URL. Redirecionando para a lista de eventos...");
    // Alteração: Redirecionar para home-admin.html se não houver ID
    window.location.href = "home-admin.html";
}

// Referências aos elementos do formulário no HTML
const nomeInput = document.getElementById("nome-evento");
const dataInput = document.getElementById("data-evento");
const horarioInput = document.getElementById("horario-evento");
const localInput = document.getElementById("local-evento");
const descricaoInput = document.getElementById("descricao-evento");

const formEditarEvento = document.getElementById("form-editar-evento");
const btnCancelarEdicaoEvento = document.getElementById("btn-cancelar-edicao-evento");
const cancelEditModal = document.getElementById("cancelEditModal");
const modalConfirmCancelEdit = document.getElementById("modal-confirm-cancel-edit");
const modalCloseCancelEdit = document.getElementById("modal-close-cancel-edit");


// 2. Carregar dados do Firestore e preencher o formulário
async function carregarDadosEvento() {
    try {
        const docRef = doc(db, "eventos", eventoId); // Coleção "eventos"
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            nomeInput.value = data.nome || "";
            dataInput.value = data.data || ""; // Formato YYYY-MM-DD
            horarioInput.value = data.horario || "";
            localInput.value = data.local || "";
            descricaoInput.value = data.descricao || "";

        } else {
            alert("Evento não encontrado.");
            // Alteração: Redirecionar para home-admin.html se o evento não existir
            window.location.href = "home-admin.html";
        }
    } catch (error) {
        console.error("Erro ao carregar evento:", error);
        alert("Erro ao carregar evento para edição.");
        // Em caso de erro ao carregar, também redirecione para evitar que o usuário fique em uma página quebrada
        window.location.href = "home-admin.html";
    }
}

// Chamar a função para carregar os dados quando a página for carregada
// Adicionado um listener para garantir que o DOM esteja totalmente carregado
document.addEventListener('DOMContentLoaded', carregarDadosEvento);


// 3. Lógica para salvar as alterações no Firestore
if (formEditarEvento) {
    formEditarEvento.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Pega os valores atualizados dos campos
        const nome = nomeInput.value.trim();
        const data = dataInput.value;
        const horario = horarioInput.value;
        const local = localInput.value.trim();
        const descricao = descricaoInput.value.trim();

        // Validação básica
        if (!nome || !data || !local) {
            alert("Por favor, preencha os campos obrigatórios: Nome, Data e Local.");
            return;
        }

        try {
            const docRef = doc(db, "eventos", eventoId); // Referência ao documento existente

            await updateDoc(docRef, {
                nome: nome,
                data: data,
                horario: horario,
                local: local,
                descricao: descricao,
                updatedAt: new Date().toISOString() // Opcional: timestamp de atualização
            });

            alert("Evento atualizado com sucesso!");
            window.location.href = "home-admin.html"; // Redireciona para a home do admin (eventos)
        } catch (error) {
            console.error("Erro ao atualizar evento:", error);
            alert("Erro ao atualizar evento. Verifique o console para mais detalhes.");
        }
    });
}


// Lógica do modal de cancelamento (similar ao adicionar-evento.js)
if (btnCancelarEdicaoEvento && cancelEditModal && modalConfirmCancelEdit && modalCloseCancelEdit) {
    btnCancelarEdicaoEvento.addEventListener("click", () => {
        cancelEditModal.style.display = "flex";
    });

    modalCloseCancelEdit.addEventListener("click", () => {
        cancelEditModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === cancelEditModal) {
            cancelEditModal.style.display = "none";
        }
    });

    modalConfirmCancelEdit.addEventListener("click", () => {
        // Não precisa limpar o formulário, apenas redirecionar
        cancelEditModal.style.display = "none";
        window.location.href = "home-admin.html";
    });
}