// =======================
// TABLE NUMBER (from QR)
// =======================
const params = new URLSearchParams(window.location.search);
const tableNo = params.get("table") || "N/A";
document.getElementById("tableInfo").innerText = "Table No: " + tableNo;

// =======================
// FULL MENU DATA
// =======================
const menuData = [
  {
    category: "Chinese",
    items: [
      { name: "Veg Chowmein", half: 40, full: 70 },
      { name: "Paneer Chowmein", half: 60, full: 120 },
      { name: "Hakka Noodles", half: 60, full: 120 },
      { name: "Singapuri Noodles", half: 60, full: 120 },
      { name: "Veg Fried Momos", half: 40, full: 80 },
      { name: "Paneer Fried Momos", half: 50, full: 100 },
      { name: "Veg Steam Momos", half: 40, full: 80 },
      { name: "Paneer Steam Momos", half: 50, full: 100 },
      { name: "Soya Momos", half: 30, full: 60 },
      { name: "Butter Momos", half: 60, full: 90 },
      { name: "Paneer Butter Momos", half: 70, full: 120 }
    ]
  },

  {
    category: "Fries & Snacks",
    items: [
      { name: "French Fries", half: 30, full: 50 },
      { name: "Cheese French Fries", half: 50, full: 70 },
      { name: "Peri Peri Fries", half: 50, full: 70 },
      { name: "Chilli Potato", half: 50, full: 100 },
      { name: "Honey Chilli Potato", half: 60, full: 120 },
      { name: "Spring Roll", half: 30, full: 60 },
      { name: "Veg Burger", full: 30 },
      { name: "Special Burger", full: 50 }
    ]
  },

  {
    category: "Dosa",
    items: [
      { name: "Plain Dosa", full: 60 },
      { name: "Masala Dosa", full: 80 },
      { name: "Onion Dosa", full: 100 },
      { name: "Paneer Dosa", full: 120 },
      { name: "Veg Uttapam", full: 120 },
      { name: "Sambhar Vada (1 Pc)", full: 30 },
      { name: "Idli Sambhar (2 Pc)", full: 30 }
    ]
  },

  {
    category: "Pizza",
    items: [
      { name: "Cheese Pizza", full: 120 },
      { name: "Onion Pizza", full: 150 },
      { name: "Tomato Pizza", full: 150 },
      { name: "Mix Veg Pizza", full: 150 },
      { name: "Paneer Pizza", full: 180 },
      { name: "Sweet Corn Pizza", full: 160 },
      { name: "Mushroom Pizza", full: 160 },
      { name: "Special Cheese Pizza", full: 200 }
    ]
  },

  {
    category: "Soup",
    items: [
      { name: "Veg Soup", full: 50 },
      { name: "Tomato Soup", full: 30 },
      { name: "Sweet Corn Soup", full: 40 },
      { name: "Manchow Soup", full: 80 },
      { name: "American Soup", full: 100 }
    ]
  },

  {
    category: "Sandwich",
    items: [
      { name: "Veg Sandwich", full: 40 },
      { name: "Paneer Sandwich", full: 80 },
      { name: "Sweet Corn Sandwich", full: 70 },
      { name: "Aloo Tikki Sandwich", full: 50 },
      { name: "Bread Pakoda", full: 25 },
      { name: "Samosa", full: 15 }
    ]
  },

  {
    category: "Shakes",
    items: [
      { name: "Oreo Shake", full: 90 },
      { name: "Chocolate Shake", full: 90 },
      { name: "KitKat Shake", full: 100 },
      { name: "Banana Shake", full: 70 },
      { name: "Mango Shake", full: 80 }
    ]
  },

  {
    category: "Tea & Coffee",
    items: [
      { name: "Tea", full: 15 },
      { name: "Hot Coffee", full: 50 },
      { name: "Cold Coffee", full: 90 },
      { name: "Cold Coffee with Ice Cream", full: 120 }
    ]
  }
];

// =======================
// CART
// =======================
let cart = [];

// =======================
// RENDER MENU
// =======================
const menuDiv = document.getElementById("menu");

menuData.forEach(section => {
  const sectionDiv = document.createElement("div");
  sectionDiv.innerHTML = `<h2>${section.category}</h2>`;
  sectionDiv.style.marginTop = "20px";

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(160px, 1fr))";
  grid.style.gap = "12px";

  section.items.forEach(item => {
    const price = item.full;
    const card = document.createElement("div");
    card.className = "card";
    card.style.background = "#1e1e1e";
    card.style.padding = "10px";
    card.style.borderRadius = "8px";
    card.style.textAlign = "center";

    card.innerHTML = `
      <h4>${item.name}</h4>
      <p>₹${price}</p>
      <button>Add</button>
    `;

    card.querySelector("button").onclick = () => {
      cart.push({ name: item.name, price });
      alert(item.name + " added");
    };

    grid.appendChild(card);
  });

  sectionDiv.appendChild(grid);
  menuDiv.appendChild(sectionDiv);
});

// =======================
// PLACE ORDER
// =======================
document.getElementById("placeOrderBtn").onclick = () => {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  orders.push({
    table: tableNo,
    items: cart,
    status: "New",
    time: new Date().toLocaleString()
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  cart = [];

  alert("Order placed successfully!");
};
