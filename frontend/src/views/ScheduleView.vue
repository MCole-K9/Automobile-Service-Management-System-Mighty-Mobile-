<script setup lang="ts">
    import NavBar from '../components/NavBar.vue'
    import DayPlanComponent from '@/components/DayPlanComponent.vue';
    import HourBlockComponent from '@/components/HourBlockComponent.vue';
    import {createMonthObject, type MonthBlock, type DayBlock, HourDataBlock}  from '@/classlib/MonthlySchedule';
    import {newUserStore} from "../stores/User";
    import { onMounted } from 'vue';
    import reactive from 'vue';


    const currentUser = newUserStore();

    const test: MonthBlock = reactive(createMonthObject(new Date(Date.now()).getMonth(), new Date(Date.now()), currentUser.User.id));
    
    // onMounted(function openScheduler(){
    //     // so this needs to pass this to the 

    // });
</script>

<template>
    <NavBar />

    <div>
        <button v-if="test.month = 0">January</button>
        <button v-if="test.month <= 1">February</button>
        <button v-if="test.month <= 2">March</button>
        <button v-if="test.month <= 3">April</button>
        <button v-if="test.month <= 4">May</button>
        <button v-if="test.month <= 5">June</button>
        <button v-if="test.month <= 6">July</button>
        <button v-if="test.month <= 7">August</button>
        <button v-if="test.month <= 8">September</button>
        <button v-if="test.month <= 9">October</button>
        <button v-if="test.month <= 10">November</button>
        <button v-if="test.month <= 11">December</button>
    </div>

    <div v-for="day in test.workingDays">
        <DayPlanComponent :dayBlock="day"
            dateTitle="new Date( new Date(Date()).GetFullYear(), test.month, day.day).toDateString()"
            />
    </div>


    <div v-show="" class="modal">
        <!--Placeholder-->
    </div>

</template>