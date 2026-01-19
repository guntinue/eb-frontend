<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { callReviewDetailAPI, callReviewUpdateAPI } from '@/api/review';
import { decodeJwt } from '@/utils/jwt';

const route = useRoute();
const router = useRouter();

const reviewCode = route.params.reviewCode;
const reviewDetail = ref(null);
const modifyMode = ref(false);
const form = ref({});
const loading = ref(true);
const decoded = ref(null);

onMounted(async () => {
  const token = window.localStorage.getItem('accessToken');
  if (token) {
    const temp = decodeJwt(token);
    decoded.value = temp;
  }
  await fetchReviewDetail();
});

const fetchReviewDetail = async () => {
  try {
    loading.value = true;
    const result = await callReviewDetailAPI({ reviewCode });
    if (result.status === 200) {
      reviewDetail.value = result.data;
    }
  } catch (error) {
    console.error("리뷰 상세 조회 실패:", error);
  } finally {
    loading.value = false;
  }
};

const onClickModifyModeHandler = () => {
  modifyMode.value = true;
  form.value = {
    reviewCode: reviewDetail.value.reviewCode,
    reviewTitle: reviewDetail.value.reviewTitle,
    reviewContent: reviewDetail.value.reviewContent,
  };
};

const onClickReviewUpdateHandler = async () => {
  try {
    const result = await callReviewUpdateAPI({ form: form.value });
    if (result.status === 200) {
      alert("리뷰가 수정되었습니다.");
      router.push(`/review?productCode=${reviewDetail.value.productCode}`);
    }
  } catch (error) {
    console.error("리뷰 수정 실패:", error);
    alert("리뷰 수정에 실패했습니다.");
  }
};

const goBack = () => {
    if (reviewDetail.value) {
        router.push(`/review?productCode=${reviewDetail.value.productCode}`);
    } else {
        router.go(-1);
    }
};
</script>

<template>
  <div v-if="loading" :class="$style.loadingContainer">
    <div>로딩 중...</div>
  </div>

  <div v-else-if="!reviewDetail" :class="$style.loadingContainer">
    <div>리뷰를 찾을 수 없습니다.</div>
  </div>

  <div v-else :class="$style.container">
    <h1 :class="$style.title">리뷰 상세</h1>

    <div :class="$style.tableContainer">
      <table :class="$style.table">
        <colgroup>
          <col width="20%" />
          <col width="80%" />
        </colgroup>
        <tbody>
          <tr :class="$style.tr">
            <th>제목</th>
            <td>
              <input
                v-if="modifyMode"
                v-model="form.reviewTitle"
                :class="$style.input"
                placeholder="제목"
              />
              <input
                v-else
                :value="reviewDetail.reviewTitle"
                readonly
                :class="[$style.input, $style.readOnly]"
              />
            </td>
          </tr>
          <tr :class="$style.tr">
            <th>작성자</th>
            <td>
              <input
                :value="reviewDetail.member?.memberName"
                readonly
                :class="[$style.input, $style.readOnly]"
              />
            </td>
          </tr>
          <tr :class="$style.tr">
            <th>작성일</th>
            <td>
              <input
                :value="reviewDetail.reviewCreateDate"
                readonly
                :class="[$style.input, $style.readOnly]"
              />
            </td>
          </tr>
          <tr>
            <th style="vertical-align: top;">내용</th>
            <td>
              <textarea
                v-if="modifyMode"
                v-model="form.reviewContent"
                :class="$style.textarea"
                placeholder="내용"
              ></textarea>
              <textarea
                v-else
                :value="reviewDetail.reviewContent"
                readonly
                :class="[$style.textarea, $style.readOnly]"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div :class="$style.buttonGroup">
      <template v-if="decoded && reviewDetail.member && decoded.memberCode === reviewDetail.member.memberCode">
        <button
          v-if="!modifyMode"
          @click="onClickModifyModeHandler"
          :class="$style.modifyBtn"
        >
          수정
        </button>
        <button
          v-else
          @click="onClickReviewUpdateHandler"
          :class="$style.saveBtn"
        >
          저장
        </button>
      </template>

      <button
        @click="goBack"
        :class="$style.backBtn"
      >
        목록으로
      </button>
    </div>
  </div>
</template>

<style module>
.container {
  padding: 20px;
  max-width: 800px;
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
  background-color: white;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.tr {
  border-bottom: 1px solid #eee;
}

.table th {
  padding: 15px;
  background-color: #f8f9fa;
  text-align: left;
  border-right: 1px solid #eee;
  font-weight: bold;
}

.table td {
  padding: 15px;
}

.input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.textarea {
  width: 100%;
  min-height: 200px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  resize: vertical;
}

.readOnly {
  background-color: #f8f9fa;
  color: #333;
}

.buttonGroup {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.modifyBtn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.saveBtn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.backBtn {
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
</style>