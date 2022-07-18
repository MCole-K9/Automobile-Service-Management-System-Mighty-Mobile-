<!-- <script setup lang="ts">
import NavBar from "../components/NavBar.vue";

</script>

<template>
  <main>
      <NavBar />
      <p class="text-4xl text-left mx-5 text-black font-bold my-10">Dashboard</p>
      <div class="flex lg:flex-row flex-col w-full px-5 h-fit gap-5 lg:justify-between">

        <div class="bg-gray-200 rounded grow h-96 relative">
            <div class="rounded bg-indigo-500 w-1/1 h-16 flex justify-center items-center">
                <p class="text-2xl font bold text-gray-200">Requests For Appointment </p>
            </div>
        </div>

      <div class="bg-gray-200 rounded grow h-96 relative">
        <div class="rounded bg-rose-500 w-1/1 h-16 flex justify-center items-center">
            <p class="text-2xl font bold text-gray-200">Vehicles</p>
        </div>
      </div>

      </div>
      <div class="h-96 w-1/1 bg-gray-200 m-5 rounded">
        <div class="rounded bg-green-500 w-1/1 h-16 flex justify-center items-center">
            <p class="text-2xl font bold text-gray-200">Ongoing Repairs</p>
        </div>
      </div>
  </main>
</template> -->
<script lang="ts">
    import {defineComponent} from '@vue/runtime-core';
    import DashboardLayout from '../components/DashboardLayout.vue';

    defineComponent({
        name: "DashboardView",
        components: {
            DashboardLayout
        }
    })
</script>

<template>

    <DashboardLayout>
        <template #content>
             <h1 class="text-black">Testing</h1>
        </template>
    </DashboardLayout>
</template>


<style>

</style>
