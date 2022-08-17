<template>
    <div class="px-5">
        <div class="flex flex-col sm:flex-row justify-start">
            <div class="stats stats-vertical shadow min-w-fit rounded-lg bg-ourYellow">
            
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
                    <label for="ongoingJobsModal" class="btn modal-button btn-xs">view</label>
                </span>

            </div>
            
            </div>
            <div class="mt-10 sm:ml-10 sm:mt-0 w-full overflow-auto" style="max-height: 25rem;">
                <p class="text-2xl text-center font-medium mb-3 sticky left-0 bg-ourYellow rounded-lg py-3">Outgoing Requests</p>
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
            <!-- Put this part before </body> tag -->
            <input type="checkbox" id="ongoingJobsModal" class="modal-toggle" />
            <div class="modal">
            <div class="modal-box relative">
                <label for="ongoingJobsModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 class="text-3xl font-bold text-center mb-5">Ongoing Jobs</h3>
                <span class="flex flex-col gap-y-3 overflow-y-scroll" style="max-height: 20rem;">
                    <div class="rounded w-1/1 bg-ourYellow p-3 h-fit" v-for="job,index in currentJobs" :key="index">
                        <p>{{job.serviceType}} for {{job.vehicle?.year}} {{job.vehicle?.make}} {{job.vehicle?.model}} being done by {{job.assignedMechanic?.firstName}} {{job.assignedMechanic?.lastName}}</p>
                    </div>
                </span>
            </div>
            </div>
    </div>
</template>
<script lang="ts">
import BackendService from "../../BackendService"
import { defineComponent } from "vue"
import Request from "./Request.vue"
import type { Appointment, JobStage, Job, Vehicle } from '../classlib/Types';
import { currentUserStore } from "@/stores/User";
const currentUser = currentUserStore();

export default defineComponent({
    name:'UserDashboard',
    components:{
        Request,
    },
    data(){
        return{
            UserAppointments : <Appointment[]>([]),
            userVehicles : <Vehicle[]>([]),
            currentJobs : <Job[]>([])
        }
    },
    methods:{
        async getAllVehicles(){
            let res = await BackendService.getUserVehicles(currentUser.User.id)
            console.log(res?.data);
            this.userVehicles = res?.data;
        },
    },
    async created(){
        await this.getAllVehicles()
        let res = await BackendService.getAppointments()

        let alljobs  = await BackendService.getAllJobs()
        let alljobsarray = alljobs?.data as Job[]
        this.currentJobs = alljobsarray.filter(e => e.vehicle?.ownerId == currentUser.User.id && !e.completed)
        this.UserAppointments = res?.data
        this.UserAppointments = this.UserAppointments.filter(e => e.customerId == currentUser.User.id && !e.fulfilled)
    }
})
</script>