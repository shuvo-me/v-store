<script setup lang="ts">
import useCartStore from '@/store/cart';
import type { Product } from '@/utils/types';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ShoppingBasket } from 'lucide-vue-next';
const product = ref<Product>();
const route = useRoute();
const showMore = ref(false);
const cartStore = useCartStore();
const src = ref<string>();
const showImageSkeleton = ref<boolean>(true);

onMounted(async () => {

    const productId = route.params.productId as string;

    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (response.ok) {
            product.value = await response.json() as Product;
            src.value = product.value.thumbnail;
        } else {
            throw new Error('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        // router.push('/'); // Redirect to home if product not found
    }
});
</script>

<template>
    <div class="container px-4 py-8 mx-auto ">
        <div class="flex items-center justify-between ">
            <div class="breadcrumbs text-sm">
                <ul>
                    <li><router-link to="/">Products</router-link></li>
                    <li><a>{{ product?.title }}</a></li>
                </ul>
            </div>
            <button @click="$router.push('/cart')" class="btn  btn-soft btn-warning btn-square  relative">
                <ShoppingBasket :size="20" />
                <span v-if="cartStore.cartItems.length"
                    class="badge badge-ghost badge-warning absolute -top-2.5 -right-2.5">{{
                        cartStore.cartItems.length
                    }}</span>
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
            <div v-if="showImageSkeleton">
                <div class="skeleton w-full  h-[448px]" />
                <div class="mt-4 flex flex-wrap gap-2 items-center">

                    <div class="skeleton w-16 h-16" v-for="n in 4" :key="n" />
                </div>
            </div>
            <div v-show="!showImageSkeleton">
                <img :src="src" alt="Product Image" class="w-full max-w-md" @load="showImageSkeleton = false" />

                <div class="mt-4 flex flex-wrap gap-2 items-center">
                    <img :src="image" alt="" v-for="image in product?.images" :key="image"
                        class="w-16 h-16 object-cover rounded-md  cursor-pointer border border-base-300"
                        @click="src = image" />
                </div>
            </div>
            <div class="spacey-4 flex flex-col" v-if="product">
                <h1 class="text-2xl font-bold mb-4">{{ product?.title }}</h1>
                <p class="mb-4 relative">
                    {{ showMore ? product?.description : product?.description.slice(0, 600) }}
                    <span class="badge badge-soft badge-info cursor-pointer " role="button"
                        @click="showMore = !showMore" v-if="(product?.description as string)?.length > 600">
                        {{ showMore ? 'Show Less' : 'Show More..' }}
                    </span>
                </p>
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-lg font-semibold">${{ product?.price?.toFixed(2) }}</span>
                    <div class="badge badge-soft badge-warning">{{ Math.round(product?.discountPercentage || 0) }}% Off
                    </div>
                </div>
                <div class="flex items-center gap-2 mb-4">
                    <span class="text-sm text-gray-500">Rating:</span>
                    <span class="text-lg font-semibold">{{ product?.rating?.toFixed(1) }}</span>
                    <span class="badge badge-soft badge-success">{{ product?.stock }} in stock</span>

                </div>
                <div class="flex items-center mt-auto gap-6">
                    <button class="btn btn-primary flex-1/2"
                        @click="cartStore.addToCart({ ...product, quantity: 1 })">Add
                        To Cart</button>
                    <button class="btn btn-primary flex-1/2" @click="$router.push('/checkout')"
                        :disabled="!cartStore.cartItems.length">Checkout</button>
                </div>

            </div>
            <div class="flex  flex-col gap-4" v-else>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-10 w-full"></div>

                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-full"></div>
            </div>
        </div>
    </div>
</template>