"use strict";

import {
  getCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../cart/index.js";

const container = document.querySelector("#checkoutContainer");

function renderCart() {
  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.textContent = "Your cart is empty";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const div = document.createElement("div");

    const title = document.createElement("h3");
    const price = document.createElement("p");

    const controls = document.createElement("div");
    const decreaseBtn = document.createElement("button");
    const quantity = document.createElement("span");
    const increaseBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    title.textContent = item.title;
    price.textContent = `Price: ${item.price} NOK`;

    decreaseBtn.textContent = "-";
    quantity.textContent = item.quantity;
    increaseBtn.textContent = "+";
    removeBtn.textContent = "Remove";

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
  totalEl.textContent = `Total: ${total} NOK`;
  container.appendChild(totalEl);
}

renderCart();
