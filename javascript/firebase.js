// App
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVpm4Ca3AygAUG08Wt_LLvp7BzX5PzSuk",
  authDomain: "power-fit-gym-a571c.firebaseapp.com",
  projectId: "power-fit-gym-a571c",
  storageBucket: "power-fit-gym-a571c.firebasestorage.app",
  messagingSenderId: "764632571642",
  appId: "1:764632571642:web:4244ce285837e799d0b343",
  measurementId: "G-RC6L8X97RP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth = getAuth(app);