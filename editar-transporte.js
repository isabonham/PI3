import { db } from "./firebase-config.js"; // Verifique se o caminho para seu arquivo firebase-config.js está correto
import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"; // Versão atualizada do Firebase Firestore

// 1. Pegar o ID da URL
const params = new URLSearchParams(window.location.search);
const transporteId = params.get("id");

if (!transporteId) {
    alert("ID do transporte não encontrado na URL. Redirecionando...");
    window.location.href = "comer-admin.html"; // Redirecione para a página de administração principal ou listagem de transportes
}

// Referências aos elementos do HTML usando os IDs
const nomeInput = document.getElementById("nomeMotorista");
const descricaoInput = document.getElementById("descricaoServico");
const contatoInput = document.getElementById("contatoServico");

const veiculoCarroCheckbox = document.getElementById("veiculoCarro");
const veiculoMotoCheckbox = document.getElementById("veiculoMoto");

const form = document.getElementById("form-editar-transporte");

// 2. Carregar dados do Firestore e preencher o formulário
async function carregarDadosTransporte() {
    try {
        const docRef = doc(db, "transporte", transporteId); // Supondo que 'transportes' também esteja na coleção 'servicos'
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            nomeInput.value = data.nome || "";
            descricaoInput.value = data.descricao || "";
            contatoInput.value = data.contato || "";

            // Lógica para preencher os checkboxes de tipo de veículo
            if (data.tipoVeiculo) { // Supondo que você armazena o tipo de veículo como 'tipoVeiculo' no Firestore
                if (data.tipoVeiculo.includes("carro")) {
                    veiculoCarroCheckbox.checked = true;
                }
                if (data.tipoVeiculo.includes("moto")) {
                    veiculoMotoCheckbox.checked = true;
                }
            }

        } else {
            alert("Serviço de transporte não encontrado.");
            window.location.href = "chegar-admin.html"; // Ou para a página de listagem de transportes
        }
    } catch (error) {
        console.error("Erro ao carregar serviço de transporte:", error);
        alert("Erro ao carregar serviço de transporte.");
    }
}

// Chamar a função para carregar os dados quando a página for carregada
carregarDadosTransporte();

// 3. Atualizar os dados no Firestore
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const docRef = doc(db, "transporte", transporteId);

        // Coleta os tipos de veículo selecionados
        const tiposVeiculoSelecionados = [];
        if (veiculoCarroCheckbox.checked) {
            tiposVeiculoSelecionados.push("carro");
        }
        if (veiculoMotoCheckbox.checked) {
            tiposVeiculoSelecionados.push("moto");
        }

        await updateDoc(docRef, {
            nome: nomeInput.value.trim(),
            descricao: descricaoInput.value.trim(),
            contato: contatoInput.value.trim(),
            tipoVeiculo: tiposVeiculoSelecionados, // Salva como um array no Firestore
            tipo: "transporte", // Importante para categorizar
            status: "ativo"
        });

        alert("Serviço de transporte atualizado com sucesso!");
        window.location.href = "chegar-admin.html"; // Redireciona após o sucesso
    } catch (error) {
        console.error("Erro ao atualizar serviço de transporte:", error);
        alert("Erro ao atualizar serviço de transporte.");
    }
});