<script setup lang="ts">

    import type { Appointment, Job } from "@/classlib/Types"
    import { currentUserStore } from "@/stores/User";
    const currentUser = currentUserStore();


    const props = defineProps<{
        job?: Job
        appointment?: Appointment,
        index? : number 

    }>()

</script>
<template>
 <!-- if is an Appointment -->
    <tr v-if="props.appointment">
        <th>{{props.index}}</th>
        <td>
            <div class="flex items-center space-x-3">
                <div class="avatar">
                    <!-- <div class="mask mask-squircle w-12 h-12">
                                            <img src="/tailwind-css-component-profile-2@56w.png"
                                                alt="Avatar Tailwind CSS Component" />
                                           
                                        </div> -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <div class="font-bold">
                        {{ props.appointment.customer?.firstName }}
                        {{ props.appointment.customer?.lastName }}
                    </div>
                    <div class="text-sm opacity-50">Customer</div>
                </div>
            </div>
        </td>
        <td>
            Assessment of {{ props.appointment.vehicle?.year }} {{ props.appointment.vehicle?.make }}
            {{ props.appointment.vehicle?.model }}
            <br>
            <span class="badge badge-ghost badge-sm">Appointment</span>
        </td>
        <td>{{ $parseDate(props.appointment.suggestedDate) }}</td>
        <th v-if="(currentUser.isAdmin || currentUser.isManager || currentUser.isMechanic)">
            <button @click="$router.push({path: `/dashboard/appointment/${appointment?.id}`})" class="btn btn-ghost bg-ourYellow btn-xs">Details</button>
        </th>
        <th v-if="(currentUser.isAdmin || currentUser.isManager || currentUser.isMechanic)">
            <button class="btn btn-ghost bg-ourYellow btn-xs" @click="$router.push(`/dashboard/createjob/${appointment?.id}`)">create job</button>
        </th>
    </tr>

    <!-- if is a Job -->
     <tr v-if="props.job">
        <td>
            <div class="flex items-center space-x-3">
                <div class="avatar">
                    <!-- <div class="mask mask-squircle w-12 h-12">
                                            <img src="/tailwind-css-component-profile-2@56w.png"
                                                alt="Avatar Tailwind CSS Component" />
                                           
                                        </div> -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <div class="font-bold">
                        {{ props.job.createdBy?.firstName }}
                        {{ props.job.createdBy?.lastName }}
                    </div>
                    <div class="text-sm opacity-50">Mighty Mobile</div>
                </div>
            </div>
        </td>
        <td>
            {{props.job.serviceType}} of {{ props.job.vehicle?.year }} {{ props.job.vehicle?.make }}
            {{ props.job.vehicle?.model }}
            <br>
            <span class="badge badge-ghost badge-sm">Job Request</span>
        </td>
        <td>{{ $parseDate(props.job.startDate) }}</td>
        <th>
            <button  class="btn btn-ghost bg-ourYellow btn-xs" @click="$router.push(`/dashboard/viewjob/${props.job?.jobNumber}`)">Details</button>
        </th>
    </tr>
</template>
<script lang="ts">
export default {
    name: "Request",
    components: {
    }
}
</script>