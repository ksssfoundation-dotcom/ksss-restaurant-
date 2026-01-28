/**********************
 ✅ GLOBAL ORDER ARRAY
***********************/
let order = [];

/**********************
 ✅ COMPLETE MENU DATA
 (from your menu images)
***********************/
const menuData = [
  {
    category: "Dosa",
    items: [
      { name: "Plain Dosa", price: 60 },
      { name: "Masala Dosa", price: 80 },
      { name: "Onion Dosa", price: 100 },
      { name: "Paneer Dosa", price: 120 },
      { name: "Veg Uttapam", price: 120 },
      { name: "Idli Sambhar", price: 30 },
      { name: "Sambhar Vada", price: 30 }
    ]
  },
  {
    category: "Chinese",
    items: [
      { name: "Veg Chowmein", price: 40 },
      { name: "Paneer Chowmein", price: 60 },
      { name: "Veg Momos Fried", price: 40 },
      { name: "Paneer Momos Fried", price: 50 },
      { name: "Veg Spring Roll", price: 30 },
      { name: "Chilli Potato", price: 50 },
      { name: "Honey Chilli Potato", price: 60 }
    ]
  },
  {
    category: "Pizza",
    items: [
      { name: "Cheese Pizza", price: 120 },
      { name: "Onion Pizza", price: 150 },
      { name: "Tomato Pizza", price: 150 },
      { name: "Mix Veg Pizza", price: 150 },
      { name: "Paneer Pizza", price: 180 },
      { name: "Sweet Corn Pizza", price: 160 },
      { name: "Special Cheese Pizza", price: 200 }
    ]
  },
  {
    category: "Soup",
    items: [
      { name: "Veg Soup", price: 50 },
      { name: "Tomato Soup", price: 30 },
      { name: "Hot & Sour Soup", price: 40 },
      { name: "Manchow Soup", price: 80 },
      { name: "American Soup", price: 100 }
    ]
  },
  {
    category: "Shakes",
    items: [
      { name: "Oreo Shake", price: 90 },
      { name: "Chocolate Shake", price: 90 },
      { name: "Kitkat Shake", price: 90 },
      { name: "Banana Shake", price: 90 },
      { name: "Mango Shake", price: 90 }
    ]
  },
  {
    category: "Hot & Cold",
    items: [
      { name: "Tea", price: 15 },
      { name: "Hot Coffee", price: 50 },
      { name: "Cold Coffee", price: 90 },
      { name: "Cold Coffee + Icecream", price: 120 }
    ]
  }
];

/**********************
 ✅ RENDER MENU
***********************/
const menuDiv = document.getElementById("menu");

menuData.forEach(section => {
  const h2 = document.createElement("h2");
  h2.innerText = section.category;
  menuDiv.appendChild(h2);

  const wrap = document.createElement("div");
  wrap.className = "menu-row";

  section.items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${item.name}</h4>
      <p>₹${item.price}</p>
      <button>Add</button>
    `;

    card.querySelector("button").onclick = () => {
      order.push(item);
      alert(item.name + " added");
    };

    wrap.appendChild(card);
  });

  menuDiv.appendChild(wrap);
});

/**********************
 ✅ TABLE NUMBER FROM QR
***********************/
const params = new URLSearchParams(window.location.search);
const tableNo = params.get("table") || "N/A";

document.getElementById("tableInfo").innerText =
  "Table No: " + tableNo;

/**********************
 ✅ PLACE ORDER (WORKING)
***********************/
document.getElementById("placeOrderBtn").onclick = () => {
  if (order.length === 0) {
    alert("No item selected");
    return;
  }

  const finalOrder = {
    table: tableNo,
    items: order,
    time: new Date().toLocaleTimeString(),
    status: "New"
  };

  // TEMP STORAGE (Admin can read later)
  let orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(finalOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order placed successfully");
  order = [];
};
