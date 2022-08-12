<script setup lang="ts">
    import DashboardLayout from '../components/DashboardLayout.vue';
    import {onMounted, ref} from '@vue/runtime-core';
    import Jobs from "../components/Jobs.vue"
    import PendingJobs from "../components/PendingJobs.vue"
    import ConfirmedJobs from "../components/ConfirmedJobs.vue"
    import type {Job} from "../classlib/Types";
    import BackendService from '../../BackendService';
    import {currentUserStore} from "@/stores/User";

    const currentUser = currentUserStore();

    let activeTab = ref("Jobs");

    let jobs = ref<Job[]>([]);

    function changeActiveTab(tab: string){

        activeTab.value = tab;
    }

    

    onMounted(async ()=>{

    
        const res = await BackendService.getUpcomingJobs();
        
        jobs.value = [...jobs.value, ...res?.data]
        jobs.value = jobs.value.filter(e => e.completed == false)

        console.log(res?.data)
    })


</script>

<template>
<DashboardLayout>
    <template #content>
        <p class="text-xl lg:text-3xl font-bold text-center pb-5">Job Board</p>
        <div class="flex justify-center">
            <div class="btn-group">
                <button @click="changeActiveTab('Jobs')" :class="['btn','btn-sm' , 'px-10', 'bg-ourYellow', activeTab == 'Jobs' ? 'btn-active': '']">All</button> <!--btn-active-->  
                <button @click="changeActiveTab('PendingJobs')" :class="['btn','btn-sm' , 'bg-ourYellow', activeTab == 'PendingJobs' ? 'btn-active': '']">Pending </button>
                <button @click="changeActiveTab('ConfirmedJobs')" :class="['btn','btn-sm' , 'bg-ourYellow', activeTab == 'ConfirmedJobs' ? 'btn-active': '']">Confirmed</button>
            </div>
        </div>
        <section id="Jobs"  class="mt-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <component  :jobs="jobs" :is="activeTab"/>
            </div>  
        </section>
        <router-link v-if="currentUser.isManager || currentUser.isMechanic" to="/dashboard/createjob" class="btn bg-ourYellow flex items-center rounded-lg w-fit h-12 fixed bottom-4 right-4">
            Add Job
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </router-link>
    </template>
</DashboardLayout>
  
</template>



<style>

</style>

<script lang="ts">
    export default {
        name: "JobBoardView",
        components: {
            DashboardLayout,
            Jobs, 
            PendingJobs,
            ConfirmedJobs
        }
    }
</script>