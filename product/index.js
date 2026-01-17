"use strict";

const container = document.querySelector("#productContainer");
const API_URL = "https://v2.api.noroff.dev/square-eyes";

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

    const image = document.createElement("img");
    const title = document.createElement("h1");
    const description = document.createElement("p");
    const price = document.createElement("p");

    image.src = product.image.url;
    image.alt = product.image.alt || product.title;
    title.textContent = product.title;
    description.textContent = product.description;
    price.textContent = `${product.price} NOK`;

    container.appendChild(image);
    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(price);
  } catch (error) {
    console.error("Error fetching product", error);
  }
}
fetchAndCreateProducts();
