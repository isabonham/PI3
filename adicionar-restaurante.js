import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const form = document.getElementById("form-restaurante");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nomeRestaurante").value.trim();
  const contato = document.getElementById("contatoRestaurante").value.trim();
  const descricao = document.getElementById("descricaoRestaurante").value.trim();
  const local = document.getElementById("localizacaoRestaurante").value.trim();

  if (!nome || !contato || !descricao || !local) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  try {
    await addDoc(collection(db, "servicos"), {
      nome,
      contato,
      descricao,
      local,
      fotos: ["https://via.placeholder.com/300x200.png?text=Restaurante+Sem+Foto"],
      status: "ativo",
      tipo: "restaurante"
    });

    alert("Restaurante adicionado com sucesso!");
    form.reset();
    window.location.href = "comer-admin.html";
  } catch (error) {
    console.error("Erro ao adicionar restaurante:", error);
    alert("Erro ao adicionar restaurante.");
  }
});
