<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { callProductDetailAPI } from '@/api/product';
import LoginModal from '@/components/common/LoginModal.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const product = ref({});
const amount = ref(1);
const loginModal = ref(false);

const productCode = route.params.productCode;

const fetchProductDetail = async () => {
  try {
    const result = await callProductDetailAPI({
      productCode: route.params.productCode,
    });
    product.value = result;
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
  }
};

onMounted(() => {
  if (route.params.productCode) {
    fetchProductDetail();
  }
});

watch(() => route.params.productCode, () => {
  fetchProductDetail();
});

const onClickReviewHandler = () => {
  router.push(`/review?productCode=${route.params.productCode}`);
};

const onChangeAmountHandler = (e) => {
  amount.value = parseInt(e.target.value) || 1;
};

const onClickPurchaseHandler = () => {
  // Use auth store to check login
  authStore.checkLoginStatus(); // Ensure latest status
  
  if (!authStore.isLogin) {
    alert("로그인을 먼저해주세요");
    loginModal.value = true;
    return;
  }

  // Check stock
  if (amount.value > product.value.productStock) {
    alert("구매 가능 수량을 확인해주세요");
    return;
  }

  router.push(`/purchase?amount=${amount.value}&productCode=${route.params.productCode}`);
};
</script>

<template>
  <div>
    <LoginModal
      v-if="loginModal"
      @close="loginModal = false"
    />

    <div :class="$style.DetailDiv">
      <div :class="$style.imgDiv">
        <img :src="product.productImageUrl" alt="테스트" />
        <button
          :class="$style.reviewBtn"
          @click="onClickReviewHandler"
        >
          리뷰보기
        </button>
      </div>
      <div :class="$style.descriptionDiv">
        <table :class="$style.descriptionTable">
          <tbody>
            <tr>
              <th>상품 코드</th>
              <td>{{ product.productCode || "" }}</td>
            </tr>
            <tr>
              <th>상품명</th>
              <td>{{ product.productName || "" }}</td>
            </tr>
            <tr>
              <th>상품 가격</th>
              <td>{{ product.productPrice || "" }}</td>
            </tr>
            <tr>
              <th>상품 설명</th>
              <td>{{ product.productDescription || "" }}</td>
            </tr>
            <tr>
              <th>구매 가능 수량</th>
              <td>{{ product.productStock || "" }}</td>
            </tr>
            <tr>
              <th>구매 수량</th>
              <td>
                <input
                  type="number"
                  :value="amount"
                  @input="onChangeAmountHandler"
                  min="1"
                />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <button
                  :class="$style.productBuyBtn"
                  @click="onClickPurchaseHandler"
                >
                  구매하기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style module>
.DetailDiv {
  display: flex;
  flex-direction: row;
  margin-top: 50px;
}

.DetailDiv div {
  width: 500px;
  height: 350px;
}

.imgDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.imgDiv img {
  margin: 5px;
  width: 70%;
  height: 80%;
  object-fit: contain;
}

.imgDiv button {
  margin: 5px;
  height: 8%;
  width: 80%;
}

.descriptionDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.descriptionTable {
  width: 80%;
  height: 80%;
}

.reviewBtn {
  margin-top: 5px;
  margin-bottom: 5px;
  height: 30px;
  width: 100%;
  border-radius: 25px;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
}

.productBuyBtn {
  margin-top: 5px;
  margin-bottom: 5px;
  height: 30px;
  width: 100%;
  border-radius: 25px;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>