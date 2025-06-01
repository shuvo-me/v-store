import type { Product } from "@/utils/types";
import { defineStore } from "pinia";
import { ref } from "vue";

const useCartStore = defineStore("cart", () => {
  const sessionCartItems = JSON.parse(
    sessionStorage.getItem("cart") || "[]",
  ) as Product[];
  const cartItems = ref<Product[]>(sessionCartItems ?? []);

  function addToCart(item: Product) {
    cartItems.value.push(item);
    sessionStorage.setItem("cart", JSON.stringify(cartItems.value));
  }

  function removeFromCart(itemId: number) {
    cartItems.value = cartItems.value.filter((item) => item.id !== itemId);
    sessionStorage.setItem("cart", JSON.stringify(cartItems.value));
  }

  function clearCart() {
    cartItems.value = [];
    sessionStorage.removeItem("cart");
  }

  return { cartItems, addToCart, removeFromCart, clearCart };
});

export default useCartStore;
