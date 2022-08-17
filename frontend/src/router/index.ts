import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { currentUserStore } from '@/stores/User';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {auth: false},
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      meta: {auth: false},
      component: () => import('../views/AboutView.vue')
    },
    {
      path: "/appointmentbooking",
      name: "appointmentbooking",  
      meta: {auth: false},
      component: ()=> import("../views/AppointmentBookingView.vue")
    },
    {
      path: "/register",
      name: "register",
      meta: {auth: false},
      component: ()=> import("@/views/RegisterView.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: {auth: false},
      component: ()=> import("@/views/LoginView.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: {auth: true},
      component: ()=>import("@/views/DashboardView.vue")
    },
    {
      path: "/dashboard/workhistory",
      name: "workhistory",
      meta: {auth: true},
      component: ()=>import("@/views/WorkHistoryView.vue")
    },
    {
      path: "/dashboard/jobboard",
      name: "jobboard",
      meta: {auth: true},
      component: ()=> import("@/views/JobBoardView.vue")
    },
    {
      path: "/dashboard/viewjob/:id",
      name: "viewjob",
      meta: {auth: true},
      component: ()=> import("@/views/JobDetailsView.vue")
    },
    {
      path: "/dashboard/createjob/:id?",
      name: "createjob", 
      meta: {auth: true},
      component: ()=> import("@/views/CreateJobView.vue")
    },
    {
      path: "/yourschedule",
      name: "yourschedule",
      meta: {auth: true},
      component: () => import("../views/ScheduleView.vue")
    },
    {
      path: "/dashboard/requests",
      name: "requests",
      meta: {auth: true},
      component: ()=> import("@/views/RequestView.vue")
    },
    {
      path: "/dashboard/vehicles",
      name: "vehicles",
      meta: {auth: true},
      component: ()=> import("@/views/UserVehiclesView.vue")
    },
    {
      path: "/dashboard/appointmentbooking",
      name: "euAppointmentBooking",
      meta: {auth: true},
      component: ()=> import("@/views/EUAppointmentBookingView.vue")
    },
    {
      path: "/dashboard/appointment/:id",
      name: "appointmentview",
      meta: {auth: true},
      component: ()=> import("@/views/AppointmentView.vue")
    },
    {
      path: "/dashboard/manageusers",
      name: "manageusers",
      meta: {auth: true},
      component: ()=> import("@/views/ManageUserView.vue")
    },
    {
      path: "/dashboard/adduser",
      name: "adduser",
      meta: {auth: true},
      component: ()=> import("@/views/CreateUserView.vue")
    },
    {
      path: "/dashboard/manageusers/edit/:id",
      name: "edituser",
      meta: {auth: true},
      component: ()=> import("@/views/EditUserView.vue")

    },
    {
      path: "/profile",
      name: "profile",
      meta: {auth: true},
      component: ()=> import("@/views/ProfileView.vue")
    },
    {
      path: "/dashboard/changepassword",
      name: "changepassword",
      meta: {auth: true},
      component: ()=> import("@/views/ChangePasswordView.vue")
    }
  ]
})

router.beforeEach((to, from, next)=>{

  const currentUser = currentUserStore();
  
  //If auth is true and User is not logged in. i.e Route that requires user Authentication
  if(to.meta.auth && !currentUser.loggedIn){
    next({path: "/login"});
  }else{
    next();
  }
  
}) 



export default router
