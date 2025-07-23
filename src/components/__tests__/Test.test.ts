import Test from "../Test.vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

describe("Test Component", () => {
  test("should render Test component", () => {
    const wrapper = mount(Test);
    expect(wrapper.text()).toMatch("test");
  });
});
