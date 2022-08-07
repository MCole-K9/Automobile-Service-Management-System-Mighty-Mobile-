<script setup lang="ts">
    import type { Appointment } from '@/classlib/Types';



    const props = defineProps<{
        appointment: Appointment
    }>()
   
</script>
<template>
    <section id="appointment" class="grid grid-cols-6 gap-6 shadow-lg p-6">
        <div class="col-span-2">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Customer</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ `${props.appointment.customer?.firstName} ${props.appointment.customer?.lastName}`  }}
            </p>
        </div>
        <div class="col-span-2">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Mobile</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ props.appointment.customer?.phoneNumber }}
            </p>
        </div>
        <div class="col-span-2">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Email</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ props.appointment.customer?.email }}
            </p>
        </div>
        <div class="col-span-3">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Vehicle</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ `${props.appointment.vehicle?.year } ${props.appointment.vehicle?.make } ${props.appointment.vehicle?.model }`}}
            </p>
        </div>
        <div class="col-span-3">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Suggested Date</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ $parseDate(props.appointment.suggestedDate)  }}
            </p>
        </div>
        <div class="col-span-6">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Problem Description</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ props.appointment.problemDescription  }}
            </p>
        </div>
        <div class="col-span-6">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Street Address</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ props.appointment.streetAddress  }}
            </p>
        </div>
        <div class="col-span-3">
            <label for="full-name" class="block text-sm font-medium text-gray-700">City/Town</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ props.appointment.town  }}
            </p>
        </div>
        <div class="col-span-3">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Parish</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ props.appointment.parish  }}
            </p>
        </div>
        <div class="col-span-3">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Status</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ props.appointment.fulfilled? "Fulfilled" : "Not Fulfilled" }}
            </p>
        </div>
        <div class="col-span-3">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Assigned Mechanic</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{  props.appointment.assignedMech ? `${props.appointment.assignedMech?.firstName} ${props.appointment.assignedMech?.lastName }` : "Unassigned"   }}  
            </p>
        </div>
    </section>
</template>
<script lang="ts">  
    export default {
        name: "AppointmentInformation",
        components: {
        }
    }
</script>