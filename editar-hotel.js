import { db } from "./firebase-config.js"; // Ajuste o caminho se necessário. Usei firebase-config.js para consistência.
import {
    doc,
    getDoc,
    updateDoc // Importado para permitir a atualização dos dados
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"; // Atualizado a versão do Firebase para a mesma que você usou no restaurante

// 1. Pegar o ID da URL
const params = new URLSearchParams(window.location.search);
const hotelId = params.get("id");

if (!hotelId) {
    alert("ID do hotel não encontrado na URL. Redirecionando...");
    window.location.href = "comer-admin.html"; // Ou para a página de listagem de hotéis
}

// Referências aos elementos do HTML usando os IDs
const nomeInput = document.getElementById("nomeHotel");
const descricaoInput = document.getElementById("descricaoHotel");
const localizacaoInput = document.getElementById("localizacaoHotel");
const comodidadesSelect = document.getElementById("comodidadesHotel"); // Para uso futuro
const servicosAdicionaisSelect = document.getElementById("servicosAdicionaisHotel"); // Para uso futuro

const form = document.getElementById("form-editar-hotel");

// 2. Carregar dados do Firestore e preencher o formulário
async function carregarDadosHotel() {
    try {
        const docRef = doc(db, "servicos", hotelId); // A coleção é "servicos"
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            nomeInput.value = data.nome || "";
            descricaoInput.value = data.descricao || "";
            localizacaoInput.value = data.localizacao || data.local || ""; // Tenta "localizacao" primeiro, depois "local"

            // Para os selects, você precisará de mais lógica para preencher as opções
            // e depois definir a opção selecionada, se houver dados no Firestore.
            // Exemplo: comodidadesSelect.value = data.comodidades || "";
            // servicosAdicionaisSelect.value = data.servicos || "";

        } else {
            alert("Hotel não encontrado.");
            window.location.href = "comer-admin.html"; // Ou para a página de listagem de hotéis
        }
    } catch (error) {
        console.error("Erro ao carregar hotel:", error);
        alert("Erro ao carregar hotel.");
    }
}

// Chamar a função para carregar os dados quando a página for carregada
carregarDadosHotel();

// 3. Atualizar os dados no Firestore (Lógica similar à do restaurante)
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const docRef = doc(db, "servicos", hotelId);

        await updateDoc(docRef, {
            nome: nomeInput.value.trim(),
            descricao: descricaoInput.value.trim(),
            localizacao: localizacaoInput.value.trim(), // Certifique-se de que o nome do campo é "localizacao" no Firestore
            // comodidades: comodidadesSelect.value, // Adicione se for usar
            // servicosAdicionais: servicosAdicionaisSelect.value, // Adicione se for usar
            tipo: "hotel", // Importante para categorizar no Firestore
            status: "ativo" // Ou mantenha o status atual, se você tiver essa lógica
        });

        alert("Hotel atualizado com sucesso!");
        window.location.href = "home-admin.html"; // Redireciona após o sucesso
    } catch (error) {
        console.error("Erro ao atualizar hotel:", error);
        alert("Erro ao atualizar hotel.");
    }
});