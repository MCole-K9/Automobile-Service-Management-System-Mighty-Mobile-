<script setup lang="ts">
    import NavBar from '../components/NavBar.vue'
    import DayPlanComponent from '@/components/DayPlanComponent.vue';
    import HourBlockComponent from '@/components/HourBlockComponent.vue';
    import {createMonthObject, type MonthBlock, type DayBlock, HourDataBlock}  from '@/classlib/MonthlySchedule';
    import {newUserStore} from "../stores/User";
    import { onMounted } from 'vue';


    const currentUser = newUserStore();

    const test: MonthBlock = createMonthObject(new Date(Date.now()).getMonth(), new Date(Date.now()), currentUser.User.id);
    
    // onMounted(function openScheduler(){
    //     // so this needs to pass this to the 

    // });
</script>

<template>
    <NavBar />



    <div v-show="" class="modal">
        <!--Placeholder-->
    </div>

</template>