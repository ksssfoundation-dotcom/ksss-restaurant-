import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDT7ZsaAd3R4UWf0RvdQ27UblO2gxr14z0",
  authDomain: "ksss-restaurant-7d0cb.firebaseapp.com",
  projectId: "ksss-restaurant-7d0cb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.login = () => {
  if(document.getElementById("adminPass").value!=="1234"){alert("Wrong");return;}
  document.getElementById("loginBox").style.display="none";
  document.getElementById("adminPanel").style.display="block";
  loadOrders();
  loadPrices();
};

function loadOrders(){
  onSnapshot(collection(db,"orders"), snap=>{
    document.getElementById("orders").innerHTML="";
    snap.forEach(d=>{
      const o=d.data();
      document.getElementById("orders").innerHTML+=`
        <div class="card">
          Table ${o.table}<br>
          ${o.items.map(i=>i.name).join(", ")}<br>
          ${o.status}
        </div>`;
    });
  });
}

function loadPrices(){
  onSnapshot(collection(db,"menu"), snap=>{
    const pe=document.getElementById("priceEditor");
    pe.innerHTML="";
    snap.forEach(d=>{
      const m=d.data();
      pe.innerHTML+=`
        <div class="card">
          ${m.name}
          <input value="${m.price}"
            onchange="updatePrice('${d.id}',this.value)">
        </div>`;
    });
  });
}

window.updatePrice = async (id,val)=>{
  await updateDoc(doc(db,"menu",id),{price:Number(val)});
};
