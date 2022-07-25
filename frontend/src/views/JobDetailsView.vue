<template>
        <DashboardLayout>
            <template #content>
                <Job :job="g"/>
            </template>
        </DashboardLayout>
</template>
<script lang="ts">
import Job from "../components/JobInformation.vue"
import DashboardLayout from "../components/DashboardLayout.vue";
    export default{
        name:'JobDetailsView',
        components:{
            Job,
            DashboardLayout
        },
        data(){
            return{
                g : {}//just to get rid of props error
            }
        }
    }
</script>