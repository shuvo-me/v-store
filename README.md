# Ecom Dashboard Vue

A modern e-commerce app simulation built with **Vue.js**, **Vue Router**, **Pinia**, **Tailwind CSS 4**, **daisyUI 5** and **Typescript**

Product and cart data are powered by the [DummyJSON API](https://dummyjson.com/).

---

## ✨ Features

- **Beautiful UI**: Built with [daisyUI 5](https://daisyui.com/) components and Tailwind utility classes.
- **Modern Vue 3**: Uses `<script setup>`, Pinia for state management, and Vue Router for navigation.
- **Persistent Cart**: Cart state is saved in `sessionStorage` for a seamless shopping experience.
- **Product Search & Filter**: Search and filter products by category.
- **Responsive Design**: Fully responsive layouts using Tailwind CSS utility classes.
- **Loading Skeletons**: Uses daisyUI skeletons for smooth loading states.
- **Form Validation**: Clean, accessible forms with daisyUI fieldsets and validators.
- **Fake Data**: All product and cart data comes from [DummyJSON](https://dummyjson.com/).

---

## 🛠️ Tech Stack

- [Vue 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [daisyUI 5](https://daisyui.com/)
- [DummyJSON API](https://dummyjson.com/)

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
yarn
```

### 2. Setup Tailwind CSS & daisyUI 5

- Make sure you are using **Tailwind CSS v4**.
- In your main CSS file (e.g. `src/assets/main.css`):

  ```css
  @import "tailwindcss";
  @plugin "daisyui";
  ```

- No `tailwind.config.js` is needed for Tailwind CSS v4.

### 3. Run the app

```bash
yarn dev
```

---

## 📦 Project Structure

```
src/
  components/      # Reusable Vue components (ProductCard, etc.)
  store/           # Pinia stores (cart, auth, etc.)
  views/           # Page views (Products, Cart, Checkout, Login)
  utils/           # Types and helpers
  assets/          # Static assets and CSS
```

---

## 🖌️ UI & Design

- All UI is built using **daisyUI 5** components and Tailwind utility classes.
- No custom CSS is used unless absolutely necessary.
- Colors use daisyUI semantic color names for theme support.
- Layouts are responsive using Tailwind's responsive utility classes.

---

## 🛒 Cart Persistence

- Cart items are stored in `sessionStorage` via a Pinia store watcher:
  ```ts
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
  ```

---

## 🌐 API

- Product and cart data are fetched from [DummyJSON](https://dummyjson.com/).
- No backend setup required.

---

## 📚 Resources

- [daisyUI 5 Docs](https://daisyui.com/)
- [Tailwind CSS 4 Docs](https://tailwindcss.com/docs/)
- [Vue 3 Docs](https://vuejs.org/guide/introduction.html)
- [Pinia Docs](https://pinia.vuejs.org/)
- [DummyJSON API](https://dummyjson.com/)

---

> Built with ❤️ using Vue 3, Tailwind CSS 4, and daisyUI 5.
