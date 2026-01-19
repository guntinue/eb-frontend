<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { decodeJwt } from '@/utils/jwt';
import { getToken } from '@/utils/cookies';
import { callLogoutAPI } from '@/api/auth';
import LoginModal from '@/components/common/LoginModal.vue';
import RegisterModal from '@/components/common/RegisterModal.vue';

const router = useRouter();
const authStore = useAuthStore();

const search = ref("");
const loginModal = ref(false);
const registerModal = ref(false);

const isLogin = computed(() => authStore.isLogin);

onMounted(() => {
  authStore.checkLoginStatus();
});

const onSearchChangeHandler = (e) => {
  search.value = e.target.value;
};

const onEnterkeyHandler = (e) => {
  if (e.key === "Enter") {
    router.push(`/search?value=${search.value}`);
  }
};

const onClickLogoHandler = () => {
  router.push("/");
};

const onClickMypageHandler = () => {
  const tokenString = getToken();
  const token = decodeJwt(tokenString);

  if (token && token.exp * 1000 < Date.now()) {
    loginModal.value = true;
    return;
  }

  router.push("/mypage");
};

const onClickLogoutHandler = () => {
  callLogoutAPI();
  authStore.logout();

  alert("로그아웃이 되어 메인화면으로 이동합니다.");
  router.push("/");
};

const switchToLogin = () => {
  registerModal.value = false;
  loginModal.value = true;
};

const switchToRegister = () => {
  loginModal.value = false;
  registerModal.value = true;
};
</script>

<template>
  <div>
    <!-- Modals -->
    <LoginModal
      v-if="loginModal"
      @close="loginModal = false"
      @switch-to-register="switchToRegister"
    />

    <RegisterModal
      v-if="registerModal"
      @close="registerModal = false"
      @switch-to-login="switchToLogin"
    />

    <div :class="$style.HeaderDiv">
      <button :class="$style.LogoBtn" @click="onClickLogoHandler">
        OHGIRAFFERS
      </button>
      <input
        :class="$style.InputStyle"
        type="text"
        placeholder="검색"
        v-model="search"
        @keyup="onEnterkeyHandler"
        @input="onSearchChangeHandler"
      />

      <!-- Auth Buttons -->
      <div v-if="!isLogin">
        <button
          :class="$style.HeaderBtn"
          @click="loginModal = true"
          style="background: none; border: none; cursor: pointer; color: inherit; text-decoration: underline;"
        >
          로그인
        </button>
        |
        <button
          :class="$style.HeaderBtn"
          @click="registerModal = true"
          style="background: none; border: none; cursor: pointer; color: inherit; text-decoration: underline;"
        >
          회원가입
        </button>
      </div>
      <div v-else>
        <button :class="$style.HeaderBtn" @click="onClickMypageHandler">
          마이페이지
        </button>
        |
        <button :class="$style.HeaderBtn" @click="onClickLogoutHandler">
          로그아웃
        </button>
      </div>
    </div>
  </div>
</template>

<style module>
.HeaderDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  line-height: 50px;
  min-width: 800px;
}

.InputStyle {
  width: 460px;
  height: 25px;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 20px;
  text-indent: 1em;
}

.LogoBtn {
  padding: 0;
  border: none;
  background: none;
  font-size: 1.2em;
  cursor: pointer;
}

.HeaderBtn {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}
.HeaderBtn:hover {
  text-decoration: none;
  color: slateblue;
  font-weight: bold;
}
</style>