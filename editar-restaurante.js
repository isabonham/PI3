import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// 1. Pegar o ID da URL
const params = new URLSearchParams(window.location.search);
const restauranteId = params.get("id");

if (!restauranteId) {
  alert("ID do restaurante não encontrado.");
  window.location.href = "comer-admin.html";
}

const nomeInput = document.getElementById("nomeRestaurante");
const descricaoInput = document.getElementById("descricaoRestaurante");
const localizacaoInput = document.getElementById("localizacaoRestaurante");
const contatoInput = document.getElementById("contatoRestaurante");

const form = document.getElementById("form-editar-restaurante");

// 2. Carregar dados do Firestore e preencher o formulário
async function carregarDados() {
  try {
    const docRef = doc(db, "servicos", restauranteId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      nomeInput.value = data.nome || "";
      descricaoInput.value = data.descricao || "";
      localizacaoInput.value = data.local || "";
      contatoInput.value = data.contato || "";
      // você pode preencher outros campos se tiver
    } else {
      alert("Restaurante não encontrado.");
      window.location.href = "comer-admin.html";
    }
  } catch (error) {
    console.error("Erro ao carregar restaurante:", error);
    alert("Erro ao carregar restaurante.");
  }
}

carregarDados();

// 3. Atualizar os dados no Firestore
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const docRef = doc(db, "servicos", restauranteId);

    await updateDoc(docRef, {
      nome: nomeInput.value.trim(),
      descricao: descricaoInput.value.trim(),
      local: localizacaoInput.value.trim(),
      contato: contatoInput.value.trim(),
      tipo: "restaurante", // importante garantir isso
      status: "ativo" // ou manter o atual
    });

    alert("Restaurante atualizado com sucesso!");
    window.location.href = "comer-admin.html";
  } catch (error) {
    console.error("Erro ao atualizar restaurante:", error);
    alert("Erro ao atualizar restaurante.");
  }
});
