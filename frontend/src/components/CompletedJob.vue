<script setup lang="ts">
  import  type { Job } from '../classlib/Types';

  const props = defineProps<{
      job: Job,
  }>();

</script>

<template>
<div class="card sm-600:card-side h-fit bg-gray-200 rounded mx-5 w-fit">
                        <div class="card-body p-10 flex justify-start gap-x-5">
                            <span class="flex justify-between">
                                <p class="font-medium m-2">Mechanic :
                                     John Doe 
                                     </p>
                                <p class="font-medium m-2">Date: 
                                    19/7/2022 
                                    </p>
                                <p class="font-medium m-2">Vehicle: 
                                    Honda Civic 
                                    </p>
                                <p class="font-bold m-2">Job No. #12345 </p>
                            </span>
                            <span class="flex flex-row justify-between items-center">
                                <label class="badge-success badge">completed</label>
                                <button class="btn btn-sm" @click="$router.push('/dashboard/viewjob')">
                                    view
                                </button>
                            </span>
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