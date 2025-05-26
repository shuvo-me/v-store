import { ref } from "vue";

const useProducts = async () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref();
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    products.value = data.products;
    loading.value = false;
  } catch (err) {
    error.value = err;
    loading.value = false;
  }

  return {
    products,
    loading,
    error,
  };
};

export default useProducts;
