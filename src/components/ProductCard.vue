<script setup lang="ts">
import useCartStore from "@/store/cart";
import type { Product } from "@/utils/types";
import { ShoppingCart } from "lucide-vue-next";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const { product } = defineProps<{ product: Product }>();
const showImage = ref(false);
const cartStore = useCartStore();

function handleLoadImage() {
  showImage.value = true;
}
</script>
<template>
  <div class="group card relative bg-base-100 card-sm">
    <figure v-show="showImage">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        @load="handleLoadImage"
      />
    </figure>
    <div class="h-52 w-full skeleton" v-show="!showImage" />
    <div class="card-body">
      <router-link :to="`/product/${product.id}`">
        <h2 class="card-title line-clamp-1 group-hover:link">
          {{ product.title }}
        </h2>
      </router-link>

      <div class="card-actions items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-lg font-semibold"
            >${{ product.price.toFixed(2) }}</span
          >
          <div class="badge-soft badge badge-warning">
            {{ Math.round(product.discountPercentage) }}% Off
          </div>
        </div>
        <button
          class="btn btn-square btn-soft btn-primary"
          @click="cartStore.addToCart({ ...product, quantity: 1 })"
        >
          <ShoppingCart :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>
