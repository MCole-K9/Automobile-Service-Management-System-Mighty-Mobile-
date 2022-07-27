<script setup lang="ts">
import  type { Job } from '../classlib/Types';

const props = defineProps<{
    job: Job,
}>();
</script>

<template>
        <div class="mx-5 xl:mx-24 my-10">
          <div class="md:col-span-2">
            <p class="text-4xl my-10 text-center font-bold">Job Information</p>
              <div class="shadow-xl overflow-hidden rounded-lg">
                <div :class="`px-4 py-5 bg-white border border-gray-800 sm:p-6`">
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
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">{{props.job.streetAddress}}</p>
                    </div>

                    <div class="col-span-3">
                      <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">{{props.job.town}}</p>
                    </div>

                    <div class="col-span-3">
                      <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">{{props.job.parish}}</p>
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                      <label for="full-name" class="block text-sm font-medium text-gray-700">Vehicle</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">{{props.job.vehicle?.year}} {{props.job.vehicle?.make}} {{props.job.vehicle?.model}}</p>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label for="email-address" class="block text-sm font-medium text-gray-700">Assigned Mechanic</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">{{props.job.assignedMechanic?.firstName}} {{props.job.assignedMechanic?.lastName}}</p>
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                      <label for="phone-number" class="block text-sm font-medium text-gray-700">Created By</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">{{props.job.createdBy?.firstName}} {{props.job.createdBy?.lastName}}</p>
                    </div>
                    <div class="overflow-x-auto col-span-6 sm:col-span-3">
                    <table class="table w-full">
                      <label for="parts" class="block text-sm font-medium text-gray-700">Parts</label>
                      <thead >
                        <tr class="text-center ">
                          <th class="bg-gray-300">Name</th>
                          <th class="bg-gray-300">Price</th>
                        </tr>
                      </thead>
                      <tbody class="text-center">
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