import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const ADMIN_EMAIL = "2236874.cse.cec@cgc.edu.in";

onAuthStateChanged(auth, async (user) => {
  if (!user || user.email !== ADMIN_EMAIL) {
    alert("Access Denied");
    window.location.href = "index.html";
    return;
  }

  loadPendingPlans();
});

async function loadPendingPlans() {
  const q = query(
    collection(db, "subscription"),
    where("status", "==", "Pending")
  );

  const snapshot = await getDocs(q);
  const container = document.getElementById("adminPlans");
  container.innerHTML = "";

  if (snapshot.empty) {
    container.innerHTML = "<p>No pending plans</p>";
    return;
  }

  snapshot.forEach(docSnap => {
    const data = docSnap.data();

    const div = document.createElement("div");
    div.innerHTML = `
      <p>
        ${data.email} - ${data.plan} - ₹${data.price}
        <button onclick="activatePlan('${docSnap.id}')">
          Activate
        </button>
      </p>
    `;
    container.appendChild(div);
  });
}

window.activatePlan = async function (docId) {
  await updateDoc(
    doc(db, "subscription", docId),
    { status: "Active" }
  );

  alert("Plan Activated");
  loadPendingPlans();
};
