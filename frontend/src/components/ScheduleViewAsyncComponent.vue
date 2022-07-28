<script setup lang="ts">
    import DayPlanComponent from '@/components/DayPlanComponent.vue';
    import HourBlockComponent from '@/components/HourBlockComponent.vue';
    import type {MonthBlock, DayBlock}  from '@/classlib/MonthlySchedule';
    import {HourDataBlock} from '@/classlib/MonthlySchedule';
    import {currentUserStore, newUserStore} from "../stores/User";
    import { onMounted, ref, reactive } from 'vue';
    import BackendService from '../../BackendService';
    import { defineAsyncComponent } from 'vue';

    const currentUser = currentUserStore();

    const schedule: MonthBlock = await BackendService.getMonthSchedule(new Date(Date.now()).getMonth(), currentUser.User.id);

    //
    // schedule.workingDays.forEach(workingday=>{
    //     console.log(workingday.day);
    //     workingday.hourBlocks.forEach(hour=>{
    //         console.log("time: " + hour.time);
    //     })
    // });
</script>

<template>
    <div class="w-max-w container">
        <div class="mx-auto flex flex-row space-x-4 overflow-auto overscroll-x-auto lg:w-min lg:h-min mt-2 mb-10">
                <button class="font-semibold bg-ourYellow rounded" v-if="schedule.month == 0">January</button>
                <button class="font-semibold bg-ourYellow rounded" v-if="schedule.month <= 1">February</button>
                <button class="font-semibold bg-ourYellow rounded" v-if="schedule.month <= 2">March</button>
                <button class="font-semibold bg-ourYellow rounded" v-if="schedule.month <= 3">April</button>
                <button class="font-semibold bg-ourYellow rounded" v-if="schedule.month <= 4">May</button>
                <button class="font-semibold bg-ourYellow rounded" v-if="schedule.month <= 5">June</button>
                <button class="font-semibold bg-ourYellow rounded" v-if="schedule.month <= 6">July</button>
                <button class="font-semibold bg-ourYellow rounded" v-if="schedule.month <= 7">August</button>
                <button class="font-semibold bg-ourYellow rounded" v-if="schedule.month <= 8">September</button>
                <button class="font-semibold bg-ourYellow rounded" v-if="schedule.month <= 9">October</button>
                <button class="font-semibold bg-ourYellow rounded" v-if="schedule.month <= 10">November</button>
                <button class="font-semibold bg-ourYellow rounded" v-if="schedule.month <= 11">December</button>
            </div>

            <div class="" v-for="day in schedule.workingDays">
                <DayPlanComponent :dayBlock="day"
                    :dateTitle="new Date( new Date(Date()).getFullYear(), schedule.month, day.day).toDateString()"
                    />
            </div>
    </div>
    

</template>

