<script setup lang="ts">
    import {onMounted, ref, type Ref} from "vue"
    import { useRoute, useRouter } from "vue-router";
    import type { Appointment } from '@/classlib/Types';
    import DashboardLayout from '@/components/DashboardLayout.vue';
    import BackendService from "../../BackendService";
    import AppointmentInformation from "../components/AppointmentInformation.vue";
    import LoadingAnimation from "@/components/LoadingAnimation.vue";

    const router = useRouter();
    const route = useRoute();

    const appointment = ref<Appointment>() as Ref<Appointment>;

    onMounted(async ()=>{
        //Get Appt id from route param

        const appointmentId: number = parseInt(route.params.id as string);

        //Fetch Appointment from db with id
        const res = await BackendService.getAppointment(appointmentId);

        // populate local appointment instance
        appointment.value = res?.data as Appointment


    })


</script>
<template>
    <DashboardLayout>
        <template #content>
            <LoadingAnimation v-if="!appointment"   />
            <AppointmentInformation v-if="appointment" :appointment="appointment" :key="appointment.id" />
        </template>
    </DashboardLayout> 
</template>
<script lang="ts">  
    export default {
        name: "AppointmentView",
        components: {
        }
    }
</script>