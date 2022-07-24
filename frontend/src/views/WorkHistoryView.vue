<template>
    <span>
        <DashboardLayout>
            <template #content>
                    <p class="text-4xl font-bold text-center my-5">Work history</p>
                    <div class="flex justify-start gap-5 overflow-y-auto">
                        <!-- <div class="card sm-600:card-side h-fit bg-gray-200 rounded mx-5" v-for="i in 8" :key="i">
                        <div class="card-body p-5 flex-row justify-between">
                            <span class="flex flex-col justify-between">
                                <p class="font-medium">Mechanic :
                                     John Doe 
                                     </p>
                                <p class="font-medium">Date: 
                                    19/7/2022 
                                    </p>
                                <p class="font-medium">Vehicle: 
                                    Honda Civic 
                                    </p>
                                <p class="font-bold">Job No. #12345 </p>
                            </span>
                            <span class="flex flex-col justify-end">
                                 <button class="btn btn-sm" @click="$router.push('/viewjob')">
                                    view
                                </button>
                            </span>
                        </div>
                        </div> -->
                        <Jobs :jobs="upcomingJobs"/>
                    </div>
                </template>
        </DashboardLayout>
    </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BackendService from '../../BackendService'
import DashboardLayout from "../components/DashboardLayout.vue"
import Jobs from "../components/Jobs.vue"
import type { AxiosResponse } from 'axios'
import type {Job} from "../classlib/Types";

export default defineComponent({
  components:{
    DashboardLayout,
    Jobs
  },
  // type inference enabled
  props: {
  },
  data(){
    return{
      upcomingJobs : <Job[]>([])
    }
  },
  async mounted() {
    const res = await BackendService.getUpcomingJobs()
    this.upcomingJobs = res?.data
  },
  methods:{
  }
})

</script>

<style scoped>
.max-h-grid{
    max-height: 60vh;
}
</style>