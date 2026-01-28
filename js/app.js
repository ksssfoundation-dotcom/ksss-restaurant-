const params = new URLSearchParams(window.location.search);
const table = params.get("table") || "Unknown";

document.getElementById("tableInfo").innerHTML =
  `<h3>Table ${table}</h3>`;

let menuItems = JSON.parse(localStorage.getItem("menuItems")) || [
  {name:"Veg Chowmein", price:70, img:"assets/images/veg_chowmein.jpg"},
  {name:"Paneer Chowmein", price:80, img:"assets/images/paneer_chowmein.jpg"},
  {name:"Veg Momos", price:60, img:"assets/images/veg_momos.jpg"},
  {name:"Paneer Momos", price:80, img:"assets/images/paneer_momos.jpg"}
];

localStorage.setItem("menuItems", JSON.stringify(menuItems));

let order = [];

function loadMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";
  menuItems.forEach((item, i) => {
    menuDiv.innerHTML += `
      <div class="menu-item">
        <img src="${item.img}" onerror="this.src='https://via.placeholder.com/150'">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <button onclick="addItem(${i})">Add</button>
      </div>
    `;
  });
}

function addItem(i) {
  order.push(menuItems[i]);
  alert(menuItems[i].name + " added");
}

document.getElementById("placeOrderBtn").onclick = () => {
  if(order.length === 0) return alert("No items selected");

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({
    table,
    items: order,
    time: new Date().toLocaleString(),
    status: "New"
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  alert("Order Placed");
  order = [];
};

loadMenu();
