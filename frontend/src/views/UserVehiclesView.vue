<template>
<DashboardLayout>
<template #content>
<div class="lg:px-12 p-3 lg:py-10">
<span class="flex justify-between">
    <p class="text-gray-800 text-xl sm:text-2xl lg:text-4xl font-bold">Vehicles</p>
    <label for="addVehicleModal" class="btn btn-sm lg:btn-md modal-button" @click="vehicleObject = emptyVehicleObject; add = true">add a Vehicle</label>

</span>
    <div class="grid grid-cols-1 xl:grid-cols-2 grid-flow-row gap-5 my-10">
        <div class="bg-ourYellow rounded flex flex-col justify-start items-center md:grid lg:grid xl:flex 2xl:grid grid-rows-3 grid-cols-4 gap-4 h-fit p-4 min-w-96" v-for="vehicle in userVehicles">
        <div class="row-span-3 bg-white aspect-square h-36 col-span-1">
            <img src="" alt="">
        </div>
        <div class="row-span-2 col-span-3 text-center sm:text-left px-3">
            <p class="font-semibold">{{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}}</p>
            <!-- <p class="">ID# {{vehicle.id}}</p> -->
            <p class="">License plate #: {{vehicle.licensePlate}}</p>
        </div>
        <div class="row-span-2 col-span-3 flex justify-start px-3 gap-x-2">
            <label for="vehicleWorkHistory" class="btn btn-sm modal-button flex gap-x-2" @click="getJobsDoneOnVehicle(vehicle.id)">
                <span class="hidden sm-600:block">work history</span>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            </label>
            <label for="addVehicleModal"  class="btn btn-sm flex gap-x-2" @click="vehicleObject = vehicle; add = false">
               <span class="hidden sm-600:block">edit</span>
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </label>
            <button class="btn btn-sm btn-error flex gap-x-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        </div>
        </div>
    </div>
    

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="vehicleWorkHistory" class="modal-toggle" />
    <div class="modal lg:pl-60 modal-bottom sm:modal-middle">
    <div class="modal-box relative sm:w-11/12 sm:max-w-5xl" style="max-height: 30rem;">
        <label for="vehicleWorkHistory" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h3 class="font-bold text-xl text-center">Work History</h3>
        <div class="overflow-x-auto w-full pt-8">
                <table class="table w-full">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox" />
                                </label>
                            </th>
                            <th>From</th>
                            <th>For</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <Request v-for="job in jobsDoneOnVehicle" :job="job" :key="job.jobNumber"/>
                    </tbody>
                </table>
                <loadingAnimation v-if="loading" />
                <p class="text-lg font-medium text-center my-5 w-1/1 opacity-75" v-if="jobsDoneOnVehicle.length == 0 &&!loading">No Jobs Yet</p>
            </div>
    </div>
    </div>
    <input type="checkbox" id="addVehicleModal" class="modal-toggle" />
    <div class="modal lg:pl-60 modal-bottom sm:modal-middle">
    <div class="modal-box relative rounded sm:rounded-box sm:w-11/12 sm:max-w-5xl">
        <label for="addVehicleModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h3 class="font-bold text-xl text-center my-5">Add new vehicle</h3>
         <AddVehicleComponent :vehicle="vehicleObject"/>
        <div class="modal-action ">
         <button class="btn" v-if="add">Add Vehicle</button>
         <button class="btn" v-else @click="$log(userVehicles)">Save Vehicle</button>
        </div>
    </div>
    </div>
</div>

</template>
</DashboardLayout>
</template>
<script lang="ts">
import DashboardLayout from "../components/DashboardLayout.vue";
import loadingAnimation from "@/components/loadingAnimation.vue";
import BackendService from '../../BackendService'
import Request from "@/components/Request.vue";
import AddVehicleComponent from "@/components/AddVehicleComponent.vue";
import { defineComponent } from "vue";
import type { Vehicle } from "@/classlib/Types";
import type { Job } from "@/classlib/Types";
import { currentUserStore } from "@/stores/User";

const currentUser = currentUserStore();

export default defineComponent({
    name:'UserVehiclesView.vue',
    components:{
        DashboardLayout,
        Request,
        AddVehicleComponent,
        loadingAnimation,
    },
    data(){
        return{
            userVehicles : <Vehicle[]>({}),
            allJobs: <Job[]>([]),
            jobsDoneOnVehicle : <Job[]>([]),
            loading : false,
            emptyVehicleObject : <Vehicle>({}),
            add : false,
            vehicleObject : <Vehicle>({})
        }
    },
    async created(){
        let res = await BackendService.getUserVehicles(currentUser.User.id)
        console.log(res?.data);
        this.userVehicles = res?.data;
    },
    methods:{
        async getJobsDoneOnVehicle(vehicleId:number|undefined){
            this.loading = true
            this.jobsDoneOnVehicle = []
            let res = await BackendService.getUpcomingJobs()
            this.allJobs = res?.data
            this.allJobs.forEach((e)=>{
                if(e.vehicleId == vehicleId){
                    this.jobsDoneOnVehicle.push(e)
                    console.log(e);
                }
            })
            this.loading = false
        }
    }
})
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $log(anything:any) : void
  }
}
</script>