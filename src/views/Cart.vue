<script setup lang="ts">
import useCartStore from "@/store/cart";
import { Minus, Plus, Trash, ArrowLeft } from "lucide-vue-next";

const cartStore = useCartStore();
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8 flex flex-wrap items-center justify-between">
      <div class="shrink-0">
        <h1 class="mb-4 text-2xl font-bold">Cart</h1>
        <p class="mb-6 text-gray-600">Your selected products.</p>
      </div>
      <div class="mt-1">
        <button class="btn btn-primary" @click="$router.push('/')">
          <arrow-left class="h-4 w-4" />
          Buy More
        </button>
      </div>
    </div>

    <div class="min-w-xl overflow-x-auto" v-if="cartStore.cartItems.length > 0">
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
            <th class="min-w-[250px]">
              <figure>
                <img
                  :src="item.thumbnail"
                  :alt="item.title"
                  class="h-28 md:h-32 lg:h-40"
                />
              </figure>
            </th>
            <td class="max-w-sm min-w-[250px] space-y-2">
              <div class="text-sm font-semibold md:text-lg lg:text-xl">
                {{ item.title }}
              </div>
              <div class="line-clamp-2 text-sm text-gray-500 capitalize">
                {{ item.description }}
              </div>
            </td>
            <td>${{ item.price }}</td>
            <td>
              <div class="flex h-full items-center justify-center *:shrink-0">
                <button
                  class="btn btn-square btn-soft btn-sm btn-warning"
                  @click="cartStore.decreaseQty(item.id)"
                >
                  <Minus class="h-4 w-4" />
                </button>
                <span class="mx-2">{{ item.quantity ?? 0 }}</span>
                <button
                  class="btn btn-square btn-soft btn-sm btn-warning"
                  @click="cartStore.increaseQty(item.id)"
                >
                  <Plus class="h-4 w-4" />
                </button>
              </div>
            </td>
            <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
              <button
                class="btn btn-square btn-soft btn-sm btn-error"
                @click="cartStore.removeFromCart(item.id)"
              >
                <Trash :size="16" />
              </button>
            </td>
          </tr>
          <tr class="border-b-0 *:py-6">
            <td colspan="3"></td>
            <td class="font-semibold">Sub Total:</td>
            <td>${{ cartStore.totalPrice().toFixed(2) }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="6" class="py-6 text-right">
              <button
                class="btn btn-primary"
                @click="$router.push('/checkout')"
              >
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
