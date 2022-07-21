<script setup lang="ts">
  import  type { Job } from '../classlib/Types';

  const props = defineProps<{
      job: Job,
  }>();

</script>

<template>
  <div class="card  bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{{props.job.jobNumber}}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
      <button class="btn btn-sm btn-primary">View</button>
    </div>
  </div>
</div>
</template>



<style>

</style>




<script lang="ts">
    export default {
        name: "JobComponent"
    }
</script>