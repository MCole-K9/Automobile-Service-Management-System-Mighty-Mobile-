<template>
    <div class="px-5">
        <span class="flex justify-between my-5">
                <p class="text-gray-800 text-xl sm:text-2xl lg:text-4xl font-bold">Dashboard</p>
                <button class="btn btn-sm lg:btn-md" @click="$router.push('dashboard/jobboard')">view job board</button>
            </span>
            
    </div>
</template>
<script lang="ts">
import BackendService from "../../BackendService"
import { defineComponent } from "vue"
import Request from "./Request.vue"
import type { Appointment } from '../classlib/Types';
import { currentUserStore } from "@/stores/User";

const currentUser = currentUserStore();

export default defineComponent({
    name:'UserDashboard',
    components:{
        Request,
    },
    data(){
        return{
            UserAppointments : <Appointment[]>([])
        }
    },
    async created(){
        let res = await BackendService.getAppointments()
        // console.log(res?.data);
        this.UserAppointments = res?.data
        this.UserAppointments = this.UserAppointments.filter(e => e.customerId == currentUser.User.id)
    }
})
</script>