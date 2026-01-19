<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const authStore = useAuthStore();

const decoded = computed(() => authStore.userRole);

// Helper to determine active class
const isActive = (path) => route.path === path;
</script>

<template>
  <div :class="$style.NavbarDiv">
    <ul :class="$style.NavlistUl">
      <li>
        <router-link
          to="/"
          :class="[$style.navLink, isActive('/') ? $style.active : '']"
        >
          모든 음식
        </router-link>
      </li>
      <li>
        <router-link
          to="/product/meal"
          :class="[$style.navLink, isActive('/product/meal') ? $style.active : '']"
        >
          식사
        </router-link>
      </li>
      <li>
        <router-link
          to="/product/dessert"
          :class="[$style.navLink, isActive('/product/dessert') ? $style.active : '']"
        >
          디저트
        </router-link>
      </li>
      <li>
        <router-link
          to="/product/beverage"
          :class="[$style.navLink, isActive('/product/beverage') ? $style.active : '']"
        >
          음료
        </router-link>
      </li>
      <li v-if="decoded === 'ROLE_ADMIN'">
        <router-link
          to="/admin/product-registration"
          :class="[$style.navLink, isActive('/admin/product-registration') ? $style.active : '']"
        >
          상품등록
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style module>
.NavbarDiv {
  border-top: solid 1px black;
  border-bottom: solid 1px black;
}

.NavlistUl {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  min-width: 800px;
  list-style: none;
  padding-left: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.NavlistUl li {
  min-width: 170px;
  height: auto;
  text-align: center;
}

.navLink {
  text-decoration: none;
  color: black;
}

.navLink:focus,
.navLink:hover {
  text-decoration: none;
  color: slateblue;
  font-weight: bold;
}

.active {
  color: slateblue;
  font-weight: bold;
}
</style>