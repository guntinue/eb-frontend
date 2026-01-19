<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { decodeJwt } from '@/utils/jwt';
import Profile from '@/components/member/Profile.vue';
import Payment from '@/components/member/Payment.vue';
import Purchase from '@/components/member/Purchase.vue';
import Review from '@/components/member/Review.vue';

const router = useRouter();
const activeTab = ref('profile');
const decoded = ref(null);

onMounted(() => {
  const token = window.localStorage.getItem('accessToken');
  if (!token) {
    alert("로그인이 필요합니다.");
    router.push("/");
    return;
  }

  const temp = decodeJwt(token);
  if (temp && temp.exp * 1000 < Date.now()) {
    alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
    window.localStorage.removeItem("accessToken");
    router.push("/");
    return;
  }
  decoded.value = temp;
});

const handleTabChange = (tab) => {
  activeTab.value = tab;
};
</script>

<template>
  <div v-if="decoded" :class="$style.layout">
    <div :class="$style.navbar">
      <div :class="$style.navHeader">
        <h2>마이페이지</h2>
      </div>
      <nav>
        <ul :class="$style.navList">
          <li>
            <button
              @click="handleTabChange('profile')"
              :class="[$style.navLink, activeTab === 'profile' ? $style.active : '']"
            >
              프로필
            </button>
          </li>
          <li>
            <button
              @click="handleTabChange('payment')"
              :class="[$style.navLink, activeTab === 'payment' ? $style.active : '']"
            >
              결제 내역
            </button>
          </li>
          <li>
            <button
              @click="handleTabChange('purchase')"
              :class="[$style.navLink, activeTab === 'purchase' ? $style.active : '']"
            >
              구매 내역
            </button>
          </li>
          <li>
            <button
              @click="handleTabChange('review')"
              :class="[$style.navLink, activeTab === 'review' ? $style.active : '']"
            >
              리뷰 관리
            </button>
          </li>
        </ul>
      </nav>
    </div>
    
    <div :class="$style.content">
      <h1 :class="$style.pageTitle">마이페이지</h1>
      
      <div :class="$style.tabContent">
        <Profile v-if="activeTab === 'profile'" />
        <Payment v-if="activeTab === 'payment'" />
        <Purchase v-if="activeTab === 'purchase'" />
        <Review v-if="activeTab === 'review'" />
      </div>
    </div>
  </div>
</template>

<style module>
.layout {
  display: flex;
  min-height: 100vh;
  background-color: #f4f6f8;
}

.navbar {
  width: 250px;
  background-color: white;
  border-right: 1px solid #ddd;
  padding: 20px 0;
}

.navHeader {
  padding: 0 20px 20px 20px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.navList {
  list-style: none;
  padding: 0;
  margin: 0;
}

.navLink {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 15px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: block;
}

.navLink:hover {
  background-color: #f8f9fa;
  font-weight: bold;
  color: slateblue;
}

.active {
  background-color: #e9ecef;
  font-weight: bold;
  color: slateblue;
  border-right: 3px solid slateblue;
}

.content {
  flex: 1;
  padding: 40px;
  overflow: hidden;
}

.pageTitle {
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.tabContent {
  width: 100%;
  overflow: hidden;
}
</style>