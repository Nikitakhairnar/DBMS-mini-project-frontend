import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

const jwt = require('jsonwebtoken');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "Signup" */ '../views/Signup.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem("jwt");

    if (token) {
      jwt.verify(token, 'Secret Code', (err, decodedToken) => {
        if (err) {
          console.log(err);
          next({
            name: "Signup"
          })
        } else {
          store.commit("updateCurrentUserId",decodedToken.id);
          next();
        }
      })
    } else {
      next({
        name: "Signup"
      });
    }
  } else {
    next();
  }
})

export default router
