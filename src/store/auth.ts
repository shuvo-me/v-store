import { defineStore } from "pinia";
import { ref } from "vue";

const useAuthStore = defineStore("auth", () => {
  const userInfo = JSON.parse(localStorage.getItem("user") || "null");
  const isAuthenticated = ref<boolean>(userInfo ? true : false);
  const user = ref<Object | null>(null);

  function login(userData: {
    email: string;
    password: string;
  }): Promise<{ email: string; password: string }> {
    // Simulate an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password) {
          isAuthenticated.value = true;
          user.value = { username: "admin" };
          localStorage.setItem("user", JSON.stringify(userData));
          resolve({ ...userData });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  }

  function logout(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        isAuthenticated.value = false;
        user.value = null;
        localStorage.removeItem("user");
        resolve(true);
      }, 1000);
    });
  }

  return { isAuthenticated, user, login, logout };
});

export default useAuthStore;
