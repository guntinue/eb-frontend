<script setup>
import { ref, onMounted } from 'vue';
import { callPurchaseListAPI } from '@/api/order';
import { decodeJwt } from '@/utils/jwt';
import ProductReviewModal from '@/components/products/ProductReviewModal.vue';

const purchaseList = ref([]);
const loading = ref(true);
const error = ref(null);
const productReviewModal = ref(false);
const productCode = ref(0);
const memberCode = ref(0);

onMounted(async () => {
  try {
    const token = window.localStorage.getItem('accessToken');
    if (!token) {
      error.value = "로그인이 필요합니다.";
      loading.value = false;
      return;
    }

    const decodedToken = decodeJwt(token);
    if (!decodedToken) {
      error.value = "토큰이 유효하지 않습니다.";
      loading.value = false;
      return;
    }

    const result = await callPurchaseListAPI({
      memberId: decodedToken.sub
    });

    if (result.status === 200) {
      purchaseList.value = result.data || [];
    } else {
      error.value = `결제 내역 조회에 실패했습니다. (${result.status})`;
    }
  } catch (err) {
    error.value = `결제 내역을 불러오는데 실패했습니다: ${err.message}`;
  } finally {
    loading.value = false;
  }
});

const onClickReviewHandler = (productFromTable) => {
  productCode.value = productFromTable.product.productCode;
  memberCode.value = productFromTable.orderMember;
  productReviewModal.value = true;
};
</script>

<template>
  <div>
    <ProductReviewModal
      v-if="productReviewModal"
      :memberCode="memberCode"
      :productCode="productCode"
      @close="productReviewModal = false"
    />

    <div v-if="loading" :class="$style.container">
      <div>결제 내역을 불러오는 중...</div>
    </div>

    <div v-else-if="error" :class="[$style.container, $style.error]">
      <div>오류: {{ error }}</div>
    </div>

    <div v-else :class="$style.container">
      <h2 :class="$style.title">결제 내역</h2>

      <div v-if="purchaseList.length === 0" :class="$style.empty">
        결제 내역이 없습니다.
      </div>

      <table v-else :class="$style.table">
        <thead>
          <tr :class="$style.theadRow">
            <th>주문일자</th>
            <th>주문 상품 정보</th>
            <th>상품금액(수량)</th>
            <th>리뷰</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="purchase in purchaseList" :key="purchase.orderCode" :class="$style.tr">
            <td>{{ purchase.orderDate }}</td>
            <td>{{ purchase.product.productName }}</td>
            <td>
              {{ (purchase.product.productPrice * purchase.orderAmount).toLocaleString() }}원
              ({{ purchase.orderAmount }}개)
            </td>
            <td>
              <button @click="onClickReviewHandler(purchase)" :class="$style.reviewBtn">
                리뷰 등록
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style module>
.container {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.error {
  color: red;
  text-align: center;
}

.title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}

.empty {
  text-align: center;
  padding: 40px;
  color: #666;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.theadRow {
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
}

.theadRow th {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.tr {
  border-bottom: 1px solid #dee2e6;
}

.tr td {
  padding: 12px;
}

.reviewBtn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
</style>