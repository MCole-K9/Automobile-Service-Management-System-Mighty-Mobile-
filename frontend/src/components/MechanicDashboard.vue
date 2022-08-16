<template>
    <div class="px-5">
            <span>
                <div class="h-96 w-1/1 bg-ourYellow shadow rounded-lg p-5">
                    <span class="flex justify-between font-bold text-2xl py-3">
                        <label class="">Current Jobs</label>
                        <p>34</p>
                    </span>
                    <span class="flex justify-between font-bold text-2xl py-3">
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
            test : <any>({})
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