import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';

const form = document.getElementById('form-adicionar-hotel');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const local = document.getElementById('local').value.trim();
  const contato = document.getElementById('contato').value.trim();

  if (!nome || !descricao || !local || !contato) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  try {
    const hoteisRef = collection(db, 'servicos');

    await addDoc(hoteisRef, {
      nome,
      descricao,
      local,
      contato,
      tipo: "hotel",
      criadoEm: serverTimestamp(),
      fotos: ["https://via.placeholder.com/300x200.png?text=Hotel+Sem+Foto"] // TEMPORÁRIO
    });

    alert('Hotel cadastrado com sucesso!');
    form.reset();
    window.location.href = "home-admin.html"; // Redireciona

  } catch (error) {
    console.error("Erro ao adicionar hotel:", error);
    alert('Erro ao salvar. Tente novamente.');
  }
});
