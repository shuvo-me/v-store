<script setup lang="ts">
import useCartStore from "@/store/cart";
import type { Product } from "@/utils/types";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ShoppingBasket } from "lucide-vue-next";
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
      product.value = (await response.json()) as Product;
      src.value = product.value.thumbnail;
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    // router.push('/'); // Redirect to home if product not found
  }
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex items-center justify-between">
      <div class="breadcrumbs text-sm">
        <ul>
          <li><router-link to="/">Products</router-link></li>
          <li>
            <a>{{ product?.title }}</a>
          </li>
        </ul>
      </div>
      <button
        @click="$router.push('/cart')"
        class="btn relative btn-square btn-soft btn-warning"
      >
        <ShoppingBasket :size="20" />
        <span
          v-if="cartStore.cartItems.length"
          class="absolute -top-2.5 -right-2.5 badge badge-ghost badge-warning"
          >{{ cartStore.cartItems.length }}</span
        >
      </button>
    </div>

    <div class="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
      <div v-if="showImageSkeleton">
        <div class="h-[448px] w-full skeleton" />
        <div class="mt-4 flex flex-wrap items-center gap-2">
          <div class="h-16 w-16 skeleton" v-for="n in 4" :key="n" />
        </div>
      </div>
      <div v-show="!showImageSkeleton">
        <img
          :src="src"
          alt="Product Image"
          class="w-full max-w-md"
          @load="showImageSkeleton = false"
        />

        <div class="mt-4 flex flex-wrap items-center gap-2">
          <img
            :src="image"
            alt=""
            v-for="image in product?.images"
            :key="image"
            class="h-16 w-16 cursor-pointer rounded-md border border-base-300 object-cover"
            @click="src = image"
          />
        </div>
      </div>
      <div class="spacey-4 flex flex-col" v-if="product">
        <h1 class="mb-4 text-2xl font-bold">{{ product?.title }}</h1>
        <p class="relative mb-4">
          {{
            showMore ? product?.description : product?.description.slice(0, 600)
          }}
          <span
            class="badge-soft badge cursor-pointer badge-info"
            role="button"
            @click="showMore = !showMore"
            v-if="(product?.description as string)?.length > 600"
          >
            {{ showMore ? "Show Less" : "Show More.." }}
          </span>
        </p>
        <div class="mb-4 flex items-center gap-2">
          <span class="text-lg font-semibold"
            >${{ product?.price?.toFixed(2) }}</span
          >
          <div class="badge-soft badge badge-warning">
            {{ Math.round(product?.discountPercentage || 0) }}% Off
          </div>
        </div>
        <div class="mb-4 flex items-center gap-2">
          <span class="text-sm text-gray-500">Rating:</span>
          <span class="text-lg font-semibold">{{
            product?.rating?.toFixed(1)
          }}</span>
          <span class="badge-soft badge badge-success"
            >{{ product?.stock }} in stock</span
          >
        </div>
        <div class="mt-auto flex items-center gap-6">
          <button
            class="btn flex-1/2 btn-primary"
            @click="cartStore.addToCart({ ...product, quantity: 1 })"
          >
            Add To Cart
          </button>
          <button
            class="btn flex-1/2 btn-primary"
            @click="$router.push('/checkout')"
            :disabled="!cartStore.cartItems.length"
          >
            Checkout
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-4" v-else>
        <div class="h-4 w-full skeleton"></div>
        <div class="h-10 w-full skeleton"></div>

        <div class="h-4 w-full skeleton"></div>
        <div class="h-4 w-full skeleton"></div>
        <div class="h-4 w-full skeleton"></div>
        <div class="h-4 w-full skeleton"></div>
        <div class="h-4 w-full skeleton"></div>
      </div>
    </div>
  </div>
</template>
