<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "@/store";
import { useRoute, useRouter, type RouteLocationRaw } from "vue-router";

const loginInfo = reactive({
  email: "admin@example.com",
  password: "12345678",
});
const loading = ref(false);
const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();

async function handleLogin() {
  // Handle login logic here
  loading.value = true;

  try {
    const response = await authStore.login(loginInfo);
    if (response.email)
      router.push((route.query.redirect as RouteLocationRaw) || "/");
  } catch (error) {
    console.error("Login failed:", error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center bg-base-100">
    <div class="card-bordered card w-full max-w-sm">
      <div class="card-body">
        <h1 class="mb-2 card-title justify-center text-3xl">Product Shop</h1>
        <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
          <label class="form-control w-full">
            <span class="label">*Email</span>
            <input
              type="email"
              id="email"
              v-model="loginInfo.email"
              required
              class="input-bordered input w-full"
              autocomplete="username"
            />
          </label>
          <label class="form-control w-full">
            <span class="label">*Password</span>
            <input
              type="password"
              min="8"
              max="10"
              id="password"
              v-model="loginInfo.password"
              required
              class="input-bordered input w-full"
              autocomplete="current-password"
            />
          </label>
          <button
            type="submit"
            class="btn flex w-full items-center justify-center btn-primary"
            :disabled="loading"
          >
            <span v-if="!loading">Login</span>
            <span v-else class="loading loading-sm loading-spinner"></span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
