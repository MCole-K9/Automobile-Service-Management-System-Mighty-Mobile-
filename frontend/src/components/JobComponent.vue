<script setup lang="ts">
  import  type { Job } from '../classlib/Types';

  const props = defineProps<{
      job: Job,
  }>();
</script>

<template>
  <div class="card flex-none bg-ourYellow shadow-xl w-full relative rounded">
  <div class="card-body p-5">
    <h2 class="card-title">Job #: {{props.job.jobNumber}}</h2>
    <p class="flex justify-between"><span class="text-md font-semibold">Service Type: </span> {{props.job.serviceType}}</p>
    <p class="flex justify-between"><span class="text-md font-semibold">Customer: </span>  {{props.job.vehicle?.owner?.firstName}} {{props.job.vehicle?.owner?.lastName}}</p>
    <p class="flex justify-between"><span class="text-md font-semibold">Vehicle: </span>{{props.job.vehicle?.year}} {{props.job.vehicle?.make}} {{props.job.vehicle?.model}} </p>
    <div class="card-actions justify-center mt-3">
      <button class="btn btn-sm" @click="$router.push(`/dashboard/viewjob/${props.job.jobNumber}`)">View</button>
    </div>
  </div>
  <span class="badge absolute top-4 right-4 px-4 bg-ourRed" v-if="!props.job.completed">{{props.job.confirmed? "Confirmed": "Pending"}}</span>
  <span class="badge absolute top-4 right-4 text-black px-4 bg-success" v-else-if="props.job.completed">completed</span>
</div>
</template>



<style>

</style>




<script lang="ts">
    export default {
        name: "JobComponent"
    }
</script>