<script setup lang="ts">
    import NavBar from '../components/NavBar.vue'
    import DayPlanComponent from '@/components/DayPlanComponent.vue';
    import HourBlockComponent from '@/components/HourBlockComponent.vue';
    import type {MonthBlock, DayBlock, HourDataBlock}  from '@/classlib/MonthlySchedule';
    import {currentUserStore, newUserStore} from "../stores/User";
    import { onMounted, ref, reactive } from 'vue';
    import BackendService from '../../BackendService';

    const currentUser = currentUserStore();
    let test: MonthBlock = BackendService.getMonthSchedule(new Date(Date.now()).getMonth(), parseInt(currentUser.$id));
    
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