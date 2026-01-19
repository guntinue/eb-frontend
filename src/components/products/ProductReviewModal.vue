<script setup>
import { ref } from 'vue';
import { callReviewWriteAPI } from '@/api/review';

const props = defineProps({
  productCode: Number,
  memberCode: Number
});

const emit = defineEmits(['close']);

const form = ref({
  productCode: props.productCode,
  memberCode: props.memberCode,
  reviewTitle: "",
  reviewContent: ""
});

const onClickProductReviewHandler = async () => {
  try {
    const result = await callReviewWriteAPI({
      form: form.value
    });

    if (result.status === 201) {
      alert("리뷰 등록이 완료되었습니다.");
      emit('close');
      window.location.reload();
    } else {
      alert("리뷰 등록에 실패했습니다.");
    }
  } catch (error) {
    console.error("[ProductReviewModal] Review write error:", error);
    alert("리뷰 등록에 실패했습니다.");
  }
};
</script>

<template>
  <div :class="$style.modalOverlay">
    <div :class="$style.modalContainer">
      <div :class="$style.modalContent">
        <h1 :class="$style.title">리뷰</h1>
        <input
          v-model="form.reviewTitle"
          type="text"
          placeholder="리뷰 제목"
          :class="$style.input"
        />
        <textarea
          v-model="form.reviewContent"
          placeholder="리뷰 본문"
          :class="$style.textarea"
        ></textarea>
        <button
          @click="onClickProductReviewHandler"
          :class="$style.submitBtn"
        >
          리뷰 작성하기
        </button>
        <button
          @click="emit('close')"
          :class="$style.closeBtn"
        >
          돌아가기
        </button>
      </div>
    </div>
  </div>
</template>

<style module>
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modalContainer {
  position: relative;
  width: 400px;
  height: 500px;
  padding: 20px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  z-index: 1000;
}

.modalContent {
  height: 500px;
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background-color: white;
  border: solid 1px black;
  border-radius: 25px;
}

.title {
  margin-bottom: 20px;
}

.input {
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.textarea {
  width: 80%;
  height: 150px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
}

.submitBtn {
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.closeBtn {
  width: 80%;
  padding: 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>