<script setup>
import { ref, onMounted } from 'vue';
import { callGetMemberAPI } from '@/api/auth';
import { decodeJwt } from '@/utils/jwt';

const memberDetail = ref(null);
const loading = ref(true);
const error = ref(null);

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

    const result = await callGetMemberAPI({
      memberId: decodedToken.sub
    });

    if (result.status === 200) {
      memberDetail.value = result.data;
    } else {
      error.value = `회원 정보 조회에 실패했습니다. (${result.status})`;
    }
  } catch (err) {
    error.value = `회원 정보를 불러오는데 실패했습니다: ${err.message}`;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading" :class="$style.container">
    <div>회원 정보를 불러오는 중...</div>
  </div>

  <div v-else-if="error" :class="[$style.container, $style.error]">
    <div>오류: {{ error }}</div>
  </div>

  <div v-else :class="$style.container">
    <h2 :class="$style.title">내 정보</h2>

    <div v-if="memberDetail" :class="$style.form">
      <div>
        <label :class="$style.label">아이디</label>
        <input
          type="text"
          :value="memberDetail.memberId || ''"
          readonly
          :class="$style.input"
        />
      </div>
      <div>
        <label :class="$style.label">이름</label>
        <input
          type="text"
          :value="memberDetail.memberName || ''"
          readonly
          :class="$style.input"
        />
      </div>
      <div>
        <label :class="$style.label">이메일</label>
        <input
          type="text"
          :value="memberDetail.memberEmail || ''"
          readonly
          :class="$style.input"
        />
      </div>
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

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  background-color: #f8f9fa;
}
</style>