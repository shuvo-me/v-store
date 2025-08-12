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

  test("Should login user successfully", async () => {
    const user = {
      email: "check@dev.com",
      password: "12345678",
    };

    const res = await authStore.login(user);

    expect(res.email).toBe(user.email);
    expect(authStore.isAuthenticated).toBe(true);
    expect((authStore.user as { username: string })?.username).toBe("admin");
  });

  test("Should logout user successfully", async () => {
    const res = await authStore.logout();

    expect(res).toBe(true);
    expect(authStore.isAuthenticated).toBe(false);
    expect(authStore.user).toBeNull();
  });
});
