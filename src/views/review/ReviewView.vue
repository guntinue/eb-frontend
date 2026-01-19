<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { callReviewsAPI } from '@/api/review';

const route = useRoute();
const router = useRouter();

const reviewList = ref([]);
const pageInfo = ref(null);
const currentPage = ref(1);
const loading = ref(true);
const pageNumber = ref([]);

const productCode = route.query.productCode;

const fetchReviews = async () => {
  if (!productCode) {
    loading.value = false;
    return;
  }

  try {
    loading.value = true;
    const result = await callReviewsAPI({
      productCode: productCode,
      currentPage: currentPage.value,
    });

    if (result && result.status === 200) {
      reviewList.value = result.data;
      pageInfo.value = result.pageInfo;

      if (result.pageInfo) {
        pageNumber.value = [];
        for (let i = 1; i <= result.pageInfo.pageEnd; i++) {
          pageNumber.value.push(i);
        }
      }
    }
  } catch (error) {
    console.error("리뷰 조회 실패:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchReviews();
});

watch(currentPage, () => {
  fetchReviews();
});

const onClickTableTr = (reviewCode) => {
  router.push(`/review-detail/${reviewCode}`);
};
</script>

<template>
  <div v-if="loading" :class="$style.loadingContainer">
    <div>로딩 중...</div>
  </div>

  <div v-else :class="$style.container">
    <h1 :class="$style.title">리뷰 목록</h1>

    <div :class="$style.tableContainer">
      <table :class="$style.table">
        <colgroup>
          <col width="10%" />
          <col width="50%" />
          <col width="20%" />
          <col width="20%" />
        </colgroup>
        <thead>
          <tr :class="$style.thRow">
            <th>번호</th>
            <th>리뷰 제목</th>
            <th>리뷰 작성일</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="reviewList && reviewList.length > 0">
            <tr
              v-for="review in reviewList"
              :key="review.reviewCode"
              @click="onClickTableTr(review.reviewCode)"
              :class="$style.tr"
            >
              <td>{{ review.reviewCode }}</td>
              <td>{{ review.reviewTitle }}</td>
              <td>{{ review.reviewCreateDate }}</td>
              <td>{{ review.member?.memberName }}</td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="4" :class="$style.emptyTd">
              조회된 내용이 없습니다.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="reviewList && reviewList.length > 0 && pageInfo" :class="$style.pagination">
      <button
        @click="currentPage = currentPage - 1"
        :disabled="currentPage === 1"
        :class="$style.pagingBtn"
      >
        &lt;
      </button>

      <button
        v-for="num in pageNumber"
        :key="num"
        @click="currentPage = num"
        :style="currentPage === num ? { backgroundColor: 'orange' } : null"
        :class="$style.pagingBtn"
      >
        {{ num }}
      </button>

      <button
        @click="currentPage = currentPage + 1"
        :disabled="currentPage === pageInfo.pageEnd || pageInfo.total === 0"
        :class="$style.pagingBtn"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<style module>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.loadingContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
}

.tableContainer {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.thRow th {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  background-color: #f8f9fa;
}

.tr {
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.tr:hover {
  background-color: #f8f9fa;
}

.tr td {
  padding: 12px;
}

.emptyTd {
  padding: 20px;
  text-align: center;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.pagingBtn {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  margin: 0 2px;
}

.pagingBtn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>