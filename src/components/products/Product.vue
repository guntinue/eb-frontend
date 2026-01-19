<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const onClickProductHandler = (productCode) => {
  router.push(`/product/${productCode}`);
};
</script>

<template>
  <div :class="$style.productDiv" @click="onClickProductHandler(product.productCode)">
    <img :src="product.productImageUrl" alt="테스트" />
    <h5>{{ product.productName }}</h5>
    <h5>{{ product.productPrice }}</h5>
  </div>
</template>

<style module>
.productDiv {
  width: 150px;
  height: 200px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer; /* Added cursor pointer for better UX */
}

.productDiv img {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

.productDiv h5 {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
