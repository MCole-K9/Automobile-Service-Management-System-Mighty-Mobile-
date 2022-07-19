<template>
    <span>
        <NavBar/>
        <Job :job="g"/>
    </span>
</template>
<script lang="ts">
import NavBar from "@/components/NavBar.vue"
import Job from "../components/Job.vue"
    export default{
        name:'JobDetailsView',
        components:{
            NavBar,
            Job
        },
        data(){
            return{
                g : {}//just to get rid of props error
            }
        }
    }
</script>