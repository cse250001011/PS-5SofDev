const products = [
 { name: "Notebook", price: 50, category: "Stationery", img: "https://tiimg.tistatic.com/fp/3/008/030/glossy-cover-and-rectangular-plain-paper-writing-spiral-binding-notebook-for-office-use-183.jpg" },
{ name: "Pepsi", price: 35, category: "Beverages", img: "https://m.media-amazon.com/images/I/41iBmsXVKiL._SY300_SX300_QL70_FMwebp_.jpg" },
{ name: "Dettol Soap", price: 25, category: "Toiletries", img: "https://assets2.drugcarts.com/category/product/product1615040772675387.webp" },
{ name: "Cornetto", price: 40, category: "Ice-Cream", img: "https://www.bbassets.com/media/uploads/p/l/40062731_7-kwality-walls-cornetto-double-chocolate-frozen-dessert.jpg"},
  { name: "Maggi Noodles", price: 15, category: "Snacks", img: "https://m.media-amazon.com/images/I/812ujEPZcML._SX679_.jpg" },
  { name: "Pen", price: 10, category: "Stationery", img:"https://www.tvmkart.com/wp-content/uploads/2021/01/stylish-ball-pen-20-ball-pens1.jpg"},
  { name: "Frooti", price: 30, category: "Beverages", img: "https://m.media-amazon.com/images/I/61uLAcleBSL._SX679_.jpg" },
]
const grid = document.getElementById("product-grid");
const search = document.getElementById("search");
const cartPanel = document.getElementById("cart-panel");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const toggleModeBtn = document.getElementById("toggle-mode");
const cartIcon = document.querySelector(".cart-icon");
const closeCartBtn = document.getElementById("close-cart");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout");

let cart = [];

function displayProducts(list) {
  grid.innerHTML = "";
  list.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button class="add-btn">Add to Cart</button>
    `;
    div.querySelector(".add-btn").addEventListener("click", () => addToCart(p));
    grid.appendChild(div);
  });
}

displayProducts(products);

function addToCart(product) {
  const existing = cart.find((i) => i.name === product.name);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  updateCart();
}


function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.qty} - ₹${item.price * item.qty}
      <button title="Remove">❌</button>
    `;
    li.querySelector("button").onclick = () => removeItem(idx);
    cartItems.appendChild(li);
  });

  totalPrice.textContent = `Total: ₹${total}`;
  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}
clearCartBtn.onclick = () => {
  cart = [];
  updateCart();
};

checkoutBtn.onclick = () => {
  alert("🧾 Mock Checkout Successful! Thank you for shopping at La Fresco!");
  cart = [];
  updateCart();
  closeCart();
};


search.oninput = (e) => {
  const query = e.target.value.toLowerCase();
  displayProducts(products.filter((p) => p.name.toLowerCase().includes(query)));
};

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.onclick = () => {
    const cat = btn.dataset.category;
    displayProducts(cat === "all" ? products : products.filter((p) => p.category === cat));
  };
});

function openCart() {
  cartPanel.classList.add("active");
}

function closeCart() {
  cartPanel.classList.remove("active");
}

cartIcon.onclick = openCart;
closeCartBtn.onclick = closeCart;

toggleModeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  toggleModeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};
