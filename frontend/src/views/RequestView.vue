<script setup lang="ts">
import DashboardLayout from '@/components/DashboardLayout.vue';
import BackendService from "../../BackendService"
import type { Appointment, Job } from "@/classlib/Types"
import { UserRole } from '@/classlib/Types';
import Request from '@/components/Request.vue';
import { onMounted, ref } from 'vue';
import {currentUserStore} from "@/stores/User"

const currentUser = currentUserStore();

let appointments = ref<Appointment[]>([])
let jobs = ref<Job[]>([])

onMounted(async () => {

    if(currentUser.hasRole(UserRole.Customer) ){

        const jobRes = await BackendService.getUpcomingJobs();
        jobs.value = [...jobRes?.data]
    }else{

        const apptRes = await BackendService.getAppointments();
        appointments.value = [...apptRes?.data]
    }

   
    
})


</script>
<template>
    <DashboardLayout>
        <template #content>
            <div class="overflow-x-auto w-full">
                <table class="table w-full">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox" />
                                </label>
                            </th>
                            <th>From</th>
                            <th>For</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <Request v-for="job in jobs" :job="job" :key="job.jobNumber"/>
                        <Request v-for="appointment in appointments" :appointment="appointment" :key="appointment.id"/>
                    </tbody>

                </table>
            </div>

        </template>
    </DashboardLayout>
</template>
<script lang="ts">
export default {
    name: "RequestView",
    components: {
        Request
    }
}
</script>
