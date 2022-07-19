import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: "/appointmentbooking",
      name: "appointmentbooking",
      component: ()=> import("../views/AppointmentBookingView.vue")
    },
    {
      path: "/register",
      name: "register",
      component: ()=> import("@/views/RegisterView.vue")
    },
    {
      path: "/login",
      name: "login",
      component: ()=> import("@/views/LoginView.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: ()=>import("@/views/DashboardView.vue")
    },
    {
      path: "/dashboard/workhistory",
      name: "workhistory",
      component: ()=>import("@/views/WorkHistoryView.vue")
    },
    {
      path: "/dashboard/jobboard",
      name: "jobboard",
      component: import("@/views/JobBoardView.vue")
    },
    {
      path: "/viewjob",
      name: "viewjob",
      component: import("@/views/JobDetailsView.vue")
    },
  ]
})

export default router
