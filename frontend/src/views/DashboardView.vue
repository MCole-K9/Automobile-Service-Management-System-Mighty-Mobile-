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
          <UserDashboard v-if="currentUser.isCustomer" />
          <MechanicDashboard v-if="currentUser.isMechanic || currentUser.isManager"/>
        </template>
        </DashboardLayout>
  </main>
</template>

