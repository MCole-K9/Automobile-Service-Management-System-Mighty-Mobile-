<template>
        <DashboardLayout>
            <template #content>
                <JobInformation :job="job" :completed="false"/>
            </template>
        </DashboardLayout>
</template>
<script lang="ts">
import JobInformation from "../components/JobInformation.vue"
import DashboardLayout from "../components/DashboardLayout.vue";
import BackendService from "../../BackendService";
import { defineComponent } from "vue";
import type { Job } from "@/classlib/Types";

    export default defineComponent({
        name:'JobDetailsView',
        components:{
            JobInformation,
            DashboardLayout
        },
        data(){
            return {
                g : {},//just to get rid of props error
                jobNumber: 0,
                job:  <Job>({})
            }
        },
        
        async mounted(){
            this.jobNumber = Number.parseInt(this.$route.params.id as string) 
            const res = await BackendService.getJob(this.jobNumber)
            this.job = {...res?.data}

        
        }
        
        
    })
</script>