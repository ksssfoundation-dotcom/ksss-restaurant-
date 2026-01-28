import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDT7ZsaAd3R4UWf0RvdQ27UblO2gxr14z0",
  authDomain: "ksss-restaurant-7d0cb.firebaseapp.com",
  projectId: "ksss-restaurant-7d0cb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const tableNo = params.get("table") || "N/A";
document.getElementById("tableInfo").innerText = "Table No: " + tableNo;

let cart = [];
const menuDiv = document.getElementById("menu");

function imgPath(name) {
  return "images/" + name.toLowerCase().replace(/ /g,"-") + ".jpg";
}

onSnapshot(collection(db,"menu"), snap => {
  menuDiv.innerHTML = "";
  snap.forEach(docu => {
    const m = docu.data();
    const c = document.createElement("div");
    c.className = "card";
    c.innerHTML = `
      <img src="${imgPath(m.name)}" onerror="this.src='images/default.jpg'">
      <h4>${m.name}</h4>
      <p>₹${m.price}</p>
      <button>Add</button>
    `;
    c.querySelector("button").onclick = () => cart.push(m);
    menuDiv.appendChild(c);
  });
});

document.getElementById("placeOrderBtn").onclick = async () => {
  if(cart.length===0){ alert("No items"); return; }
  await addDoc(collection(db,"orders"),{
    table: tableNo,
    items: cart,
    status:"NEW"
  });
  cart=[];
  alert("Order placed");
};
