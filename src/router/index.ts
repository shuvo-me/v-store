import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store";

const routes = [
  {
    path: "/",
    name: "products",
    component: () => import("../views/Products.vue"),
    meta: {
      title: "Products",
      requireAuth: false,
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      title: "Cart",
      requireAuth: false,
    },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../views/Checkout.vue"),
    meta: {
      title: "Checkout",
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Login",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Set the document title
  if (to.meta.title) {
    // document.title = to.meta.title
    document.title = `${to.meta.title} | Product Shop`;
  }

  // Check if the route requires authentication
  const { isAuthenticated } = useAuthStore();
  console.log({ isAuthenticated });
  if (to.meta.requireAuth && !isAuthenticated) {
    next({ name: "login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
