<script setup lang="ts">
import type { Product } from '@/utils/types';
import { ShoppingCart } from 'lucide-vue-next';

const { product } = defineProps<{ product: Product }>();

</script>
<template>

    <div class="card card-sm bg-base-100  shadow-sm relative">

        <figure>
            <img loading="lazy" :src="product.thumbnail" :alt="product.title" />
        </figure>
        <div class="card-body">
            <h2 class="card-title line-clamp-1">{{ product.title }}</h2>
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