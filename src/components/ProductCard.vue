<script setup lang="ts">
import type { Product } from '@/utils/types';
import { ShoppingCart } from 'lucide-vue-next';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const { product } = defineProps<{ product: Product }>();
const showImage = ref(false);

function handleLoadImage() {
    showImage.value = true;
}

</script>
<template>

    <div class="card card-sm bg-base-100 relative group">
        <figure v-show="showImage">
            <img :src="product.thumbnail" :alt="product.title" @load="handleLoadImage" />
        </figure>
        <div class="skeleton h-52 w-full" v-show="!showImage" />
        <div class="card-body">
            <router-link :to="`/product/${product.id}`">
                <h2 class="card-title line-clamp-1 group-hover:link">{{ product.title }}</h2>
            </router-link>

            <div class="card-actions justify-between items-center">

                <div class="flex items-center gap-2">
                    <span class="text-lg font-semibold">${{ product.price.toFixed(2) }}</span>
                    <div class="badge badge-soft badge-warning ">{{ Math.round(product.discountPercentage)
                        }}% Off
                    </div>
                </div>
                <button class="btn  btn-soft btn-primary btn-square">
                    <ShoppingCart :size="20" />
                </button>
            </div>
        </div>
    </div>
</template>