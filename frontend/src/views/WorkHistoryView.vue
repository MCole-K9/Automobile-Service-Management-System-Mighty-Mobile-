<template>
    <span>
        <DashboardLayout>
            <template #content>
                    <p class="text-4xl font-bold text-center my-5">Work history</p>
                    <div class="flex flex-col justify-start md:grid md:grid-cols-3  gap-5 overflow-y-auto">
                        <JobComponent :completed="true" :job="job" v-for="job in upcomingJobs" :key="job.jobNumber"/>
                    </div>
                </template>
        </DashboardLayout>
    </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BackendService from '../../BackendService'
import DashboardLayout from "../components/DashboardLayout.vue"
import JobComponent from '../components/JobComponent.vue'
import type {Job} from "../classlib/Types";


export default defineComponent({
  components:{
    DashboardLayout,
    JobComponent,
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
    const res = await BackendService.getAllJobs()
    this.upcomingJobs = res?.data
    console.log(res?.data);
    
    this.upcomingJobs = this.upcomingJobs.filter(e => e.completed == true)
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