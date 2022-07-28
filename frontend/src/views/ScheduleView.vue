<script setup lang="ts">
    import NavBar from '../components/NavBar.vue'
    import DayPlanComponent from '@/components/DayPlanComponent.vue';
    import HourBlockComponent from '@/components/HourBlockComponent.vue';
    import type {MonthBlock, DayBlock}  from '@/classlib/MonthlySchedule';
    import {HourDataBlock} from '@/classlib/MonthlySchedule';
    import {currentUserStore, newUserStore} from "../stores/User";
    import { onMounted, ref, reactive } from 'vue';
    import BackendService from '../../BackendService';

    const currentUser = currentUserStore();
    
    const schedule: MonthBlock = await BackendService.getMonthSchedule(new Date(Date.now()).getMonth(), currentUser.User.id);
    
    // this works, but it breaks the page because i think it's supposed to be used in <Suspense> tags
    schedule.workingDays.forEach(workingday=>{
        console.log(workingday.day);
        workingday.hourBlocks.forEach(hour=>{
            console.log("time: " + hour.time);
        })
    });

</script>

<template>
    <NavBar />
    
    <Suspense>
        <template >
            <div>
                <button v-if="schedule.month = 0">January</button>
                <button v-if="schedule.month <= 1">February</button>
                <button v-if="schedule.month <= 2">March</button>
                <button v-if="schedule.month <= 3">April</button>
                <button v-if="schedule.month <= 4">May</button>
                <button v-if="schedule.month <= 5">June</button>
                <button v-if="schedule.month <= 6">July</button>
                <button v-if="schedule.month <= 7">August</button>
                <button v-if="schedule.month <= 8">September</button>
                <button v-if="schedule.month <= 9">October</button>
                <button v-if="schedule.month <= 10">November</button>
                <button v-if="schedule.month <= 11">December</button>
            </div>

            <div v-for="day in schedule.workingDays">
                <DayPlanComponent :dayBlock="day"
                    :dateTitle="new Date( new Date(Date()).getFullYear(), schedule.month, day.day).toDateString()"
                    />
            </div>
        </template>

        <template #fallback>
            I DON'T EVEN KNOW TBH
        </template>
    </Suspense>

    <div v-show="" class="modal">
        <!--Placeholder-->
    </div>

</template>