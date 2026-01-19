("use strict");

// --- IMPORTS ---

import { addToCart, updateCartCount } from "../cart/index.js";

// --- DOM ---
const container = document.querySelector("#productContainer");
const API_URL = "https://v2.api.noroff.dev/square-eyes";

// --- FETCH ---
async function fetchAndCreateProducts() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      container.textContent = "No product ID found";
      return;
    }

    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    const product = data.data;

    // --- CREATE ELEMENTS ---
    const image = document.createElement("img");
    const title = document.createElement("h1");
    const description = document.createElement("p");
    const price = document.createElement("p");
    const genre = document.createElement("p");
    const released = document.createElement("p");
    const rating = document.createElement("p");
    const button = document.createElement("button");

    // --- SET CONTENT ---
    image.src = product.image.url;
    image.alt = product.image.alt || product.title;

    title.textContent = product.title;
    description.textContent = product.description;
    description.classList.add("description");

    price.textContent = `Price: ${product.price.toFixed(2)} NOK`;
    price.classList.add("price");

    genre.textContent = `Genre: ${product.genre}`;
    released.textContent = `Released: ${product.released}`;
    rating.textContent = `Rating: ${product.rating}`;
    button.textContent = "Add to cart";

    // --- EVENT LISTENERS ---
    button.addEventListener("click", () => {
      addToCart(product);
      updateCartCount();
    });

    // --- APPEND TO DOM ---
    container.appendChild(image);
    container.appendChild(title);
    container.appendChild(genre);
    container.appendChild(released);
    container.appendChild(rating);
    container.appendChild(description);
    container.appendChild(price);
    container.appendChild(button);
  } catch (error) {
    console.error("Error fetching product", error);
  }
}

// --- INIT ---
fetchAndCreateProducts();

updateCartCount();
