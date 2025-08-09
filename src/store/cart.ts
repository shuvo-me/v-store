import type { Product } from "@/utils/types";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export type CartItemType = Product & { quantity: number };

const useCartStore = defineStore("cart", () => {
  const sessionCartItems = JSON.parse(
    sessionStorage.getItem("cart") || "[]",
  ) as CartItemType[];
  const cartItems = ref<CartItemType[]>(sessionCartItems ?? []);

  watch(
    cartItems,
    (newCartItems) => {
      if (newCartItems.length > 0) {
        sessionStorage.setItem("cart", JSON.stringify(newCartItems));
      } else {
        sessionStorage.removeItem("cart");
      }
    },
    { deep: true, immediate: true },
  );

  function addToCart(item: CartItemType) {
    const itemIndex = cartItems.value.findIndex(
      (cartItem) => cartItem.id === item.id,
    );
    if (itemIndex !== -1) {
      increaseQty(item.id);
    } else {
      cartItems.value.push({ ...item, quantity: 1 });
    }
  }

  function increaseQty(itemId: number) {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item) {
      item.quantity = (item.quantity || 1) + 1;
    }
  }

  function decreaseQty(itemId: number) {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
  }

  function removeFromCart(itemId: number) {
    cartItems.value = cartItems.value.filter((item) => item.id !== itemId);
  }

  function clearCart() {
    cartItems.value = [];
  }

  function totalPrice() {
    return cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
    totalPrice,
  };
});

export default useCartStore;
