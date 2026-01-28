const menuDiv = document.getElementById("menu");
let cart = [];

Object.keys(MENU).forEach(category=>{
  const h2 = document.createElement("h2");
  h2.innerText = category;
  menuDiv.appendChild(h2);

  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.flexWrap = "wrap";
  row.style.gap = "10px";

  MENU[category].forEach(item=>{
    const card = document.createElement("div");
    card.style.background="#222";
    card.style.padding="10px";
    card.style.width="150px";
    card.style.textAlign="center";

    card.innerHTML = `
      <img src="${item.img}" style="width:100%;height:100px;object-fit:cover">
      <b>${item.name}</b><br>
      ₹${item.price}<br>
      <button>Add</button>
    `;

    card.querySelector("button").onclick = ()=>{
      cart.push(item);
    };

    row.appendChild(card);
  });

  menuDiv.appendChild(row);
});

document.getElementById("placeOrderBtn").onclick = ()=>{
  if(cart.length===0){ alert("No items added"); return; }
  alert("Order placed (Firebase hook comes next)");
};
