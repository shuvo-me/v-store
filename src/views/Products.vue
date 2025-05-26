<script setup lang="ts">
import type { Product } from '@/utils/types';
import { onMounted, ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';



const products = ref<Product[]>([]);
const loading = ref<Boolean>(true);

onMounted(async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        if (response.ok) {
            products.value = await response.json().then(data => data.products);
            console.log({ p: products.value })
        } else {
            throw new Error('Failed to fetch products');
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {

        setTimeout(() => {
            loading.value = false;
        }, 1000); // Simulate a delay for loading state
    }

})
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-4">Products</h1>
        <p class="text-gray-600 mb-6">Explore our collection of products.</p>
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <div class="flex  flex-col gap-4" v-for="n in 10" :key="n">
                <div class="skeleton h-32 w-full"></div>
                <div class="skeleton h-4 w-28"></div>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-full"></div>
            </div>
        </div>
        <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" v-else>

            <product-card :product="product" v-for="product in products" :key="product.id" />
        </div>
    </div>

</template>