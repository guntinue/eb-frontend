<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Product from '@/components/products/Product.vue';
import { 
  callProductListAPI, 
  callProductListAboutMealAPI, 
  callProductListAboutDessertAPI, 
  callProductListAboutBeverageAPI 
} from '@/api/product';

const route = useRoute();
const products = ref({ data: null, pageInfo: null });
const currentPage = ref(1);
const pageNumber = ref([]);

const fetchProducts = async () => {
  try {
    let result;
    const path = route.path;

    if (path === '/product/meal') {
      const data = await callProductListAboutMealAPI();
      result = { data: { content: data }, pageInfo: null };
    } else if (path === '/product/dessert') {
      const data = await callProductListAboutDessertAPI();
      result = { data: { content: data }, pageInfo: null };
    } else if (path === '/product/beverage') {
      const data = await callProductListAboutBeverageAPI();
      result = { data: { content: data }, pageInfo: null };
    } else {
      result = await callProductListAPI({
        currentPage: currentPage.value,
      });
    }

    products.value = result;
    
    // Update page numbers
    if (result.pageInfo) {
      pageNumber.value = [];
      for (let i = 1; i <= result.pageInfo.pageEnd; i++) {
        pageNumber.value.push(i);
      }
    } else {
      pageNumber.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

onMounted(() => {
  fetchProducts();
});

watch(() => route.path, () => {
  if (currentPage.value !== 1) {
    currentPage.value = 1;
  } else {
    fetchProducts();
  }
});

watch(currentPage, () => {
  fetchProducts();
});
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center; min-height: 100vh; padding: 20px;">
    <div :class="$style.productDiv">
      <template v-if="products.data && products.data.content">
        <Product 
          v-for="product in products.data.content" 
          :key="product.productCode" 
          :product="product" 
        />
      </template>
    </div>
    
    <div v-if="products.pageInfo" style="list-style-type: none; display: flex; justify-content: center; align-items: center; margin-top: 30px; gap: 5px;">
      <!-- Prev Button -->
      <button
        v-if="products.data && products.data.content"
        @click="currentPage = currentPage - 1"
        :disabled="currentPage === 1"
        :class="$style.pagingBtn"
      >
        &lt;
      </button>

      <!-- Page Numbers -->
      <li 
        v-for="num in pageNumber" 
        :key="num" 
        @click="currentPage = num"
        style="list-style: none;"
      >
        <button
          :style="currentPage === num ? { backgroundColor: 'orange' } : null"
          :class="$style.pagingBtn"
        >
          {{ num }}
        </button>
      </li>

      <!-- Next Button -->
      <button
        v-if="products.data && products.data.content && products.pageInfo"
        :class="$style.pagingBtn"
        @click="currentPage = currentPage + 1"
        :disabled="currentPage === products.pageInfo.pageEnd || products.pageInfo.total === 0"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<style module>
.productDiv {
  display: flex;
  flex-wrap: wrap;
  width: 850px;
  height: 100%;
  margin: 10px auto;
  justify-content: center;
  gap: 20px;
}

.pagingBtn {
  margin: 5px;
  border-radius: 25px;
  background-color: white;
  font-weight: bold;
  padding: 8px 12px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagingBtn:hover {
  cursor: pointer;
  background-color: burlywood;
}

.pagingBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

