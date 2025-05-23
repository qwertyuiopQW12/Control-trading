import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5hrhQpzQ_0Hw8-2Gk_cCmxWEBIurj9aQ",
  authDomain: "mmmn-47e0e.firebaseapp.com",
  databaseURL: "https://mmmn-47e0e-default-rtdb.firebaseio.com",
  projectId: "mmmn-47e0e",
  storageBucket: "mmmn-47e0e.appspot.com",
  messagingSenderId: "24518504775",
  appId: "1:24518504775:web:a5798bc9ddadea690d5c62"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const userId = localStorage.getItem("userId");

if (userId) {
  const vipRef = ref(db, "users/" + userId + "/vipLevel");
  get(vipRef).then(snapshot => {
    if (snapshot.exists()) {
      const level = snapshot.val();
      const vipText = document.getElementById("vip-text");
      if (vipText) {
        vipText.textContent = level;
      }
    }
  });
}