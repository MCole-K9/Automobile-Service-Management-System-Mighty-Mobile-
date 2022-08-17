<template>
    <div class="px-5">
            <span>
                <div class="h-fit min-h- w-1/1 bg-ourYellow shadow rounded-lg p-2 gap-y-3 flex flex-col justify-start">
                    <span class="flex flex-col font-bold text-2xl bg-white border border-slate-800 rounded">
                        <span class="flex justify-between p-3">
                            <label class="">Current Jobs</label>
                            <button class="btn btn-sm" @click="currentJobsToggle = !currentJobsToggle">
                                {{ currentJobsToggle ? 'hide' : 'show' }}
                                <svg v-if="!currentJobsToggle" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 17l-4 4m0 0l-4-4m4 4V3"></path></svg>
                                <svg v-if="currentJobsToggle" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l4-4m0 0l4 4m-4-4v18"></path></svg>
                            </button>
                        </span>
                        <div class="w-1/1 h-64 p-2" v-if="currentJobsToggle">
                            <div class="bg-ourYellow rounded w-1/1 h-fit flex items-start relative flex-col p-3" v-for="job,index in upcomingJobs" :key="index">
                                <div class="font-bold text-base">{{job.serviceType}} for {{job.vehicle?.make}} {{job.vehicle?.model}} {{job.vehicle?.year}}</div>
                                <div class="text-sm opacity-50">Customer: {{job.vehicle?.owner?.firstName}} {{job.vehicle?.owner?.lastName}}</div>
                                <span class="badge rounded p-2 font-thin absolute top-0 right-0">End Date: {{job.endDate}}</span>
                            </div>
                            <p class="text-center font-medium"  v-if="upcomingJobs.length == 0" >No Current Jobs Yet</p>
                        </div>
                    </span>
                    <span class="flex justify-between font-bold text-2xl p-3 border border-slate-800 bg-white rounded">
                        <label for="">Job History</label>
                        <label for="jobHistoryModal" class="btn modal-button btn-sm">view</label>
                    </span>
                </div>
            </span>
            <!-- The button to open modal -->
            

            <!-- Put this part before </body> tag -->
            <input type="checkbox" id="jobHistoryModal" class=" modal-toggle" />
            <div class="modal ml-60">
            <div class="modal-box relative">
                <label for="jobHistoryModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 class="text-lg font-bold mb-5">Jobs you've completed</h3>
                <div class="bg-ourYellow rounded w-1/1 h-fit flex items-start relative flex-col p-3" v-for="job,index in completedJobs" :key="index">
                        <div class="font-bold text-base">{{job.serviceType}} for {{job.vehicle?.make}} {{job.vehicle?.model}} {{job.vehicle?.year}}</div>
                        <div class="text-sm opacity-50">Customer: {{job.vehicle?.owner?.firstName}} {{job.vehicle?.owner?.lastName}}</div>
                    <span class="badge rounded p-2 font-thin absolute top-0 right-0">End Date: {{job.endDate}}</span>
                </div>
                <p class="text-center font-medium"  v-if="upcomingJobs.length == 0" >No Completed Jobs Yet</p>
            </div>
            </div>
    </div>
</template>
<script lang="ts">
import BackendService from "../../BackendService"
import { defineComponent } from "vue"
import Request from "./Request.vue"
import type { Appointment, Job } from '../classlib/Types';
import { currentUserStore } from "@/stores/User";
// import { Form }

const currentUser = currentUserStore();

export default defineComponent({
    name:'UserDashboard',
    components:{
        Request,
    },
    data(){
        return{
            UserAppointments : <Appointment[]>([]),
            test : <any>({}),
            currentJobsToggle : false,
            upcomingJobs : <Job[]>([]),
            completedJobs : <Job[]>([]),
        }
    },
    async created(){
        let res = await BackendService.getAppointments()
        let _res = await BackendService.getUpcomingJobs()
        let __res = await BackendService.getAllJobs()
        this.completedJobs = __res?.data
        this.completedJobs = this.completedJobs.filter(e => e.completed && e.assignedMechanicId == currentUser.User.id)
        this.upcomingJobs = _res?.data
        this.upcomingJobs = this.upcomingJobs.filter(e => e.assignedMechanicId == currentUser.User.id)
        // console.log(res?.data);
        this.UserAppointments = res?.data
        this.UserAppointments = this.UserAppointments.filter(e => e.customerId == currentUser.User.id)
    }
})
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $log(anything:any) : void
  }
}
</script>