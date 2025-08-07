import { describe, test, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import useCartStore from "../cart";

describe("Testing Cart Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("Cart store is defined", () => {
    const cartStore = useCartStore();
    expect(cartStore).toBeDefined();
  });
});
