import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyADL9lXJy8a3KiEQgeNf4nxnUvJpq3IVME",
  authDomain: "setur-d4950.appspot.com",
  projectId: "setur-d4950",
  storageBucket: "setur-d4950.firebasestorage.app",
  messagingSenderId: "232074451879",
  appId: "1:232074451879:web:16c7ceeac1e81654813482"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
export const storage = getStorage(app);


export { db, auth };