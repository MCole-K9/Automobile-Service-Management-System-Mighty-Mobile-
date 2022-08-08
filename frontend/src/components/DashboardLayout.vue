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
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/dashboard/requests">Requests</router-link></li>
      <li v-if="!currentUser.isCustomer"><router-link to="/dashboard/jobboard">Job Board</router-link></li>
      <li v-if="!currentUser.isCustomer"><router-link to="/yourschedule">Schedule</router-link></li>
      <li v-if="currentUser.isCustomer"><router-link to="/dashboard/vehicles">Vehicles</router-link></li>
      <li v-if="!currentUser.isCustomer"><router-link to="/dashboard/workhistory">Work History</router-link></li>
      <li v-if="!currentUser.isCustomer"><router-link to="/dashboard/manageusers">Manage Users</router-link></li>
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