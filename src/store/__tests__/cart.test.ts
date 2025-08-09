import { describe, test, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import useCartStore, { type CartItemType } from "../cart";

const product: CartItemType = {
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
  quantity: 0,
};

describe("Testing Cart Store", () => {
  let cartStore: ReturnType<typeof useCartStore>;
  beforeEach(() => {
    setActivePinia(createPinia());
    cartStore = useCartStore();
  });

  test("Cart store is defined", () => {
    expect(cartStore).toBeDefined();
  });

  test("CartItems lenght should be 0", () => {
    expect(cartStore.cartItems.length).toBe(0);
  });

  test("Should add product to cart", async () => {
    cartStore.addToCart(product);
    expect(cartStore.cartItems.length).toBe(1);
  });

  test("Should increase quantity of a single product", () => {
    cartStore.increaseQty(product.id);
    expect(cartStore.cartItems[0].quantity).toBe(2);
  });

  test("Should decrease quantity of a single product", () => {
    cartStore.decreaseQty(product.id);
    expect(cartStore.cartItems[0].quantity).toBe(1);
  });

  test("Should calculate total price", () => {
    cartStore.increaseQty(product.id);

    const total = cartStore.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    expect(cartStore.totalPrice()).toBe(total);
  });
  test("Should remove a product from cart", () => {
    cartStore.removeFromCart(product.id);
    expect(cartStore.cartItems.length).toBe(0);
  });
});
