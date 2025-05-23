import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getDatabase, ref, get, update, push, set } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js";

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

window.directDeposit = function () {
  const userId = document.getElementById("deposit-id").value.trim();
  const amount = parseFloat(document.getElementById("deposit-amount").value.trim());

  if (!userId || isNaN(amount) || amount <= 0) {
    alert("يرجى إدخال ID صحيح ومبلغ أكبر من صفر.");
    return;
  }

  const userRef = ref(db, `users/${userId}`);

  get(userRef).then(snapshot => {
    if (!snapshot.exists()) {
      alert("المستخدم غير موجود.");
      return;
    }

    const userData = snapshot.val();
    const currentBalance = parseFloat(userData.balance || 0);
    const newBalance = currentBalance + amount;

    // تحديث الرصيد
    update(userRef, { balance: newBalance }).then(() => {
      // تسجيل العملية
      const depositLog = push(ref(db, `users/${userId}/deposits`));
      set(depositLog, {
        amount: amount,
        date: new Date().toISOString()
      });

      alert("تم تنفيذ الإيداع وتحديث الرصيد.");
    }).catch(err => alert("خطأ في تحديث الرصيد: " + err.message));
  }).catch(err => alert("خطأ في الاتصال: " + err.message));
};