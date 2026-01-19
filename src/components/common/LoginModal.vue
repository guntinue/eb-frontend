<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { callLoginAPI } from '@/api/auth';
import { removeToken } from '@/utils/cookies';

const props = defineProps({
  setLoginModal: Function,
  switchToRegister: Function
});

const emit = defineEmits(['close', 'switch-to-register']);

const form = ref({
  memberId: "",
  memberPassword: "",
});

const isLoading = ref(false);
const authStore = useAuthStore();

const onClickLoginHandler = async () => {
  if (!form.value.memberId || !form.value.memberPassword) {
    alert("아이디와 비밀번호를 입력해주세요.");
    return;
  }

  isLoading.value = true;
  try {
    removeToken();

    const result = await callLoginAPI({ form: form.value });

    if (result.status === 200) {
      // Login successful
      // Update store
      authStore.login(result.userInfo.accessToken); // This updates the store state

      emit('close');
      alert("로그인이 완료되었습니다.");
    } else {
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  } catch (error) {
    console.error("[LoginModal] Login ERROR:", error);
    alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div :class="$style.modal">
    <div :class="$style.modalContainer">
      <div :class="$style.loginModalDiv">
        <h1>로그인</h1>
        <input
          type="text"
          name="memberId"
          placeholder="아이디"
          autocomplete="off"
          v-model="form.memberId"
          @keyup.enter="onClickLoginHandler"
        />
        <input
          type="password"
          name="memberPassword"
          placeholder="패스워드"
          autocomplete="off"
          v-model="form.memberPassword"
          @keyup.enter="onClickLoginHandler"
        />
        <button @click="onClickLoginHandler" :disabled="isLoading">
          {{ isLoading ? "로그인 중..." : "로그인" }}
        </button>
        <button
          style="border: none; margin: 0; font-size: 10px; height: 10px;"
          @click="$emit('close')"
        >
          돌아가기
        </button>
        <!-- Add switch to register button if needed, original passed switchToRegister -->
         <button
          style="border: none; margin-top: 5px; font-size: 10px; height: 10px;"
          @click="$emit('switch-to-register')"
        >
          회원가입
        </button>
      </div>
    </div>
  </div>
</template>

<style module>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modalContainer {
  position: absolute;
  width: 300px;
  height: 350px; /* Increased height for extra button */
  padding: 10px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  z-index: 1000;
}

.loginModalDiv {
  height: 300px;
  width: 300px;
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

.loginModalDiv input {
  margin-top: 5px;
  margin-bottom: 5px;
  height: 30px;
  width: 250px;
  border-radius: 25px;
  text-indent: 10px;
}

.loginModalDiv button {
  margin-top: 5px;
  margin-bottom: 5px;
  height: 30px;
  width: 250px;
  border-radius: 25px;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>