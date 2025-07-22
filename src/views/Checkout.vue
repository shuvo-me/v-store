<script setup lang="ts">
import useCartStore from "@/store/cart";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const cartStore = useCartStore();
const loading = ref<boolean>(false);
const showToast = ref<boolean>(false);
const router = useRouter();
const shippingInfo = reactive({
  fullName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  state: "",
  zipCode: "",
  termsAccepted: false,
  cardName: "",
  cardNumber: "",
  paymentMethod: "",
  cardExpiry: "",
  cvc: "",
});

async function placeOrder() {
  loading.value = true;
  new Promise((resolve) =>
    setTimeout(() => {
      loading.value = false;
      resolve(true);
    }, 3000),
  ).then(() => {
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
      cartStore.clearCart();
      router.push("/");
    }, 2000);
  });
}
</script>
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex items-center justify-between">
      <div class="breadcrumbs text-sm">
        <ul>
          <li><router-link to="/">Products</router-link></li>
          <li><router-link to="/checkout">Checkout</router-link></li>
        </ul>
      </div>
      <div class="toast-top toast-end toast" v-show="showToast">
        <div class="alert alert-success">
          <span>Order placed successfully 🎉</span>
        </div>
      </div>
    </div>

    <div class="mt-8 flex flex-col gap-6 md:flex-row">
      <div class="flex flex-1/2 flex-col gap-4 pr-6 pb-6 md:pb-0">
        <h4 class="font-semibold">Shipping Information</h4>
        <div>
          <form
            id="shippingForm"
            @submit.prevent="placeOrder"
            class="flex flex-col gap-6 [&_input:not([type='checkbox']):not([type='radio'])]:w-full"
          >
            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                Full Name <span class="text-error">*</span>
              </legend>
              <input
                type="text"
                v-model="shippingInfo.fullName"
                class="input"
                placeholder="eg: John Doe"
                required
              />
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                Email <span class="text-error">*</span>
              </legend>
              <input
                type="eamil"
                v-model="shippingInfo.email"
                class="input"
                placeholder="eg: john@doe.com"
                required
              />
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                Phone <span class="text-error">*</span>
              </legend>
              <input
                type="tel"
                v-model="shippingInfo.phone"
                class="input"
                placeholder="+880 "
                required
              />
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">
                Country <span class="text-error">*</span>
              </legend>
              <input
                type="text"
                v-model="shippingInfo.country"
                class="input"
                placeholder="eg: Bangladesh "
                required
              />
            </fieldset>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <fieldset class="fieldset">
                <legend class="fieldset-legend">
                  City <span class="text-error">*</span>
                </legend>
                <input
                  type="text"
                  v-model="shippingInfo.city"
                  class="input"
                  placeholder="eg: Dhaka "
                  required
                />
              </fieldset>
              <fieldset class="fieldset">
                <legend class="fieldset-legend">
                  State/Province <span class="text-error">*</span>
                </legend>
                <input
                  type="text"
                  v-model="shippingInfo.state"
                  class="input"
                  placeholder="eg: Dhaka "
                  required
                />
              </fieldset>
              <fieldset class="fieldset">
                <legend class="fieldset-legend">
                  Zip Code <span class="text-error">*</span>
                </legend>
                <input
                  type="text"
                  v-model="shippingInfo.zipCode"
                  class="input"
                  placeholder="eg: 1212 "
                  required
                />
              </fieldset>
            </div>
            <div>
              <div class="space-y-2">
                <p>Payment Method</p>
                <label for="cash-on-delivery" class="cursor-pointer">
                  <input
                    type="radio"
                    id="cash-on-delivery"
                    name="radio-1"
                    class="radio"
                    value="cash-on-delivery"
                    v-model="shippingInfo.paymentMethod"
                  />
                  Cash on Delivery
                </label>
                <label for="card" class="ml-4 cursor-pointer">
                  <input
                    type="radio"
                    id="card"
                    name="radio-1"
                    class="radio"
                    value="card"
                    v-model="shippingInfo.paymentMethod"
                  />
                  Card
                </label>
                <div
                  v-if="shippingInfo.paymentMethod === 'card'"
                  class="space-y-4"
                >
                  <fieldset class="fieldset">
                    <legend class="fieldset-legend">
                      Name On Card <span class="text-error">*</span>
                    </legend>
                    <input
                      type="text"
                      v-model="shippingInfo.cardName"
                      class="input"
                      required
                    />
                  </fieldset>
                  <fieldset class="fieldset">
                    <legend class="fieldset-legend">
                      Card Number <span class="text-error">*</span>
                    </legend>
                    <input
                      type="text"
                      v-model="shippingInfo.cardNumber"
                      class="input"
                      required
                    />
                  </fieldset>
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <fieldset class="fieldset">
                      <legend class="fieldset-legend">
                        Expiry Date <span class="text-error">*</span>
                      </legend>
                      <input
                        type="date"
                        v-model="shippingInfo.cardExpiry"
                        class="input"
                        placeholder="MM/YY"
                        required
                      />
                    </fieldset>
                    <fieldset class="fieldset">
                      <legend class="fieldset-legend">
                        CVC <span class="text-error">*</span>
                      </legend>
                      <input
                        type="text"
                        v-model="shippingInfo.cvc"
                        class="input"
                        placeholder="123"
                        required
                      />
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="shippingInfo.termsAccepted"
                id="term"
                class="checkbox checkbox-success"
              />
              <label for="term" class="fieldset-legend cursor-pointer text-sm"
                >I have agreed to the Terms and Condition</label
              >
            </div>
          </form>
        </div>
      </div>
      <div class="divider md:divider-horizontal" />
      <div class="flex-1/2 flex-grow pl-6">
        <h4 class="font-semibold">Your cart</h4>
        <div class="max-h-[400px] overflow-y-auto">
          <div
            class="flex items-center"
            v-for="(item, index) in cartStore.cartItems"
            :key="index"
          >
            <figure>
              <img
                :src="item.thumbnail"
                :alt="item.title"
                class="mb-4 h-28 object-cover"
              />
            </figure>
            <div class="ml-4 flex flex-grow justify-between space-y-2 pr-6">
              <div>
                <h4>{{ item.title }}</h4>
                <p>x {{ item.quantity }}</p>
              </div>
              <p>$ {{ item.price }}</p>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="space-y-2 pr-6">
          <dl class="flex items-center justify-between">
            <dd>Subtotal:</dd>
            <dt>$ {{ cartStore.totalPrice().toFixed(2) }}</dt>
          </dl>
          <dl class="flex items-center justify-between">
            <dd>Shipping:</dd>
            <dt>$ 5</dt>
          </dl>
          <div class="divider"></div>
          <dl class="flex items-center justify-between">
            <dd>Total:</dd>
            <dt>$ {{ (cartStore.totalPrice() + 5).toFixed(2) }}</dt>
          </dl>
        </div>
        <button
          class="btn mt-10 w-full btn-primary"
          :disabled="loading"
          form="shippingForm"
          type="submit"
        >
          Place Order
          <span
            class="loading loading-xs loading-spinner"
            v-if="loading"
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>
