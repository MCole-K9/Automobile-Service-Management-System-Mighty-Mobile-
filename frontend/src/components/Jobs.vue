<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import type {Job} from "../classlib/Types";
  import JobComponent from "../components/JobComponent.vue"

  const props = defineProps<{
        jobs: Job[],
    }>();


</script>

<template>

    <JobComponent  v-for="job in props.jobs" :key="job.jobNumber" :job="job"/>

    <div class="sm:col-span-2 md:col-span-3 text-center">
        <p class="text-lg font-medium text-center my-5 w-1/1 opacity-75" v-if="jobs.length == 0">Nothing Yet. Add Job to Get Started</p>
    </div>

</template>



<style>

</style>

<script lang="ts">
    export default {
        name: "Jobs",
        components: {
          JobComponent
        }
    }
</script>