<script setup lang="ts">
import type { Product } from '@/utils/types';
import { computed, ref, watch } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { SearchIcon, ShoppingBasket, X } from 'lucide-vue-next'

//state
const products = ref<Product[]>([]);
const loading = ref<Boolean>(true);
const searchTerm = ref<string>('');
const selectedCategory = ref<string>('');
const limit = 10;
const skip = ref<number>(0);
const totalItem = ref<number>(194);

//computed
const totalPages = computed(() => {
    return Math.ceil(totalItem.value / limit);
})

//watchers
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

</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-8 flex-wrap">
            <div class="shrink-0">
                <h1 class="text-2xl font-bold mb-4">Products</h1>
                <p class="text-gray-600 mb-6">Explore our collection of products.</p>
            </div>
            <div class="flex items-center gap-4 ">
                <label class="input md:min-w-[300px]">
                    <input type="text" placeholder="Search products" v-model="searchTerm"
                        :disabled="!!selectedCategory" />
                    <span class="label" v-if="!searchTerm">
                        <SearchIcon :size="16" />
                    </span>
                    <span class="label cursor-pointer" v-else @click="searchTerm = ''">
                        <X :size="16" />
                    </span>
                </label>
                <button class="btn  btn-soft btn-warning btn-square">
                    <ShoppingBasket :size="20" />
                </button>
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