<script setup lang="ts">
import  type { Job } from '../classlib/Types';

const props = defineProps<{
    job: Job,
}>();
</script>

<template>
        <div class="mx-24 my-10">
          <div class="md:col-span-2">
            <p class="text-4xl text-center font-bold">Job Information</p>
              <div class="shadow-xl overflow-hidden rounded-lg">
                <div :class="`px-4 py-5 bg-white sm:p-6`">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-2">
                      <label for="full-name" class="block text-sm font-medium text-gray-700">Job No.</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">123456</p>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label for="email-address" class="block text-sm font-medium text-gray-700">Start Date</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">123456</p>
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                      <label for="phone-number" class="block text-sm font-medium text-gray-700">End Date</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">123456</p>
                    </div>

                    <div class="col-span-6 sm:col-span-6">
                      <label for="country" class="block text-sm font-medium text-gray-700">Summary</label>
                      <p class="h-fit p-3 flex px-3 items-center bg-gray-300 rounded text-black font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, ipsam ex voluptatem voluptas quae sequi corporis pariatur excepturi iste minus, nam temporibus vero aperiam commodi. Doloribus consequatur quis iure ipsa! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure natus cum at obcaecati deleniti corrupti consectetur? Nostrum voluptates amet quod iusto doloribus voluptas dolores nam, architecto labore eius, consequatur tempore. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint suscipit corrupti consequuntur tempora voluptate quos officiis adipisci quam aut minus. Voluptates, tenetur magnam cupiditate fugiat est asperiores ipsa reprehenderit consectetur!</p>
                    </div>

                    <div class="col-span-6">
                      <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">123456</p>
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                      <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">123456</p>
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                      <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">123456</p>
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                      <label for="full-name" class="block text-sm font-medium text-gray-700">vehicleId</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">123456</p>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                      <label for="email-address" class="block text-sm font-medium text-gray-700">Assigned Mechanic Id</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">123456</p>
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                      <label for="phone-number" class="block text-sm font-medium text-gray-700">Created By User Id</label>
                      <p class="h-10 flex px-3 items-center bg-gray-300 rounded text-black font-medium">123456</p>
                    </div>
                    <div class="overflow-x-auto col-span-6 sm:col-span-3">
                    <table class="table w-full">
                      <label for="parts" class="block text-lg font-medium text-gray-700">Parts</label>
                      <thead>
                        <tr class="text-center">
                          <th>Name</th>
                          <th>Price</th>
                          <th>ID</th>
                        </tr>
                      </thead>
                      <tbody class="text-center">
                        <!-- row 1 -->
                        <tr>
                          <td>Part 1</td>
                          <td>$500</td>
                          <td>12345</td>
                        </tr>
                        <!-- row 2 -->
                        <tr>
                          <td>Part 2</td>
                          <td>$800</td>
                          <td>75472</td>
                        </tr>
                        <!-- row 3 -->
                        <tr>
                          <td>Part 3</td>
                          <td>$400</td>
                          <td>09985</td>
                        </tr>
                      </tbody>
                    </table>
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
        name: "Job"
    }
</script>