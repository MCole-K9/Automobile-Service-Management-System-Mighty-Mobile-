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
            <button class="btn btn-sm">work history</button>
            <button class="btn btn-sm btn-error">delete</button>
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
export default defineComponent({
    name:'UserVehiclesVeiw.vue',
    components:{
        DashboardLayout,
    },
    data(){
        return{
            userVehicles : <Vehicle[]>({})
        }
    },
    async created(){
        let res = await BackendService.getUserVehicles(2)
        console.log(res?.data);
        this.userVehicles = res?.data;
    }
})
</script>