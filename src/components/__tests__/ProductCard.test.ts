import ProductCard from "../ProductCard.vue";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, type VueWrapper, RouterLinkStub } from "@vue/test-utils";
import type { Product } from "@/utils/types";
import { createTestingPinia } from "@pinia/testing";

import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  type Router,
} from "vue-router";
import { routes } from "@/router";

const product: Product = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description:
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  category: "beauty",
  price: 9.99,
  discountPercentage: 10.48,
  rating: 2.56,
  stock: 99,
  tags: ["beauty", "mascara"],
  brand: "Essence",
  sku: "BEA-ESS-ESS-001",
  weight: 4,
  dimensions: {
    width: 15.14,
    height: 13.08,
    depth: 22.99,
  },
  warrantyInformation: "1 week warranty",
  shippingInformation: "Ships in 3-5 business days",
  availabilityStatus: "In Stock",
  reviews: [
    {
      rating: 3,
      comment: "Would not recommend!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Eleanor Collins",
      reviewerEmail: "eleanor.collins@x.dummyjson.com",
    },
    {
      rating: 4,
      comment: "Very satisfied!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Lucas Gordon",
      reviewerEmail: "lucas.gordon@x.dummyjson.com",
    },
    {
      rating: 5,
      comment: "Highly impressed!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Eleanor Collins",
      reviewerEmail: "eleanor.collins@x.dummyjson.com",
    },
  ],
  returnPolicy: "No return policy",
  minimumOrderQuantity: 48,
  meta: {
    createdAt: "2025-04-30T09:41:02.053Z",
    updatedAt: "2025-04-30T09:41:02.053Z",
    barcode: "5784719087687",
    qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
  },
  images: [
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
  ],
  thumbnail:
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
};

describe("Testing ProductCard Component", () => {
  let wrapper: VueWrapper<any>;
  let router: Router;
  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: routes,
    });

    // setActivePinia(createPinia());
    wrapper = mount(ProductCard, {
      props: {
        product,
      },
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });
  });

  test("ProductCard renders correctly", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  test("Product price is displayed correctly", () => {
    const priceElement = wrapper.find("[data-testid='product-price']");
    expect(priceElement.exists()).toBeTruthy();
    expect(priceElement.text()).toBe(`$${product.price.toFixed(2)}`);
  });
  test("Product discount is displayed correctly", () => {
    const discountElement = wrapper.find("[data-testid='product-discount']");
    expect(discountElement.exists()).toBeTruthy();
    expect(discountElement.text()).toBe(
      `${Math.round(product.discountPercentage)}% Off`,
    );
  });

  test("Product name is displayed correctly", () => {
    const productNameElement = wrapper.find("[data-testid='product-name']");
    expect(productNameElement.exists()).toBeTruthy();
    expect(productNameElement.text()).toBe(product.title);
  });

  test("Should go to product details page on clicking product name", async () => {
    const productDetailsLink = wrapper.find("[data-testid='product-link']");
    expect(productDetailsLink.attributes("href")).toBe(
      `/product/${product.id}`,
    );
    await productDetailsLink.trigger("click");
    await router.isReady();
    expect(router.currentRoute.value.path).toBe(`/product/${product.id}`);
  });

  // test("Should display product image", () => {
  //   const productImage = wrapper.find("[data-testid='product-image']");
  //   expect(productImage.exists()).toBeTruthy();
  //   expect(productImage.attributes('src')).toBe(product.images[0]);
  // });
});
