<template>
    <div class="px-5">
        <span class="flex justify-between my-5">
                <p class="text-gray-800 text-xl sm:text-2xl lg:text-4xl font-bold">User Dashboard</p>
                <button class="btn btn-sm lg:btn-md" @click="$router.push('dashboard/vehicles')">view vehicles</button>
            </span>
        <div class="flex flex-col sm:flex-row justify-start">
            <div class="stats stats-vertical shadow min-w-fit bg-ourYellow">
            
            <div class="stat">
                <div class="font-medium stat-title">Vehicle(s)</div>
                <div class="stat-value">2</div>
                <!-- <div class="stat-desc">Jan 1st - Feb 1st</div> -->
            </div>
            
            <div class="stat">
                <div class="font-medium  stat-title">Date Joined</div>
                <div class="stat-value">11/8/2022</div>
                <!-- <div class="stat-desc">↗︎ 400 (22%)</div> -->
            </div>
            
            <div class="stat">
                <div class="font-medium stat-title">Current Repairs/Maintenance</div>
                <span class="flex justify-between items-center">
                    <div class="stat-value">1</div>
                    <button class="btn btn-xs">view</button>
                </span>

            </div>
            
            </div>
            <div class="mt-10 sm:ml-10 sm:mt-0 w-full overflow-x-auto">
                <p class="text-2xl text-center font-medium mb-3 sticky left-3">Outgoing Requests</p>
                <table class="table w-full">
                <!-- head -->
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>For</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                <!-- row 1 -->
                <Request :appointment="app" v-for="(app,index) in UserAppointments" :key="index"/>
                </tbody>
                </table>
            </div>
            
        </div>
            
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
        this.UserAppointments = this.UserAppointments.filter(e => e.customerId == currentUser.User.id && !e.fulfilled)
    }
})
</script>