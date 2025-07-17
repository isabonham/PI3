import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';

const form       = document.getElementById('login-form');
const inputEmail = document.getElementById('email');
const inputPass  = document.getElementById('password');
const toggleEye  = document.getElementById('toggle-password');

// Toggle de visibilidade da senha
toggleEye.addEventListener('click', () => {
  const type = inputPass.type === 'password' ? 'text' : 'password';
  inputPass.type = type;
  toggleEye.classList.toggle('bi-eye-slash', type === 'text');
  toggleEye.classList.toggle('bi-eye', type === 'password');
});

// Tratamento do submit de login
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = inputEmail.value.trim();
  const pass  = inputPass.value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, pass);
    console.log('Logado:', userCred.user.email);
    // Redirecione para a página desejada
    window.location.href = 'home-admin.html';
  } catch (error) {
    let msg;
    switch (error.code) {
      case 'auth/user-not-found':
        msg = 'E-mail não cadastrado.';
        break;
      case 'auth/wrong-password':
        msg = 'Senha incorreta.';
        break;
      case 'auth/invalid-email':
        msg = 'Formato de e-mail inválido.';
        break;
      default:
        msg = error.message;
    }
    alert(msg);
  }
});