import { db } from "./firebase-config.js"; // Verifique o caminho para seu arquivo de configuração do Firebase
import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"; // Versão atualizada do Firebase Firestore

// 1. Pegar o ID da URL
const params = new URLSearchParams(window.location.search);
const guiaId = params.get("id");

if (!guiaId) {
    alert("ID do guia não encontrado na URL. Redirecionando...");
    window.location.href = "comer-admin.html"; // Redirecione para a página de administração principal ou listagem de guias
}

// Referências aos elementos do HTML usando os IDs
const nomeInput = document.getElementById("nomeGuia");
const descricaoInput = document.getElementById("descricaoGuia");
const contatoInput = document.getElementById("contatoGuia");

const form = document.getElementById("form-editar-guia");

// 2. Carregar dados do Firestore e preencher o formulário
async function carregarDadosGuia() {
    try {
        // Coleção "servicos" para guias, como você especificou.
        const docRef = doc(db, "servicos", guiaId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            nomeInput.value = data.nome || "";
            descricaoInput.value = data.descricao || "";
            contatoInput.value = data.contato || "";

        } else {
            alert("Guia não encontrado.");
            window.location.href = "comer-admin.html"; // Ou para a página de listagem de guias
        }
    } catch (error) {
        console.error("Erro ao carregar guia:", error);
        alert("Erro ao carregar guia.");
    }
}

// Chamar a função para carregar os dados quando a página for carregada
carregarDadosGuia();

// 3. Atualizar os dados no Firestore
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        // Coleção "servicos" para guias.
        const docRef = doc(db, "servicos", guiaId);

        await updateDoc(docRef, {
            nome: nomeInput.value.trim(),
            descricao: descricaoInput.value.trim(),
            contato: contatoInput.value.trim(),
            tipo: "guia", // Salvando o tipo como "guia"
            status: "ativo" // Ou mantenha o status atual, se você tiver essa lógica
        });

        alert("Guia atualizado com sucesso!");
        window.location.href = "fazer-admin.html"; // Redireciona após o sucesso
    } catch (error) {
        console.error("Erro ao atualizar guia:", error);
        alert("Erro ao atualizar guia.");
    }
});