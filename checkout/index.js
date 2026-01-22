"use strict";

// --- IMPORTS ---
import {
  getCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateCartCount,
} from "../cart/index.js";

// --- DOM ---
const container = document.querySelector("#checkoutContainer");
const form = document.querySelector("#checkout-form");

//--- FORM VALIDATION ---
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");

    const fullNameError = document.getElementById("fullName-error");
    const emailError = document.getElementById("email-error");

    fullNameError.textContent = "";
    emailError.textContent = "";

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();

    let isValid = true;

    if (fullName === "") {
      fullNameError.textContent = "Full name is required.";
      isValid = false;
    }

    if (!email.includes("@")) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (isValid) {
      localStorage.removeItem("cart");
      window.location.href = "../checkout/confirmation/index.html";
    }
  });
}

// --- RENDER CART ---
function renderCart() {
  const cart = getCart();
  container.innerHTML = "";

  // --- EMPTY CART ---
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

    // --- EVENT LISTENER ---
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

  // --- TOTAL ---
  const totalEl = document.createElement("p");
  totalEl.textContent = `Total: ${total.toFixed(2)} NOK`;
  totalEl.classList.add("total");
  container.appendChild(totalEl);
}

// --- INIT ---
renderCart();

updateCartCount();
