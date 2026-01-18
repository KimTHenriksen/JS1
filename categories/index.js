"use strict";

const container = document.querySelector("#productsContainer");
const filter = document.querySelector("#genreFilter");

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
    link.href = `../product/index.html?id=${product.id}`;

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
    container.textContent = "Loading...";

    const response = await fetch(API_URL);
    const data = await response.json();

    allProducts = data.data;
    renderProducts(allProducts);
  } catch (error) {
    container.textContent = "Could not load products";
  }
}

// --- FILTER ---
filter.addEventListener("change", () => {
  const selectedGenre = filter.value;

  if (selectedGenre === "all") {
    renderProducts(allProducts);
    return;
  }

  const filteredProducts = allProducts.filter((product) =>
    product.genre.includes(selectedGenre),
  );

  renderProducts(filteredProducts);
});

// --- INIT ---
fetchProducts();
