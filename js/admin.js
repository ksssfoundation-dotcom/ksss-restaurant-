/**********************
 🔐 SIMPLE ADMIN LOGIN
***********************/
const PASS = "1234";

function login() {
  const p = document.getElementById("adminPass").value;
  if (p !== PASS) {
    alert("Wrong password");
    return;
  }

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";
  loadOrders();
}

/**********************
 📦 LOAD LIVE ORDERS
***********************/
function loadOrders() {
  const ordersDiv = document.getElementById("orders");
  ordersDiv.innerHTML = "";

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  if (orders.length === 0) {
    ordersDiv.innerHTML = "<p>No orders</p>";
    return;
  }

  orders.forEach((o, index) => {
    const box = document.createElement("div");
    box.style.border = "1px solid #444";
    box.style.padding = "10px";
    box.style.marginBottom = "10px";

    let itemsHtml = "";
    o.items.forEach(i => {
      itemsHtml += `<li>${i.name} – ₹${i.price}</li>`;
    });

    box.innerHTML = `
      <b>Table:</b> ${o.table}<br>
      <b>Time:</b> ${o.time}<br>
      <b>Status:</b> ${o.status}<br>
      <ul>${itemsHtml}</ul>
      ${
        o.status === "Printed"
          ? "<i>Already Printed</i>"
          : `<button onclick="printOrder(${index})">Print</button>`
      }
    `;

    ordersDiv.appendChild(box);
  });
}

/**********************
 🖨️ PRINT + MARK PRINTED
***********************/
function printOrder(i) {
  let orders = JSON.parse(localStorage.getItem("orders"));
  orders[i].status = "Printed";
  localStorage.setItem("orders", JSON.stringify(orders));

  window.print();
  loadOrders();
}

/**********************
 💰 PRICE EDITOR (VISIBLE)
***********************/
function loadPriceEditor() {
  const pricesDiv = document.getElementById("priceEditor");
  pricesDiv.innerHTML = "<p>Price editor coming next step</p>";
}

loadPriceEditor();
