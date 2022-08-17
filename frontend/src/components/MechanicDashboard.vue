<template>
    <div class="px-5">
            <span>
                <div class="h-fit min-h- w-1/1 bg-ourYellow shadow rounded-lg p-2 gap-y-3 flex flex-col justify-start">
                    <span class="flex flex-col font-bold text-2xl p-3 bg-yellow-600 rounded">
                        <span class="flex justify-between">
                            <label class="">Current Jobs</label>
                            <button class="btn btn-sm" @click="currentJobsToggle = !currentJobsToggle">
                                {{ currentJobsToggle ? 'hide' : 'show' }}
                                <svg v-if="!currentJobsToggle" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 17l-4 4m0 0l-4-4m4 4V3"></path></svg>
                                <svg v-if="currentJobsToggle" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l4-4m0 0l4 4m-4-4v18"></path></svg>
                            </button>
                        </span>
                        <div class="w-1/1 bg-white h-64 mt-3" v-if="currentJobsToggle"> </div>
                    </span>
                    <span class="flex justify-between font-bold text-2xl p-3 bg-yellow-600  rounded">
                        <label for="">Job History</label>
                        <button class="btn btn-sm">view</button>
                    </span>
                </div>
            </span>
    </div>
</template>
<script lang="ts">
import BackendService from "../../BackendService"
import { defineComponent } from "vue"
import Request from "./Request.vue"
import type { Appointment } from '../classlib/Types';
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
        }
    },
    async created(){
        let res = await BackendService.getAppointments()
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