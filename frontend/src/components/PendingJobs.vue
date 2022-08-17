<script setup lang="ts">
import { computed } from "@vue/reactivity";
import type {Job} from "../classlib/Types";
import JobComponent from "../components/JobComponent.vue"


const props = defineProps<{
      jobs: Job[],
  }>();

const pendingJobs = computed(()=>{
  return props.jobs.filter((job)=>{
    return !job.confirmed
  })
})

    
</script>
<template>
    <JobComponent  v-for="job in pendingJobs" :key="job.jobNumber" :job="job"/>
    <div class="sm:col-span-2 md:col-span-3 text-center">
        <p class="text-lg font-medium text-center my-5 w-1/1 opacity-75" v-if="pendingJobs.length == 0">There Are No Jobs Awaiting Customer Acceptance</p>

    </div>
</template>

<style>

</style>

<script lang="ts">
    export default {
        name: "PendingJobs"
    }
</script>