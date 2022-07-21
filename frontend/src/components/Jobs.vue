<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import type {Job} from "../classlib/Types";
  import JobComponent from "../components/JobComponent.vue"


  let jobs = ref<Job[]>();
  
  onMounted(()=>{
  // Get and Populate Jobs4
  }) 
</script>

<template>

<div v-for="job in jobs" :key="job.jobNumber" >
  <JobComponent  :job="job"/>
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