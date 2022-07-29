<template>
    <div class="px-5">
        <span class="flex justify-between my-5">
                <p class="text-gray-800 text-xl sm:text-2xl lg:text-4xl font-bold">Dashboard</p>
                <button class="btn btn-sm lg:btn-md" @click="$router.push('dashboard/vehicles')">view vehicles</button>
            </span>
        <div class="flex lg:flex-row flex-col w-full  h-fit gap-5 lg:justify-between">
            <div class="bg-gray-200 rounded grow h-96 relative overflow-y-scroll">
                <div class="rounded bg-gray-800 w-1/1 h-16 flex sticky top-0 justify-center items-center">
                    <p class="text-xl lg:text-2xl font bold text-white">Requests For Appointment </p>
                </div>
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
                        <Request v-for="app in UserAppointments" :appointment="app"/>
                    </tbody>

                </table>
            </div>
            </div>

        <div class="bg-gray-200 rounded grow h-96 relative overflow-y-scroll">
            <div class="rounded bg-gray-800 w-1/1 h-16 flex sticky top-0  justify-center items-center mb-3">
                <p class="text-xl lg:text-2xl font bold text-white">Ongoing Repairs/Maintenance</p>
            </div>
            <div class="bg-green-500 min-w-max h-20 rounded mb-3 w-1/1 mx-3" v-for="i in 5">

                </div>
        </div>

        </div>
    </div>
</template>
<script lang="ts">
import BackendService from "../../BackendService"
import { defineComponent } from "vue"
import Request from "./Request.vue"
import type { Appointment } from '../classlib/Types';
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
        this.UserAppointments = res?.data
    }
})
</script>