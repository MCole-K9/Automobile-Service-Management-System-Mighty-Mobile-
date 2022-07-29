<template>
        <DashboardLayout>
            <template #content>
                <section class="flex justify-center space-x-3">
                    <button @click="acceptJob" :class="`btn btn-sm ${isCustomer  && !job.confirmed? '' : 'hidden' } `">Accept Request</button>
                </section>
                <JobInformation @address-change="handleAddressChange" :job="job"/>
                
            </template>
        </DashboardLayout>
</template>
<script lang="ts">
    import JobInformation from "../components/JobInformation.vue"
    import DashboardLayout from "../components/DashboardLayout.vue";
    import BackendService from "../../BackendService";
    import { defineComponent } from "vue";
    import type { Job } from "@/classlib/Types";
    import  { UserRole } from "@/classlib/Types";
    import { currentUserStore } from "@/stores/User";

    const currentUser = currentUserStore();

    export default defineComponent({
        name:'JobDetailsView',
        components:{
            JobInformation,
            DashboardLayout
        },
        data(){
            return {
                jobNumber: 0,
                job:  <Job>({}),
                isCustomer: currentUser.hasRole(UserRole.Customer)

            }
        },
        methods: {
            handleAddressChange(attrName:string, value:string){
                this.job = {...this.job, [attrName]: value}
            },
            async acceptJob(){
                this.job.confirmed =  true;
                const res = await BackendService.updateJob(this.job);
                this.job = res?.data;
                console.log(res)
            }
        },
        
        async mounted(){
            this.jobNumber = Number.parseInt(this.$route.params.id as string) 
            const res = await BackendService.getJob(this.jobNumber)
            this.job = {...res?.data}
        }
        
        
    })
</script>