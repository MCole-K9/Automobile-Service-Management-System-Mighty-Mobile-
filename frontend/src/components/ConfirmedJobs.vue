<script setup lang="ts">
import { computed } from "vue";
import type {Job} from "../classlib/Types";
import JobComponent from "../components/JobComponent.vue"

const props = defineProps<{
      jobs: Job[],
  }>();

const confirmedJobs = computed(()=>{
  return props.jobs.filter((job)=>{
    return job.confirmed
  })
})
</script>
<template>
    <JobComponent  v-for="job in confirmedJobs" :key="job.jobNumber" :job="job"/>
</template>



<style>

</style>

<script lang="ts">
    export default {
        name: "ConfirmedJobs"
    }
</script>