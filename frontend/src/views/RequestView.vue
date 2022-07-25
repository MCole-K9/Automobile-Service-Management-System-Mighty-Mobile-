<script setup lang="ts">
import DashboardLayout from '@/components/DashboardLayout.vue';
import BackendService from "../../BackendService"
import type { Appointment } from "@/classlib/Types"
import { onMounted, ref } from 'vue';

let appointments = ref<Appointment[]>([])

onMounted(async () => {
    const res = await BackendService.getAppointments();
    console.log(res)
    appointments.value = [...res?.data]
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
                        <!-- row 1 -->
                        <tr v-for="appointment in appointments" :key="appointment.id">
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div class="flex items-center space-x-3">
                                    <div class="avatar">
                                        <!-- <div class="mask mask-squircle w-12 h-12">
                                            <img src="/tailwind-css-component-profile-2@56w.png"
                                                alt="Avatar Tailwind CSS Component" />
                                           
                                        </div> -->
                                         <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="font-bold">
                                            {{ appointment.customer?.firstName }}
                                            {{ appointment.customer?.lastName }}
                                        </div>
                                        <div class="text-sm opacity-50">Customer</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Assestment of {{ appointment.vehicle?.year }} {{ appointment.vehicle?.make }}
                                {{ appointment.vehicle?.model }}
                                <br>
                                <span class="badge badge-ghost badge-sm">Appointment</span>
                            </td>
                            <td>{{ appointment.suggestedDate }}</td>
                            <th>
                                <button class="btn btn-ghost btn-xs">Details</button>
                            </th>
                        </tr>

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
    }
}
</script>
