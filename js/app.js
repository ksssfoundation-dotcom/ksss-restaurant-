const params = new URLSearchParams(window.location.search);
const table = params.get("table") || "Unknown";

document.getElementById("tableInfo").innerHTML = `<h3>Table ${table}</h3>`;

let menuData = JSON.parse(localStorage.getItem("menuData")) || [

  // ===== CHINESE =====
  {cat:"Chinese", name:"Veg Chowmein", price:70},
  {cat:"Chinese", name:"Paneer Chowmein", price:80},
  {cat:"Chinese", name:"Hakka Noodles", price:70},
  {cat:"Chinese", name:"Singapore Noodles", price:80},
  {cat:"Chinese", name:"Veg Fried Momos", price:60},
  {cat:"Chinese", name:"Paneer Fried Momos", price:80},
  {cat:"Chinese", name:"Veg Steam Momos", price:50},
  {cat:"Chinese", name:"Paneer Steam Momos", price:70},
  {cat:"Chinese", name:"Soyabean Momos", price:70},
  {cat:"Chinese", name:"Veg Kurkure Momos", price:70},
  {cat:"Chinese", name:"Paneer Kurkure Momos", price:90},
  {cat:"Chinese", name:"Butter Momos", price:90},
  {cat:"Chinese", name:"Paneer Butter Momos", price:110},

  // ===== FAST FOOD =====
  {cat:"Fast Food", name:"French Fries", price:70},
  {cat:"Fast Food", name:"Peri Peri Fries", price:90},
  {cat:"Fast Food", name:"Cheese Fries", price:100},
  {cat:"Fast Food", name:"Chilli Potato", price:80},
  {cat:"Fast Food", name:"Honey Chilli Potato", price:90},
  {cat:"Fast Food", name:"Spring Roll", price:70},
  {cat:"Fast Food", name:"Veg Burger", price:50},
  {cat:"Fast Food", name:"Paneer Burger", price:80},
  {cat:"Fast Food", name:"Veg Sandwich", price:60},
  {cat:"Fast Food", name:"Paneer Sandwich", price:80},

  // ===== DOSA =====
  {cat:"Dosa", name:"Plain Dosa", price:80},
  {cat:"Dosa", name:"Masala Dosa", price:100},
  {cat:"Dosa", name:"Paneer Dosa", price:120},
  {cat:"Dosa", name:"Onion Dosa", price:90},
  {cat:"Dosa", name:"Idli Sambhar", price:60},
  {cat:"Dosa", name:"Vada Sambhar", price:60},

  // ===== PIZZA =====
  {cat:"Pizza", name:"Cheese Pizza", price:120},
  {cat:"Pizza", name:"Veg Pizza", price:150},
  {cat:"Pizza", name:"Paneer Pizza", price:180},
  {cat:"Pizza", name:"Sweet Corn Pizza", price:150},
  {cat:"Pizza", name:"Spicy Cheese Pizza", price:140},

  // ===== SOUP =====
  {cat:"Soup", name:"Veg Soup", price:60},
  {cat:"Soup", name:"Tomato Soup", price:60},
  {cat:"Soup", name:"Manchow Soup", price:70},

  // ===== SHAKE =====
  {cat:"Shake", name:"Oreo Shake", price:90},
  {cat:"Shake", name:"Chocolate Shake", price:90},
  {cat:"Shake", name:"KitKat Shake", price:100},
  {cat:"Shake", name:"Banana Shake", price:70},
  {cat:"Shake", name:"Mango Shake", price:80},

  // ===== HOT & COLD =====
  {cat:"Hot & Cold", name:"Tea", price:20},
  {cat:"Hot & Cold", name:"Hot Coffee", price:40},
  {cat:"Hot & Cold", name:"Cold Coffee", price:60}
];

localStorage.setItem("menuData", JSON.stringify(menuData));

let cart = [];

function getImage(name){
  return `https://source.unsplash.com/300x200/?${encodeURIComponent(name)}`;
}

function loadMenu(){
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  let currentCat = "";
  menuData.forEach((item, i)=>{
    if(item.cat !== currentCat){
      menuDiv.innerHTML += `<h2 style="grid-column:1/-1">${item.cat}</h2>`;
      currentCat = item.cat;
    }

    menuDiv.innerHTML += `
      <div class="menu-item">
        <img src="${getImage(item.name)}">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <button onclick="addItem(${i})">Add</button>
      </div>
    `;
  });
}

function addItem(i){
  cart.push(menuData[i]);
  alert(menuData[i].name + " added");
}

document.getElementById("placeOrderBtn").onclick = ()=>{
  if(cart.length === 0){
    alert("No items selected");
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({
    table,
    items: cart,
    time: new Date().toLocaleString(),
    status:"New"
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  alert("Order placed successfully");
  cart = [];
};

loadMenu();
