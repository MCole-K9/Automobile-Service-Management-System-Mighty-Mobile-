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
</template>

<style>

</style>

<script lang="ts">
    export default {
        name: "PendingJobs"
    }
</script>