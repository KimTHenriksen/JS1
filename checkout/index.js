"use strict";

import { getCart, removeFromCart } from "../cart/index.js";

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
    const quantity = document.createElement("p");
    const button = document.createElement("button");

    title.textContent = item.title;
    price.textContent = `Price: ${item.price} NOK`;
    quantity.textContent = `Quantity: ${item.quantity}`;
    button.textContent = "Remove";

    button.addEventListener("click", () => {
      removeFromCart(item.id);
      renderCart();
    });

    total += item.price * item.quantity;

    div.append(title, price, quantity, button);
    container.appendChild(div);
  });

  const totalEl = document.createElement("p");
  totalEl.textContent = `Total: ${total} NOK`;
  container.appendChild(totalEl);
}

renderCart();
