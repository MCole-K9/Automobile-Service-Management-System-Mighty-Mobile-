<script setup lang="ts">
import { defineComponent } from '@vue/runtime-core';
import AppBar from './AppBar.vue';
import {currentUserStore} from "@/stores/User";

const currentUser = currentUserStore();

</script>

<template>
<main>
<AppBar>    
   <label for="my-drawer-2" class="btn btn-square btn-ghost drawer-button lg:hidden"> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"> </path>
      </svg>
    </label>
 </AppBar>
<div class="drawer drawer-mobile" style="height:calc(100vh - 6rem)">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content px-6 py-4">
    <slot name="content"></slot>
  
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay" ></label> 
    <ul class="menu p-4 overflow-y-auto w-60 sticky text-base-content bg-ourYellow" style="height:calc(100vh - 6rem)">
      <!-- Sidebar content here -->
      <li><router-link to="/dashboard">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
        Dashboard</router-link></li>
      <li><router-link to="/dashboard/requests">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
        {{(currentUser.isAdmin || currentUser.isManager || currentUser.isMechanic)? 'Appointment':'Job'}} Requests</router-link></li>
      <li v-if="!currentUser.isCustomer"><router-link to="/dashboard/jobboard">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        Job Board</router-link></li>
      <li v-if="!currentUser.isCustomer"><router-link to="/yourschedule">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        Schedule</router-link></li>
      <li v-if="currentUser.isCustomer"><router-link to="/dashboard/vehicles">
        
        Vehicles</router-link></li>
      <li v-if="!currentUser.isCustomer"><router-link to="/dashboard/workhistory">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
        Work History</router-link></li>
      <li v-if="currentUser.isAdmin"><router-link to="/dashboard/manageusers">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        Manage Users</router-link></li>
      <li class="fixed w-52 bottom-4"><router-link to="/profile">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        User Profile</router-link></li>
    </ul>
  
  </div>
</div>
</main>

  
</template>



<style>

</style>
<script lang="ts">
  export default {
    name: "DashboardLayout",
    components: {
      AppBar
    }
  };
</script>