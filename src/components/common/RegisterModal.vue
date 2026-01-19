<script setup>
import { ref } from 'vue';
import { callRegisterAPI } from '@/api/auth';

const props = defineProps({
  setRegisterModal: Function,
  switchToLogin: Function
});

const emit = defineEmits(['close', 'switch-to-login']);

const form = ref({
  memberId: "",
  memberPassword: "",
  memberName: "",
  memberEmail: "",
});

const isLoading = ref(false);

const onClickRegisterHandler = async () => {
  if (!form.value.memberId || !form.value.memberPassword || !form.value.memberName || !form.value.memberEmail) {
    alert("모든 정보를 입력해주세요.");
    return;
  }

  isLoading.value = true;
  try {
    const result = await callRegisterAPI({ form: form.value });

    if (result.status === 201) {
      alert("회원가입이 완료되었습니다.");
      emit('switch-to-login');
    } else {
      alert("회원가입에 실패했습니다. 입력 정보를 확인해주세요.");
    }
  } catch (error) {
    console.error("[RegisterModal] Register ERROR:", error);
    alert("회원가입에 실패했습니다.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div :class="$style.modal">
    <div :class="$style.modalContainer">
      <div :class="$style.registerModalDiv">
        <h1>회원가입</h1>
        <input
          type="text"
          name="memberId"
          placeholder="아이디"
          autocomplete="off"
          v-model="form.memberId"
        />
        <input
          type="password"
          name="memberPassword"
          placeholder="패스워드"
          autocomplete="off"
          v-model="form.memberPassword"
        />
        <input
          type="text"
          name="memberName"
          placeholder="이름"
          autocomplete="off"
          v-model="form.memberName"
        />
        <input
          type="email"
          name="memberEmail"
          placeholder="이메일"
          autocomplete="off"
          v-model="form.memberEmail"
        />
        <button @click="onClickRegisterHandler" :disabled="isLoading">
          {{ isLoading ? "가입 중..." : "회원가입" }}
        </button>
        <button
          style="border: none; margin: 0; font-size: 10px; height: 10px;"
          @click="$emit('close')"
        >
          돌아가기
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
  height: 400px;
  padding: 10px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  z-index: 1000;
}

.registerModalDiv {
  height: 380px;
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

.registerModalDiv h1 {
  margin-bottom: 10px;
  font-size: 24px;
}

.registerModalDiv input {
  margin-top: 5px;
  margin-bottom: 5px;
  height: 30px;
  width: 250px;
  border-radius: 25px;
  text-indent: 10px;
}

.registerModalDiv button {
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