// ===== TABLE NUMBER FROM QR =====
const urlParams = new URLSearchParams(window.location.search);
const tableNo = urlParams.get("table") || "N/A";
document.getElementById("tableInfo").innerHTML = `<b>Table No:</b> ${tableNo}`;

// ===== MASTER MENU DATA (FROM POSTER) =====
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
      { name: "Paneer Steam Momos", half: 50, full: 100 }
    ]
  },

  {
    category: "Dosa",
    items: [
      { name: "Plain Dosa", price: 60 },
      { name: "Masala Dosa", price: 80 },
      { name: "Onion Dosa", price: 100 },
      { name: "Paneer Dosa", price: 120 },
      { name: "Veg Uttapam", price: 120 },
      { name: "Sambar Vada (1 Pc)", price: 30 },
      { name: "Idli Sambar", price: 30 }
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
      { name: "Mushroom Pizza", price: 160 },
      { name: "Special Cheese Pizza", price: 200 }
    ]
  },

  {
    category: "Soup",
    items: [
      { name: "Veg Soup", price: 50 },
      { name: "Tomato Soup", price: 30 },
      { name: "Hot & Sour Soup", price: 80 },
      { name: "American Soup", price: 100 }
    ]
  },

  {
    category: "Sandwich",
    items: [
      { name: "Veg Sandwich", price: 40 },
      { name: "Paneer Sandwich", price: 80 },
      { name: "Sweet Corn Sandwich", price: 70 },
      { name: "Aloo Tikki Sandwich", price: 50 },
      { name: "Khasta Papdi", price: 25 },
      { name: "Samosa", price: 15 }
    ]
  },

  {
    category: "Shake",
    items: [
      { name: "Oreo Shake", price: 90 },
      { name: "Chocolate Shake", price: 90 },
      { name: "KitKat Shake", price: 100 },
      { name: "Banana Shake", price: 70 },
      { name: "Mango Shake", price: 80 }
    ]
  },

  {
    category: "Hot & Cold",
    items: [
      { name: "Hot Coffee", price: 50 },
      { name: "Cold Coffee", price: 90 },
      { name: "Tea", price: 15 },
      { name: "Cold Coffee + Ice Cream", price: 120 }
    ]
  },

  {
    category: "Combos",
    items: [
      { name: "Combo 1 (Rice + Manchurian Gravy)", price: 120 },
      { name: "Combo 2 (Noodles + Chilli Paneer)", price: 150 },
      { name: "Combo 3 (Noodles + Manchurian Gravy)", price: 100 }
    ]
  }
];

// ===== CART =====
let cart = [];

// ===== RENDER MENU =====
function renderMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  menuData.forEach(section => {
    const sectionDiv = document.createElement("div");
    sectionDiv.innerHTML = `<h2>${section.category}</h2>`;
    sectionDiv.className = "category";

    const itemsGrid = document.createElement("div");
    itemsGrid.className = "menu-grid";

    section.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "menu-card";

      let priceHTML = "";
      if (item.half) {
        priceHTML = `₹${item.half} / ₹${item.full}`;
      } else {
        priceHTML = `₹${item.price}`;
      }

      card.innerHTML = `
        <h4>${item.name}</h4>
        <p>${priceHTML}</p>
        <button>Add</button>
      `;

      card.querySelector("button").onclick = () => addToCart(item);
      itemsGrid.appendChild(card);
    });

    sectionDiv.appendChild(itemsGrid);
    menuDiv.appendChild(sectionDiv);
  });
}

// ===== ADD TO CART =====
function addToCart(item) {
  cart.push({
    name: item.name,
    price: item.price || item.full || item.half
  });
  alert(`${item.name} added`);
}

// ===== PLACE ORDER =====
document.getElementById("placeOrderBtn").onclick = () => {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders") || "[]");

  orders.push({
    table: tableNo,
    items: cart,
    status: "New",
    time: new Date().toLocaleString()
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  cart = [];

  alert("Order placed successfully");
};

// ===== INIT =====
renderMenu();
