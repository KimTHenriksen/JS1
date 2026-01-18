"use strict";

const container = document.querySelector("#productsContainer");
const API_URL = "https://v2.api.noroff.dev/square-eyes";

async function fetchAndCreateProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const products = data.data;

    products.forEach((product) => {
      const card = document.createElement("div");
      const image = document.createElement("img");

      image.src = product.image.url;
      image.alt = product.image.alt || product.title;

      card.appendChild(image);

      const link = document.createElement("a");
      link.href = `product/index.html?id=${product.id}`;

      link.appendChild(card);
      container.appendChild(link);
    });
  } catch (error) {
    console.error("Error fetching products", error);
  }
}

fetchAndCreateProducts();
