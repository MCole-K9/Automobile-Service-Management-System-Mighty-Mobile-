<script setup lang="ts">
    import DashboardLayout from '@/components/DashboardLayout.vue';
    import AppointmentBooking from '@/components/AppointmentBooking.vue';
</script>
<template>
    <DashboardLayout>
        <template #content>
            <AppointmentBooking />
        </template>
    </DashboardLayout> 
</template>
<script lang="ts">  
    export default {
        name: "ExistingUserAppointmentBookingView",
        components: {
            DashboardLayout
        }
    }
</script>