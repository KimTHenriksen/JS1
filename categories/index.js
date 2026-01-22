"use strict";

// --- IMPORTS ---
import { updateCartCount } from "../cart/index.js";

// --- DOM ---
const container = document.querySelector("#productsContainer");
const filter = document.querySelector("#genreFilter");
const message = document.querySelector("#categoryMessage");

const API_URL = "https://v2.api.noroff.dev/square-eyes";

let allProducts = [];

// --- RENDER ---
function renderProducts(products) {
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    const title = document.createElement("h3");
    const image = document.createElement("img");

    const link = document.createElement("a");
    link.href = `../products/index.html?id=${product.id}`;

    image.src = product.image.url;
    image.alt = product.image.alt || product.title;
    title.textContent = product.title;

    card.append(image, title);
    link.appendChild(card);
    container.appendChild(link);
  });
}

// --- FETCH ---
async function fetchProducts() {
  try {
    message.textContent = "Loading...";
    container.innerHTML = "";

    const response = await fetch(API_URL);
    const data = await response.json();

    allProducts = data.data;
    message.textContent = "Select a genre";
  } catch (error) {
    container.textContent = "Could not load genre";
  }
}

// --- FILTER ---
filter.addEventListener("change", () => {
  const selectedGenre = filter.value;

  if (selectedGenre === "all") {
    message.textContent = "Showing all movies";
    renderProducts(allProducts);
    return;
  }

  message.textContent = `Showing ${selectedGenre} movies`;

  const filteredProducts = allProducts.filter((product) =>
    product.genre.includes(selectedGenre),
  );

  renderProducts(filteredProducts);
});

// --- INIT ---
fetchProducts();

updateCartCount();
