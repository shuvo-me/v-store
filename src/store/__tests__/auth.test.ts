import { describe, test, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import useAuthStore from "../auth";

describe("Testing Auth store", () => {
  let authStore: ReturnType<typeof useAuthStore>;
  beforeEach(() => {
    setActivePinia(createPinia());
    authStore = useAuthStore();
  });

  test("Auth store be defined", () => {
    expect(authStore).toBeDefined();
  });

  test("There should be now user", () => {
    expect(authStore.isAuthenticated).toBe(false);
    expect(authStore.user).toBe(null);
  });
});
