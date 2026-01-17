"use strict";

const CART_KEY = "cart";

// --- GET CART ---
export function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

// --- SAVE CART ---
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// --- ADD TO CART ---
export function addToCart(product) {
  const cart = getCart();

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  }

  saveCart(cart);
}

// --- REMOVE FROM CART ---
export function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);

  saveCart(cart);
}

// --- INCREASE QUANTITY ---
export function increaseQuantity(id) {
  const cart = getCart();
  const item = cart.find((item) => item.id === id);

  if (item) {
    item.quantity += 1;
    saveCart(cart);
  }
}

// --- DECREASE QUANTITY ---
export function decreaseQuantity(id) {
  const cart = getCart();
  const item = cart.find((item) => item.id === id);

  if (!item) return;

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    const index = cart.findIndex((i) => i.id === id);
    cart.splice(index, 1);
  }

  saveCart(cart);
}
