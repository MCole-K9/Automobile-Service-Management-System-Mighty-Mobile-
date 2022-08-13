<script setup lang="ts">
  import type { Appointment } from '@/classlib/Types';
  import { ref } from 'vue';
  import SelectMechanic from './SelectMechanic.vue';
  import { currentUserStore } from '@/stores/User';

  const currentUser = currentUserStore();

  const emits = defineEmits(["assignmechanic"])

  const props = defineProps<{
    appointment: Appointment
  }>();

  const editableMech = ref(false)

  function handleAssignMechClick(){
    
    if(editableMech.value){
      emits("assignmechanic")
    }
    editableMech.value = !editableMech.value;

  }

  function handleMechSelect(mechanicId: number){
    console.log(mechanicId);
    
    props.appointment.assignedMechId = mechanicId;
  }
   
</script>
<template>
    <section id="appointment" class="grid grid-cols-6 gap-6 shadow-lg p-6">
      <button class="btn btn-sm max-w-fit" @click="$router.back()">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
      </button>
      <p class="text-2xl my-3 text-center font-bold col-span-6">Appointment Information</p>
        <div class="col-span-3 md:col-span-2">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Customer</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ `${props.appointment.customer?.firstName} ${props.appointment.customer?.lastName}`  }}
            </p>
        </div>
        <div class="col-span-3 md:col-span-2">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Mobile</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ props.appointment.customer?.phoneNumber }}
            </p>
        </div>
        <div class="col-span-6 md:col-span-2">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Email</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ props.appointment.customer?.email }}
            </p>
        </div>
        <div class="col-span-6 md:col-span-3">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Vehicle</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ `${props.appointment.vehicle?.year } ${props.appointment.vehicle?.make } ${props.appointment.vehicle?.model }`}}
            </p>
        </div>
        <div class="col-span-6 md:col-span-3">
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
        <div class="col-span-6 md:col-span-3">
            <label for="full-name" class="block text-sm font-medium text-gray-700">City/Town</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ props.appointment.town  }}
            </p>
        </div>
        <div class="col-span-6 md:col-span-3">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Parish</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ props.appointment.parish  }}
            </p>
        </div>
        <div class="col-span-6 md:col-span-3">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Status</label>
            <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
              {{ props.appointment.fulfilled? "Fulfilled" : "Not Fulfilled" }}
            </p>
        </div>
        <div class="col-span-6 md:col-span-3">
            <label for="full-name" class="block text-sm font-medium text-gray-700">Assigned Mechanic</label>
            <p :class="`h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium ${editableMech ? 'hidden': ''}`">
              {{  props.appointment.assignedMech ? `${props.appointment.assignedMech?.firstName} ${props.appointment.assignedMech?.lastName }` : "Unassigned"   }}  
            </p>
            <SelectMechanic v-if="currentUser.isManager" @cancel="editableMech = false"  @assign-mechanic="handleAssignMechClick" @selected="handleMechSelect" :editableMech="editableMech"/>
        </div>
        <div class="col-span-6 flex justify-end">
          <button class="btn btn-ghost bg-ourYellow" @click="$router.push(`/dashboard/createjob/${appointment?.id}`)">Create Job</button>
        </div>
    </section>
</template>
<script lang="ts">  
    export default {
        name: "AppointmentInformation",
        components: {
          SelectMechanic
        }
    }
</script>