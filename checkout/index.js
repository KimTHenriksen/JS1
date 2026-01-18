"use strict";

// --- IMPORTS ---
import {
  getCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../cart/index.js";

// --- DOM ---
const container = document.querySelector("#checkoutContainer");
const confirmBtn = document.querySelector("#confirmOrderBtn");

// --- FUNCTIONS ---
function renderCart() {
  const cart = getCart();
  container.innerHTML = "";

  // --- EMPTY CART ---
  if (cart.length === 0) {
    container.textContent = "Your cart is empty";
    confirmBtn.style.display = "none";
    return;
  }

  confirmBtn.style.display = "block";

  let total = 0;

  cart.forEach((item) => {
    const div = document.createElement("div");

    const title = document.createElement("h3");
    const price = document.createElement("p");

    const controls = document.createElement("div");
    controls.classList.add("quantity-controls");

    const decreaseBtn = document.createElement("button");
    const quantity = document.createElement("span");
    const increaseBtn = document.createElement("button");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    removeBtn.classList.add("remove-btn");

    title.textContent = item.title;
    price.textContent = `Price: ${item.price.toFixed(2)} NOK`;

    decreaseBtn.textContent = "-";
    quantity.textContent = item.quantity;
    increaseBtn.textContent = "+";

    decreaseBtn.addEventListener("click", () => {
      decreaseQuantity(item.id);
      renderCart();
    });

    increaseBtn.addEventListener("click", () => {
      increaseQuantity(item.id);
      renderCart();
    });

    removeBtn.addEventListener("click", () => {
      removeFromCart(item.id);
      renderCart();
    });

    controls.append(decreaseBtn, quantity, increaseBtn);

    total += item.price * item.quantity;

    div.append(title, price, controls, removeBtn);
    container.appendChild(div);
  });

  const totalEl = document.createElement("p");
  totalEl.textContent = `Total: ${total.toFixed(2)} NOK`;
  totalEl.classList.add("total");
  container.appendChild(totalEl);
}

if (confirmBtn) {
  confirmBtn.addEventListener("click", () => {
    window.location.href = "confirmation/index.html";
  });
}

// --- INIT ---
renderCart();
