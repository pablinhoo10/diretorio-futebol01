// Importações usando a CDN oficial do Firebase (ES Modules)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcuDVc4H4wmd6yTGYmFIcY_snFlEGNBiE",
  authDomain: "diretorio-futebol.firebaseapp.com",
  projectId: "diretorio-futebol",
  storageBucket: "diretorio-futebol.firebasestorage.app",
  messagingSenderId: "904516567996",
  appId: "1:904516567996:web:691adeb9569dcb70a1e1b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);