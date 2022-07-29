<template>
<DashboardLayout>
<template #content>
<div class="lg:px-24 p-3 lg:py-10">
<span class="flex justify-between">
    <p class="text-gray-800 text-xl sm:text-2xl lg:text-4xl font-bold">Vehicles</p>
    <button class="btn btn-sm lg:btn-md">add a Vehicle</button>
    
</span>
    <div class="rounded bg-gray-200 w-1/1 my-5 p-5 flex flex-col justify-start gap-y-5 overflow-y-scroll" style="height: 40rem">
        <div class="w-1/1 flex-none h-fit bg-ourBlue rounded min-w-max flex flex-col sm:flex-row p-3 justify-between" v-for="vehicle in userVehicles">
        <div class="w-48 h-44 bg-white self-center">
            <img src="" alt="">
        </div>
        <div class="sm:grow m-5 text-center sm:text-left">
            <p class="text-xl sm:text-2xl font-semibold">{{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}}</p>
            <p class="sm:text-xl">ID# {{vehicle.id}}</p>
            <p class="sm:text-xl">Liscense plate #: {{vehicle.licensePlate}}</p>
        </div>
        <div class="flex flex-row sm:flex-col gap-x-3 justify-evenly">
            <button class="btn btn-sm">view/edit</button>
            <label for="my-modal-3" class="btn btn-sm modal-button">work history</label>
            <button class="btn btn-sm btn-error">delete</button>
        </div>
        </div>
    </div>
    <!-- The button to open modal -->
    

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
    <div class="modal">
    <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div class="overflow-x-auto w-full">
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
            </div>
    </div>
    </div>
</div>

</template>
</DashboardLayout>
</template>
<script lang="ts">
import DashboardLayout from "../components/DashboardLayout.vue";
import BackendService from '../../BackendService'
import { defineComponent } from "vue";
import type { Vehicle } from "@/classlib/Types";
import type { Job } from "@/classlib/Types";
export default defineComponent({
    name:'UserVehiclesVeiw.vue',
    components:{
        DashboardLayout,
    },
    data(){
        return{
            userVehicles : <Vehicle[]>({}),
            jobsDoneOnVehicle : <Job[]>({})
        }
    },
    async created(){
        let res = await BackendService.getUserVehicles(2)
        console.log(res?.data);
        this.userVehicles = res?.data;
    },
    methods:{
        async getJobsDoneOnVehicle(vehicleId:number){
            let res = await BackendService.getUpcomingJobs()
            // res?.data
        }
    }
})
</script>