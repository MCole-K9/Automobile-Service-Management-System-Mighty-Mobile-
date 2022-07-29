<script setup lang="ts">
  import { ref } from 'vue';
  import  type { Job } from '../classlib/Types';
  import  { UserRole } from '../classlib/Types';
  import { currentUserStore } from '@/stores/User';

  const props = defineProps<{
      job: Job,
  }>();

  const emits = defineEmits(["addressChange"])

  const currentUser = currentUserStore();
  let isCustomer = ref<boolean>(currentUser.hasRole(UserRole.Customer));

  let editableAddress = ref(false)

  function changeAddress(event: any ) {

    const {name, value} = event.target
    emits("addressChange", name, value)
  }


</script>

<template>
        <div class="mx-auto my-auto">
          <div class="md:col-span-2">
            <p class="text-2xl my-3 text-center font-bold">Job Information</p>
              <div class="shadow-2xl overflow-hidden rounded-lg">
                <div :class="`px-4 py-5 bg-white  sm:p-6`">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-2">
                      <label for="full-name" class="block text-sm font-medium text-gray-700">Job No.</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">{{props.job.jobNumber}}</p>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label for="service" class="block text-sm font-medium text-gray-700">Service type</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">{{props.job.serviceType}}</p>
                    </div>
                    <div class="col-span-3 sm:col-span-1">
                      <label for="email-address" class="block text-sm font-medium text-gray-700">Start Date</label>
                      <p class="h-10 flex px-3 items-center  rounded bg-gray-300 text-black font-medium">{{props.job.startDate}}</p>
                    </div>

                    <div class="col-span-3 sm:col-span-1">
                      <label for="phone-number" class="block text-sm font-medium text-gray-700">End Date</label>
                      <p class="h-10 flex px-3 items-center rounded bg-gray-300 text-black font-medium">{{props.job.endDate}}</p>
                    </div>

                    <div class="col-span-6 sm:col-span-6">
                      <label for="country" class="block text-sm font-medium text-gray-700">Summary</label>
                      <p class="h-fit p-3 flex px-3 items-center bg-gray-300 rounded text-black font-medium">{{props.job.summary}}</p>
                    </div>

                    <div class="col-span-6">
                      <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
                      <p :class="`h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium ${editableAddress ? 'hidden': ''}`">{{props.job.streetAddress}}</p>
                      <input @input="changeAddress" :value="props.job.streetAddress" name="streetAddress" :class="`input input-bordered w-full ${!editableAddress ? 'hidden': ''}`" type="text">
                    </div>

                    <div class="col-span-3">
                      <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                      <p :class="`h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium ${editableAddress ? 'hidden': ''}`">{{props.job.town}}</p>
                      <input :class="`input input-bordered w-full ${!editableAddress ? 'hidden': ''}`" name="town" type="text">
                    </div>

                    <div class="col-span-3">
                      <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                      <p :class="`h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium ${editableAddress ? 'hidden': ''}`">{{props.job.parish}}</p>
                      <input :class="`input input-bordered w-full ${!editableAddress ? 'hidden': ''}`" name="parish" type="text">
                      <div :class="`flex justify-end ${!isCustomer ? 'hidden': ''}`">
                          <button @click="editableAddress = !editableAddress " class="btn btn-sm my-2">{{editableAddress ? "Disable": "Edit Address" }}</button>
                      </div>
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                      <label for="full-name" class="block text-sm font-medium text-gray-700">Vehicle</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">{{props.job.vehicle?.year}} {{props.job.vehicle?.make}} {{props.job.vehicle?.model}}</p>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label for="email-address" class="block text-sm font-medium text-gray-700">Assigned Mechanic</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">{{props.job.assignedMechanic ? `${props.job.assignedMechanic?.firstName}  ${props.job.assignedMechanic?.lastName}`: "Unassigned"}}</p>
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                      <label for="phone-number" class="block text-sm font-medium text-gray-700">Created By</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">{{props.job.createdBy?.firstName}} {{props.job.createdBy?.lastName}}</p>
                    </div>
                    <div class="overflow-x-auto col-span-6 sm:col-span-3">
                    <table class="table w-full">
                      <!-- <label for="parts" class="block text-sm font-medium text-gray-700">Parts</label> -->
                      <thead >
                        <tr>
                          <th class="bg-gray-300">Name</th>
                          <th class="bg-gray-300">Price</th>
                        </tr>
                      </thead>
                      <tbody class="">
                        <!-- row 1 -->
                        <tr v-for="part in props.job.requiredParts" :key="part.id">
                          <td>{{part.name}}</td>
                          <td>${{part.price}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-span-6 sm:col-span-3 flex flex-col justify-between gap-2">
                      <label for="phone-number" class="block text-sm font-medium text-gray-700">Service Fee</label>
                      <p class="h-10 flex px-3 items-center border border-success bg-gray-300 rounded text-black font-medium">${{props.job.serviceFee}}</p>
                      <label for="phone-number" class="block text-sm font-medium text-gray-700">Total Cost</label>
                      <p class="h-10 flex px-3 items-center border border-success bg-gray-300 rounded text-black font-medium">${{props.job.totalCost}}</p>
                      <p :class="`h-10 px-3 m-3 flex rounded-lg self-center items-center max-w-fit ${true ? 'bg-success':'bg-error'}`">Payment {{props.job.isPaid ?  'made' : 'not made'}}</p>
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
        
    }
</script>