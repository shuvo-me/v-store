import HelloWorld from "../HelloWorld.vue";
import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";

describe("Testing HelloWorld Component", () => {
  test("should render HelloWorld from props", () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: "Hello World",
      },
    });
    expect(wrapper.find("h1").text()).toMatch("Hello World");
  });

  test("should increment count", async () => {
    const wrapper = mount(HelloWorld);
    const button = wrapper.find("button");
    await button.trigger("click");
    expect(button.text()).toBe("count is 1");
  });
});
