import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/frontend/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/frontend/Index.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: 'faq',
        name: 'FAQ',
        component: () => import('../views/frontend/FAQ.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/frontend/Product.vue'),
      },
      {
        path: 'carts',
        name: 'Carts',
        component: () => import('../views/frontend/Carts.vue'),
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('../views/frontend/Checkout.vue'),
      },
      {
        path: 'payment/:orderId',
        name: 'Payment',
        component: () => import('../views/frontend/Payment.vue'),
      },
      {
        path: 'savedItems',
        name: 'SavedItems',
        component: () => import('../views/frontend/SavedItems.vue'),
      },
      {
        path: 'article/:id',
        name: 'Article',
        component: () => import('../views/frontend/Article.vue'),
      },

    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/frontend/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/backend/DashboardProducts.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backend/DashboardOrders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/DashboardCoupons.vue'),
      },
      {
        path: 'articles',
        component: () => import('../views/backend/DashboardArticles.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PathNotFound',
    component: () => import('../views/frontend/PathNotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
