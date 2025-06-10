<script setup lang="ts">
import type { Product } from '@/utils/types';
import { computed, ref, watch } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { SearchIcon, ShoppingBasket, X } from 'lucide-vue-next'
import useCartStore from '@/store/cart';
import { RouterLink } from 'vue-router';
// import { useAuthStore } from '@/store';
// import router from '@/router';

//state
const products = ref<Product[]>([]);
const loading = ref<Boolean>(true);
const searchTerm = ref<string>('');
const selectedCategory = ref<string>('');
const limit = 10;
const skip = ref<number>(0);
const totalItem = ref<number>(194);
const cartStore = useCartStore();
// const isLoggingOut = ref<boolean>(false);
// const authStore = useAuthStore();
// const theme = ref<boolean>(true);

//computed
const totalPages = computed(() => {
    return Math.ceil(totalItem.value / limit);
})

//watchers
// watch(theme, (newTheme) => {
//     if (newTheme) {
//         document.documentElement.setAttribute('data-theme', 'dark');
//         localStorage.setItem('theme', 'dark');
//     } else {
//         document.documentElement.setAttribute('data-theme', 'cupcake');
//         localStorage.setItem('theme', 'cupcake');
//     }

// }, { immediate: true });

watch([searchTerm, skip], ([newTerm, newSkip]) => {
    loading.value = true;
    products.value = [];
    if (newTerm) skip.value = 0; // Reset skip if search term changes
    if (newSkip) searchTerm.value = ''; // Ensure skip is not negative
    let timer;
    clearTimeout(timer);
    timer = setTimeout(async () => {
        try {
            // Clear previous products
            const response = await fetch(`https://dummyjson.com/products/search?q=${newTerm}&limit=10&skip=${newSkip}`);
            if (response.ok) {
                const data = await response.json();
                products.value = data.products as Product[];
            } else {
                throw new Error('Failed to fetch products');
            }
        } catch (error) {
            console.log('Error fetching products:', error);
        }
        finally {
            loading.value = false;
        }
    }, 300);
}, { immediate: true });

// async function logout() {
//     isLoggingOut.value = true;
//     try {
//         await authStore.logout();
//         router.push('/login');
//     } catch (error) {
//         console.error('Logout failed:', error);
//     } finally {
//         isLoggingOut.value = false;
//     }
// }

</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col lg:flex-row items-center justify-between mb-8 ">
            <div class="shrink-0">
                <h1 class="text-2xl font-bold mb-4">Products</h1>
                <p class="text-gray-600 mb-6">Explore our collection of products.</p>
            </div>
            <div class="flex items-center justify-end gap-4 flex-wrap sm:flex-nowrap">
                <label class="input min-w-[200px]">
                    <input type="text" placeholder="Search products" v-model="searchTerm"
                        :disabled="!!selectedCategory" />
                    <span class="label" v-if="!searchTerm">
                        <SearchIcon :size="16" />
                    </span>
                    <span class="label cursor-pointer" v-else @click="searchTerm = ''">
                        <X :size="16" />
                    </span>
                </label>
                <router-link to="/cart" class="btn  btn-soft btn-warning btn-square  relative">
                    <ShoppingBasket :size="20" />
                    <span v-if="cartStore.cartItems.length"
                        class="badge badge-ghost badge-warning absolute -top-2.5 -right-2.5">{{
                            cartStore.cartItems.length
                        }}</span>
                </router-link>

                <!-- <label class="toggle text-base-content ">
                    <input type="checkbox" v-model="theme" class="theme-controller" />

                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none"
                            stroke="currentColor">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2"></path>
                            <path d="M12 20v2"></path>
                            <path d="m4.93 4.93 1.41 1.41"></path>
                            <path d="m17.66 17.66 1.41 1.41"></path>
                            <path d="M2 12h2"></path>
                            <path d="M20 12h2"></path>
                            <path d="m6.34 17.66-1.41 1.41"></path>
                            <path d="m19.07 4.93-1.41 1.41"></path>
                        </g>
                    </svg>

                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none"
                            stroke="currentColor">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </g>
                    </svg>

                </label> -->
                <!-- <button class="btn btn-info" :disabled="isLoggingOut" @click="logout">
                    Logout
                    <span class=" loading-spinner loading loading-xs " v-if="isLoggingOut"></span>
                </button> -->
            </div>
        </div>
        <div class="flex flex-col">
            <div v-if="loading"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <div class="flex  flex-col gap-4" v-for="n in 10" :key="n">
                    <div class="skeleton h-48 w-full"></div>
                    <div class="skeleton h-4 w-full"></div>
                    <div class="skeleton h-4 w-full"></div>
                    <div class="skeleton h-4 w-full"></div>
                </div>
            </div>
            <div v-else-if="!products.length && !loading" class="text-center text-gray-500 py-8">
                <p>No products found.</p>
            </div>
            <div v-else class="space-y-8 flex-grow flex flex-col">
                <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    <product-card :product="product" v-for="product in products" :key="product.id" />
                </div>
                <div class="join flex-wrap justify-center w-full mt-auto">
                    <button :class="{ 'join-item btn': true, 'btn-active': page === (skip / limit) + 1 }" type="button"
                        @click="skip = (page * limit) - limit" v-for="page in totalPages" :key="page">
                        {{ page }}
                    </button>
                </div>
            </div>
        </div>

    </div>

</template>