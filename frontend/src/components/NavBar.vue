<script setup lang="ts">
  import {RouterLink} from 'vue-router';
  import {newUserStore, currentUserStore} from "../stores/User"
  import UserMenu from "./UserMenu.vue"

  const newUser = newUserStore();
  const currentUser = currentUserStore();
</script>
<template>
  <div class="navbar bg-ourYellow">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <!-- <li><a>Item 1</a></li> -->
          <li tabindex="0">
            <a class="justify-between">
              Services
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
            </a>
            <ul class="p-2">
              <li><a>Repair</a></li>
              <li><a>Maintenance</a></li>
            </ul>
          </li>
          <li>
            <router-link to="/appointmentbooking">Appointment Booking</router-link>
          </li>
        </ul>
      </div>

      <router-link class="flex items-center space-x-2" to="/">
        <img class="h-20" src="../assets/Logo.png" alt="Logo">
        <h4 class="text-xl hidden md:block">Mighty Mobile Auto Service & Repair</h4>
      </router-link>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal p-0">
        <!-- <li><a>Home</a></li> -->
        <li tabindex="0">
          <a>
            Services
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
          </a>
          <ul class="p-2 bg-white shadow-lg">
            <li>
              <router-link to="">Repair</router-link>
            </li>
            <li>
              <router-link to="/appointmentbooking">Maintenance</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/appointmentbooking">Appointment Booking</router-link>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <router-link v-if="!currentUser.loggedIn" @click="newUser.clearData" to="/login"
        class="bg-red-600 border-ourYellow btn px-8">Login/Register
      </router-link>
     <UserMenu v-else/>
    </div>
  </div>
</template>
<style></style>
<script lang="ts">
export default {};
</script>