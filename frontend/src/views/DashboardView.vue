<script lang="ts">

import DashboardLayout from "../components/DashboardLayout.vue";
import UserDashboard from "../components/UserDashboard.vue";
export default{
    components:{
        DashboardLayout,
        UserDashboard,
    }
}
</script>

<template>
  <main>
    <DashboardLayout>
        <template #content>
          <UserDashboard/>
        </template>
        </DashboardLayout>
  </main>
</template>

