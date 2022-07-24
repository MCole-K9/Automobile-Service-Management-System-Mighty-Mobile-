<template>
    <span>
        <DashboardLayout>
            <template #content>
                    <p class="text-4xl font-bold text-center my-5">Work history</p>
                    <div class="flex justify-start gap-5 overflow-y-auto">
                        
                        <CompletedJob :job="job" v-for="job in upcomingJobs" :key="job.jobNumber"/>
                    </div>
                </template>
        </DashboardLayout>
    </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BackendService from '../../BackendService'
import DashboardLayout from "../components/DashboardLayout.vue"
import CompletedJob from '../components/CompletedJob.vue'
import type { AxiosResponse } from 'axios'
import type {Job} from "../classlib/Types";

export default defineComponent({
  components:{
    DashboardLayout,
    CompletedJob,
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