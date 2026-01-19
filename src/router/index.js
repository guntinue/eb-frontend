import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/product/ProductDetailView.vue'
import ReviewView from '../views/review/ReviewView.vue'
import ReviewDetailView from '../views/review/ReviewDetailView.vue'
import MyPage from '../views/member/MyPageView.vue'
import ProductRegistrationView from '../views/admin/ProductRegistrationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/meal',
      name: 'meal',
      component: HomeView
    },
    {
      path: '/product/dessert',
      name: 'dessert',
      component: HomeView
    },
    {
      path: '/product/beverage',
      name: 'beverage',
      component: HomeView
    },
    {
      path: '/product/:productCode',
      name: 'product-detail',
      component: ProductDetailView
    },
    {
      path: '/review',
      name: 'review',
      component: ReviewView
    },
    {
      path: '/review-detail/:reviewCode',
      name: 'review-detail',
      component: ReviewDetailView
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage
    },
    {
      path: '/admin/product-registration',
      name: 'product-registration',
      component: ProductRegistrationView
    }
  ]
})

export default router