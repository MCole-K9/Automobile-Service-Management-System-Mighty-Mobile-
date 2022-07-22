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