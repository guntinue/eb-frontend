<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { callProductRegistAPI } from '@/api/product';
import { decodeJwt } from '@/utils/jwt';
import { getToken } from '@/utils/cookies';

const router = useRouter();
const loading = ref(false);
const decoded = ref(null);

const form = ref({
  productName: "",
  productPrice: "",
  productDescription: "",
  categoryCode: "",
  productOrderable: "Y",
  productStock: "0",
});

const imageFile = ref(null);

onMounted(() => {
  const token = getToken();
  if (!token) {
    alert("로그인이 필요합니다.");
    router.push("/");
    return;
  }

  const temp = decodeJwt(token);
  if (temp && temp.exp * 1000 < Date.now()) {
    alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
    router.push("/");
    return;
  }
  
  decoded.value = temp;
});

const handleFileChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    imageFile.value = e.target.files[0];
  }
};

const handleSubmit = async () => {
  if (!form.value.productName || !form.value.productPrice || !form.value.categoryCode) {
    alert("필수 항목을 모두 입력해주세요.");
    return;
  }

  loading.value = true;
  try {
    const formData = new FormData();
    formData.append("productName", form.value.productName);
    formData.append("productPrice", form.value.productPrice);
    formData.append("productDescription", form.value.productDescription);
    formData.append("categoryCode", form.value.categoryCode);
    formData.append("productOrderable", form.value.productOrderable);
    formData.append("productStock", form.value.productStock);

    if (imageFile.value) {
      formData.append("productImage", imageFile.value);
    }

    const result = await callProductRegistAPI({ form: formData });

    console.log("[ProductRegistration] API Response:", result);

    if (result) {
      alert("상품이 성공적으로 등록되었습니다.");
      router.push("/");
    } else {
      alert("상품 등록에 실패했습니다.");
    }
  } catch (error) {
    console.error("상품 등록 실패:", error);
    alert("상품 등록에 실패했습니다.");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div v-if="!decoded" :class="$style.loadingContainer">
    <div>로딩 중...</div>
  </div>

  <div v-else :class="$style.container">
    <div :class="$style.formContainer">
      <h1 :class="$style.title">상품 등록</h1>

      <form @submit.prevent="handleSubmit">
        <div :class="$style.formGroup">
          <label :class="$style.label">상품명 *</label>
          <input
            type="text"
            v-model="form.productName"
            :class="$style.input"
            required
          />
        </div>

        <div :class="$style.formGroup">
          <label :class="$style.label">가격 *</label>
          <input
            type="number"
            v-model="form.productPrice"
            :class="$style.input"
            required
          />
        </div>

        <div :class="$style.formGroup">
          <label :class="$style.label">카테고리 *</label>
          <select
            v-model="form.categoryCode"
            :class="$style.select"
            required
          >
            <option value="">카테고리 선택</option>
            <option value="1">식사</option>
            <option value="2">디저트</option>
            <option value="3">음료</option>
          </select>
        </div>

        <div :class="$style.formGroup">
          <label :class="$style.label">주문 가능 여부 *</label>
          <select
            v-model="form.productOrderable"
            :class="$style.select"
            required
          >
            <option value="Y">주문 가능</option>
            <option value="N">주문 불가</option>
          </select>
        </div>

        <div :class="$style.formGroup">
          <label :class="$style.label">재고 수량 *</label>
          <input
            type="number"
            v-model="form.productStock"
            min="0"
            :class="$style.input"
            required
          />
        </div>

        <div :class="$style.formGroup">
          <label :class="$style.label">상품 설명</label>
          <textarea
            v-model="form.productDescription"
            rows="4"
            :class="$style.textarea"
          ></textarea>
        </div>

        <div :class="$style.formGroupLast">
          <label :class="$style.label">상품 이미지</label>
          <input
            type="file"
            accept="image/*"
            @change="handleFileChange"
            :class="$style.fileInput"
          />
        </div>

        <div :class="$style.buttonGroup">
          <button
            type="submit"
            :disabled="loading"
            :class="$style.submitBtn"
          >
            {{ loading ? "등록 중..." : "상품 등록" }}
          </button>

          <button
            type="button"
            @click="router.push('/')"
            :class="$style.cancelBtn"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style module>
.loadingContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.formContainer {
  width: 100%;
  max-width: 600px;
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: #333;
}

.formGroup {
  margin-bottom: 20px;
}

.formGroupLast {
  margin-bottom: 30px;
}

.label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.input,
.select,
.fileInput {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
}

.textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  resize: vertical;
  box-sizing: border-box;
}

.buttonGroup {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.submitBtn {
  padding: 14px 28px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  min-width: 120px;
}

.submitBtn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.cancelBtn {
  padding: 14px 28px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  min-width: 120px;
}
</style>