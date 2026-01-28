const PASS = "1234";

function login() {
  if(document.getElementById("adminPass").value === PASS) {
    document.getElementById("loginBox").style.display="none";
    document.getElementById("adminPanel").style.display="block";
    loadOrders();
    loadPriceEditor();
  } else {
    alert("Wrong password");
  }
}

function loadOrders() {
  const ordersDiv = document.getElementById("orders");
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  ordersDiv.innerHTML = "";
  orders.forEach((o, i) => {
    ordersDiv.innerHTML += `
      <div>
        <b>Table ${o.table}</b> (${o.time})<br>
        ${o.items.map(it => it.name + " ₹"+it.price).join("<br>")}
        <br>Status: ${o.status}
        <br><button onclick="printBill(${i})">Print</button>
        <hr>
      </div>
    `;
  });
}

function printBill(i) {
  let orders = JSON.parse(localStorage.getItem("orders"));
  orders[i].status = "Printed";
  localStorage.setItem("orders", JSON.stringify(orders));
  window.print();
  loadOrders();
}

function loadPriceEditor() {
  const div = document.getElementById("priceEditor");
  let items = JSON.parse(localStorage.getItem("menuItems"));
  div.innerHTML = "";
  items.forEach((item, i) => {
    div.innerHTML += `
      ${item.name} 
      <input type="number" value="${item.price}"
      onchange="updatePrice(${i}, this.value)">
      <br>
    `;
  });
}

function updatePrice(i, price) {
  let items = JSON.parse(localStorage.getItem("menuItems"));
  items[i].price = Number(price);
  localStorage.setItem("menuItems", JSON.stringify(items));
}
