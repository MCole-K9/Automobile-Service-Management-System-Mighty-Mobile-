<script setup lang="ts">
import { ref } from "vue";
import type { Job } from "../classlib/Types";
import { UserRole } from "../classlib/Types";
import { currentUserStore } from "@/stores/User";
import BackendService from "../../BackendService";

const props = defineProps<{
  job: Job;
}>();

const emits = defineEmits(["addressChange", "UpdateAddress"]);

const currentUser = currentUserStore();
let isCustomer = ref<boolean>(currentUser.hasRole(UserRole.Customer));

let editableAddress = ref(false);

function changeAddress(event:Event) {
  const { name, value } = event.target as HTMLInputElement ;
  emits("addressChange", name, value);
}

async function setJobAsCompleted(){
  props.job.completed = true
  console.log(props.job);
  
  await BackendService.updateJob(props.job)
}
</script>

<template>
  <div class="mx-auto my-auto">
    <div class="md:col-span-2">
      <button class="btn btn-sm" @click="$router.back()">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
      </button>
      <p class="text-2xl my-3 text-center font-bold">Job Information</p>
      <div class="shadow-2xl overflow-hidden rounded-lg">
        <div :class="`px-4 py-5 bg-white  sm:p-6`">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-2">
              <label for="full-name" class="block text-sm font-medium text-gray-700">Job No.</label>
              <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
                {{ props.job.jobNumber }}
              </p>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label for="service" class="block text-sm font-medium text-gray-700">Service type</label>
              <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
                {{ props.job.serviceType }}
              </p>
            </div>
            <div class="col-span-3 sm:col-span-1">
              <label for="email-address" class="block text-sm font-medium text-gray-700">Start Date</label>
              <p class="h-10 flex px-3 items-center rounded bg-gray-300 text-black font-medium">
                {{ $parseDate(props.job.startDate) }}
              </p>
            </div>

            <div class="col-span-3 sm:col-span-1">
              <label for="phone-number" class="block text-sm font-medium text-gray-700">End Date</label>
              <p class="h-10 flex px-3 items-center rounded bg-gray-300 text-black font-medium">
                {{ $parseDate(props.job.endDate) }}
              </p>
            </div>

            <div class="col-span-6 sm:col-span-6">
              <label for="country" class="block text-sm font-medium text-gray-700">Summary</label>
              <p class="h-fit p-3 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
                {{ props.job.summary }}
              </p>
            </div>

            <div class="col-span-6">
              <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
              <p
                :class="`h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium ${editableAddress ? 'hidden' : ''}`">
                {{ props.job.streetAddress }}
              </p>
              <input @input="changeAddress" :value="props.job.streetAddress" name="streetAddress" :class="`input input-bordered w-full ${!editableAddress ? 'hidden' : ''
              }`" type="text" />
            </div>

            <div class="col-span-3">
              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
              <p :class="`h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium ${editableAddress ? 'hidden' : ''
              }`">
                {{ props.job.town }}
              </p>
              <input @input="changeAddress" :value="props.job.town" :class="`input input-bordered w-full ${!editableAddress ? 'hidden' : ''
              }`" name="town" type="text" />
            </div>

            <div class="col-span-3">
              <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
              <p :class="`h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium ${editableAddress ? 'hidden' : ''
              }`">
                {{ props.job.parish }}
              </p>
              <input @input="changeAddress" :value="props.job.parish" :class="`input input-bordered w-full ${!editableAddress ? 'hidden' : ''}`" name="parish" type="text" />
              <div :class="`flex justify-end space-x-3 ${!isCustomer ? 'hidden' : ''}`">
                <button @click="emits('UpdateAddress')" :class="`btn btn-sm my-2 ${!editableAddress ? 'hidden' : ''}`">Save</button>
                <button @click="editableAddress = !editableAddress" class="btn btn-sm my-2">
                  {{ editableAddress ? "Disable" : "Edit Address" }}
                </button>
              </div>
            </div>

            <div class="col-span-6 sm:col-span-2">
              <label for="full-name" class="block text-sm font-medium text-gray-700">Vehicle</label>
              <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
                {{ props.job.vehicle?.year }} {{ props.job.vehicle?.make }}
                {{ props.job.vehicle?.model }}
              </p>
            </div>
            <div class="col-span-6 sm:col-span-2">
              <label for="email-address" class="block text-sm font-medium text-gray-700">Assigned Mechanic</label>
              <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
                {{
                    props.job.assignedMechanic
                      ? `${props.job.assignedMechanic?.firstName}
                                ${props.job.assignedMechanic?.lastName}`
                      : "Unassigned"
                }}
              </p>
            </div>

            <div class="col-span-6 sm:col-span-2">
              <label for="phone-number" class="block text-sm font-medium text-gray-700">Created By</label>
              <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">
                {{ props.job.createdBy?.firstName }}
                {{ props.job.createdBy?.lastName }}
              </p>
            </div>
            <div class="overflow-x-auto col-span-6 sm:col-span-3">
              <table class="table w-full">
                <!-- <label for="parts" class="block text-sm font-medium text-gray-700">Parts</label> -->
                <thead>
                  <tr>
                    <th class="bg-gray-300">Name</th>
                    <th class="bg-gray-300">Price</th>
                  </tr>
                </thead>
                <tbody class="">
                  <!-- row 1 -->
                  <tr v-for="part in props.job.requiredParts" :key="part.id">
                    <td>{{ part.name }}</td>
                    <td>${{ part.price }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-span-6 sm:col-span-3 flex flex-col justify-between gap-2">
              <label for="phone-number" class="block text-sm font-medium text-gray-700">Service Fee</label>
              <p class="h-10 flex px-3 items-center border border-success bg-gray-300 rounded text-black font-medium">
                ${{ props.job.serviceFee }}
              </p>
              <label for="phone-number" class="block text-sm font-medium text-gray-700">Total Cost</label>
              <p class="h-10 flex px-3 items-center border border-success bg-gray-300 rounded text-black font-medium">
                ${{ props.job.totalCost }}
              </p>
              <span class="flex flex-col justify-between bg-gray-200 px-5 my-5" v-if="currentUser.isAdmin || currentUser.isManager || currentUser.isMechanic">
                <span class="flex justify-between items-center w-1/1 m-2">
                  <label class="font-medium">Confirmed by user:</label>
                   <p :class="`h-10 px-3 flex rounded self-center items-center max-w-fit ${props.job.confirmed ? 'bg-success' : 'bg-error'}`">
                    {{ props.job.confirmed ? "Yes" : "No" }}
                  </p>
                </span>
                <span class="flex justify-between items-center w-1/1 m-2">
                  <label class="font-medium">Payment</label>
                  <p :class="`h-10 px-3 flex rounded self-center items-center max-w-fit ${props.job.isPaid ? 'bg-success' : 'bg-error'}`">
                    {{ props.job.isPaid ? "Made" : "Not made" }}
                  </p>
                </span>
                <span class="flex justify-between items-center w-1/1 m-2">
                  <label class="font-medium">Job Status</label>
                   <p :class="`h-10 px-3 flex rounded self-center items-center max-w-fit ${props.job.completed ? 'bg-success' : 'bg-error'}`">
                    {{ props.job.completed ? "Completed" : "Not yet done" }}
                  </p>
                </span>
              </span>
              <span class="flex flex-col justify-between bg-gray-200 px-5 my-5" v-else-if="props.job.confirmed">
                <span class="flex justify-between items-center w-1/1 m-2">
                  <label class="font-medium">Job Payment</label>
                  <button class="btn btn-success">pay now</button>
                </span>
              </span>
              <button class="btn btn-success max-w-xs self-center" @click="setJobAsCompleted" v-if="!props.job.completed && props.job.confirmed && (currentUser.isAdmin || currentUser.isManager || currentUser.isMechanic)">Set as Completed
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script lang="ts">
export default {
  name: "Job",
};
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $parseDate(date:Date) : Date
  }
}
</script>
