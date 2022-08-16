<script setup lang="ts">

import DashboardLayout from "../components/DashboardLayout.vue";
import UserDashboard from "../components/UserDashboard.vue";
import MechanicDashboard from "@/components/MechanicDashboard.vue";
import { currentUserStore } from "@/stores/User";
const currentUser = currentUserStore();


</script>

<template>
  <main>
    <DashboardLayout>
        <template #content>
          <span class="flex flex-col sm5:flex-row justify-between m-5">
                <p class="text-gray-800 text-3xl sm5:text-left text-center sm:text-4xl lg:text-5xl font-bold">Dashboard</p>
                <span class="flex justify-center mt-5 sm5:mt-0 sm5:justify-end gap-x-3">
                  <button class="btn btn-sm  lg:btn-md" @click="$router.push('dashboard/jobboard')" v-if="currentUser.isMechanic || currentUser.isManager">view job board</button>
                  <button class="btn btn-sm lg:btn-md" @click="$router.push('dashboard/vehicles')" v-if="currentUser.isCustomer">view vehicles</button>
                </span>
                
            </span>
          <UserDashboard v-if="currentUser.isCustomer" />
          <MechanicDashboard v-if="currentUser.isMechanic || currentUser.isManager"/>
        </template>
        </DashboardLayout>
  </main>
</template>

