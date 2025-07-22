import { db } from "./firebase-config.js"; 
import {
    collection,
    addDoc // Importe 'addDoc' para adicionar novos documentos
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"; // Versão atualizada do Firebase Firestore

// Referências aos elementos do HTML usando os IDs
const nomeInput = document.getElementById("nomeMotorista");
const descricaoInput = document.getElementById("descricaoServico");
const contatoInput = document.getElementById("contatoServico");

const veiculoCarroCheckbox = document.getElementById("veiculoCarro");
const veiculoMotoCheckbox = document.getElementById("veiculoMoto");

const form = document.getElementById("form-adicionar-transporte");
const cancelarBtn = document.querySelector(".cancelar"); // Pega o botão de cancelar

// Event Listener para o envio do formulário
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    try {
        // Coleta os tipos de veículo selecionados
        const tiposVeiculoSelecionados = [];
        if (veiculoCarroCheckbox.checked) {
            tiposVeiculoSelecionados.push("carro");
        }
        if (veiculoMotoCheckbox.checked) {
            tiposVeiculoSelecionados.push("moto");
        }

        // Dados do novo transporte a serem salvos
        const novoTransporte = {
            nome: nomeInput.value.trim(),
            descricao: descricaoInput.value.trim(),
            contato: contatoInput.value.trim(),
            tipoVeiculo: tiposVeiculoSelecionados,
            tipo: "transporte", // Define o tipo do serviço como 'transporte'
            status: "ativo",    // Define um status inicial (ex: ativo)
            foto: ["https://via.placeholder.com/300x200.png?text=Restaurante+Sem+Foto"],
        };

        // Adiciona o novo documento à coleção "transporte"
        const docRef = await addDoc(collection(db, "transporte"), novoTransporte);

        alert("Transporte adicionado com sucesso!");

        // Limpa o formulário após o envio
        form.reset();
        veiculoCarroCheckbox.checked = false;
        veiculoMotoCheckbox.checked = false;

        // Opcional: Redirecionar para a lista de transportes ou alguma página de sucesso
        window.location.href = "chegar-admin.html"; // Altere para a sua página de listagem de transportes

    } catch (error) {
        console.error("Erro ao adicionar transporte:", error);
        alert("Erro ao adicionar transporte. Verifique o console para mais detalhes.");
    }
});

// Event Listener para o botão Cancelar
cancelarBtn.addEventListener("click", () => {
    // Volta para a página anterior ou para uma página específica
    window.history.back(); // Volta para a página anterior
    // Ou: window.location.href = "comer-admin.html"; // Redireciona para a página principal
});