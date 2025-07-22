import { db } from "./firebase-config.js"; // Verifique se o caminho para seu firebase-config.js está correto
import {
    collection,
    addDoc // Importe 'addDoc' para adicionar novos documentos
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"; // Versão atualizada do Firebase Firestore

// Referências aos elementos do HTML usando os IDs
const nomeInput = document.getElementById("nomeGuia");
const descricaoInput = document.getElementById("descricaoGuia");
const contatoInput = document.getElementById("contatoGuia");

const form = document.getElementById("form-adicionar-guia");
const cancelarBtn = document.querySelector(".cancelar"); // Pega o botão de cancelar

// Event Listener para o envio do formulário
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    try {
        // Dados do novo guia a serem salvos
        const novoGuia = {
            nome: nomeInput.value.trim(),
            descricao: descricaoInput.value.trim(),
            contato: contatoInput.value.trim(),
            tipo: "guia",       // Define o tipo do serviço como 'guia'
            status: "ativo",    // Define um status inicial (ex: ativo)
            dataCriacao: new Date(), // Opcional: Adiciona um timestamp da criação
            fotos: []           // Essencial para evitar o erro 'Cannot read properties of undefined (reading '0')'
        };

        // Adiciona o novo documento à coleção "servicos" (onde você tem guias)
        const docRef = await addDoc(collection(db, "servicos"), novoGuia);

        alert("Guia adicionado com sucesso!");

        // Limpa o formulário após o envio
        form.reset();

        // Redirecionar para a página de listagem de guias para que o novo guia apareça
        // Assumindo que a página de listagem de guias seja 'fazer-admin.html'
        // Por favor, ajuste se o nome da sua página de listagem de guias for diferente!
        window.location.href = "fazer-admin.html";

    } catch (error) {
        console.error("Erro ao adicionar guia:", error);
        alert("Erro ao adicionar guia. Verifique o console para mais detalhes.");
    }
});

// Event Listener para o botão Cancelar
cancelarBtn.addEventListener("click", () => {
    window.history.back(); 
});