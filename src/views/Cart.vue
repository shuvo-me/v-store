<script setup lang="ts">
import useCartStore from '@/store/cart';
import { Minus, Plus, Trash, ArrowLeft } from 'lucide-vue-next'

const cartStore = useCartStore();

</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-8 flex-wrap">
            <div class="shrink-0">
                <h1 class="text-2xl font-bold mb-4">Cart</h1>
                <p class="text-gray-600 mb-6">Your selected products.</p>
            </div>
            <div class="mt-1">
                <button class="btn btn-primary" @click="$router.push('/')">
                    <arrow-left class="w-4 h-4 " />
                    Buy More
                </button>
            </div>
        </div>

        <div class="overflow-x-auto min-w-xl" v-if="cartStore.cartItems.length > 0">
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in cartStore.cartItems" :key="index">
                        <th class=" min-w-[250px]">
                            <figure>
                                <img :src="item.thumbnail" :alt="item.title" class=" h-28  md:h-32 lg:h-40 " />
                            </figure>
                        </th>
                        <td class="space-y-2 min-w-[250px] max-w-sm">
                            <div class="font-semibold text-sm md:text-lg lg:text-xl">{{ item.title }}</div>
                            <div class="text-sm text-gray-500 capitalize line-clamp-2">{{ item.description }}</div>
                        </td>
                        <td>${{ item.price }}</td>
                        <td>
                            <div class="flex items-center justify-center h-full *:shrink-0">
                                <button class="btn btn-warning btn-soft btn-square btn-sm "
                                    @click="cartStore.decreaseQty(item.id)">
                                    <Minus class="w-4 h-4" />
                                </button>
                                <span class="mx-2">{{ item.quantity ?? 0 }}</span>
                                <button class="btn btn-warning btn-soft btn-square btn-sm"
                                    @click="cartStore.increaseQty(item.id)">
                                    <Plus class="w-4 h-4" />
                                </button>
                            </div>

                        </td>
                        <td>
                            ${{ (item.price * item.quantity).toFixed(2) }}
                        </td>
                        <td>
                            <button class=" btn btn-sm btn-soft btn-square btn-error"
                                @click="cartStore.removeFromCart(item.id)">
                                <Trash :size="16" />
                            </button>
                        </td>
                    </tr>
                    <tr class="*:py-6 border-b-0">
                        <td colspan="3"></td>
                        <td class="font-semibold">Sub Total:</td>
                        <td>${{ cartStore.totalPrice().toFixed(2) }}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="6" class="text-right py-6">
                            <button class="btn btn-primary" @click="$router.push('/checkout')">
                                Proceed to Checkout
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="flex items-center justify-center py-10" v-else>
            <p>Your cart is empty.</p>
        </div>



    </div>

</template>