<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/store';
import { useRoute, useRouter, type RouteLocationRaw } from 'vue-router';

const loginInfo = reactive({
    email: 'admin@example.com',
    password: '12345678'
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
        if (response.email) router.push(route.query.redirect as RouteLocationRaw || '/');

    } catch (error) {
        console.error('Login failed:', error);
    } finally {
        loading.value = false;
    }
}

</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen bg-base-100">
        <div class="card card-bordered  w-full max-w-sm">
            <div class="card-body">
                <h1 class="card-title justify-center text-3xl mb-2">Product Shop</h1>
                <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
                    <label class="form-control w-full">
                        <span class="label">*Email</span>
                        <input type="email" id="email" v-model="loginInfo.email" required
                            class="input input-bordered w-full" autocomplete="username" />
                    </label>
                    <label class="form-control w-full">
                        <span class="label">*Password</span>
                        <input type="password" min="8" max="10" id="password" v-model="loginInfo.password" required
                            class="input input-bordered w-full" autocomplete="current-password" />
                    </label>
                    <button type="submit" class="btn btn-primary w-full flex items-center justify-center"
                        :disabled="loading">
                        <span v-if="!loading">Login</span>
                        <span v-else class="loading loading-spinner loading-sm"></span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>