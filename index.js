"use strict";

const container = document.querySelector("#productsContainer");
const searchInput = document.querySelector("#searchInput");

const API_URL = "https://v2.api.noroff.dev/square-eyes";

let allProducts = [];

// --- RENDER ---

function renderProducts(products) {
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    const image = document.createElement("img");

    image.src = product.image.url;
    image.alt = product.image.alt || product.title;

    const link = document.createElement("a");
    link.href = `product/index.html?id=${product.id}`;

    card.appendChild(image);
    link.appendChild(card);
    container.appendChild(link);
  });
}

// --- FETCH ---
async function fetchAndCreateProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    allProducts = data.data;
    renderProducts(allProducts);
  } catch (error) {
    console.error("Error fetching products", error);
  }
}

// --- SEARCH ---
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchValue),
  );

  renderProducts(filteredProducts);
});

// --- INIT ---
fetchAndCreateProducts();
