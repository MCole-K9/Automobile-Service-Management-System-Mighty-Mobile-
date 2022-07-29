<script setup lang="ts">
    import DayPlanComponent from '@/components/DayPlanComponent.vue';
    import HourBlockComponent from '@/components/HourBlockComponent.vue';
    import type {MonthBlock, DayBlock}  from '@/classlib/MonthlySchedule';
    import {HourDataBlock} from '@/classlib/MonthlySchedule';
    import {currentUserStore, newUserStore} from "../stores/User";
    import { onMounted, ref, reactive, type Directive } from 'vue';
    import BackendService from '../../BackendService';
    import { defineAsyncComponent } from 'vue';

    const emit = defineEmits<{
        (e: 'openScheduler', time: number, day: number, month: number): void,
        (e: 'openViewer', id: number, blocktype: "APPOINTMENT" | "JOBSTAGE", day: number): void
    }>();


    const currentUser = currentUserStore();
    const currentDate: Date = new Date(Date.now());

    // both serves as the initial value to generate the schedule, and also gets passed to the modal upon event triggering
    let targetMonth: number = currentDate.getMonth();

    const monthInformation: MonthBlock = await BackendService.getMonthSchedule(targetMonth, currentUser.User.id);
    const schedule = ref(monthInformation);
    
    async function changeTargetMonth(month: number){
        targetMonth = month;
        schedule.value = await BackendService.getMonthSchedule(targetMonth, currentUser.User.id);
    }

    function openScheduler(time: number, day: number){
        emit('openScheduler', time, day, targetMonth);
    }

    function openViewer(id: number, blocktype: "APPOINTMENT" | "JOBSTAGE", day: number){
        // emits the id, blocktype, and day, though the last part is not necessary
        emit('openViewer', id, blocktype, day);
    }

</script>

<template>
    <div class="w-max-w container">
        <div class="mx-auto flex flex-row space-x-4 overflow-auto overscroll-x-auto lg:w-min lg:h-min mt-2 mb-10">
                <button class="font-semibold bg-ourYellow rounded btn" 
                    @click="changeTargetMonth(0)"
                    v-if="currentDate.getMonth() == 0">January</button>
                <button class="font-semibold bg-ourYellow rounded btn" 
                    @click="changeTargetMonth(1)"
                    v-if="currentDate.getMonth() <= 1">February</button>
                <button class="font-semibold bg-ourYellow rounded btn" 
                    @click="changeTargetMonth(2)"
                    v-if="currentDate.getMonth() <= 2">March</button>
                <button class="font-semibold bg-ourYellow rounded btn" 
                    @click="changeTargetMonth(3)"
                    v-if="currentDate.getMonth() <= 3">April</button>
                <button class="font-semibold bg-ourYellow rounded btn" 
                    @click="changeTargetMonth(4)"
                    v-if="currentDate.getMonth() <= 4">May</button>
                <button class="font-semibold bg-ourYellow rounded btn" 
                    @click="changeTargetMonth(5)"
                    v-if="currentDate.getMonth() <= 5">June</button>
                <button class="font-semibold bg-ourYellow rounded btn" 
                    @click="changeTargetMonth(6)"
                    v-if="currentDate.getMonth() <= 6">July</button>
                <button class="font-semibold bg-ourYellow rounded btn" 
                    @click="changeTargetMonth(7)"
                    v-if="currentDate.getMonth() <= 7">August</button>
                <button class="font-semibold bg-ourYellow rounded btn" 
                    @click="changeTargetMonth(8)"
                    v-if="currentDate.getMonth() <= 8">September</button>
                <button class="font-semibold bg-ourYellow rounded btn" 
                    @click="changeTargetMonth(9)"
                    v-if="currentDate.getMonth() <= 9">October</button>
                <button class="font-semibold bg-ourYellow rounded btn" 
                    @click="changeTargetMonth(10)"
                    v-if="currentDate.getMonth() <= 10">November</button>
                <button class="font-semibold bg-ourYellow rounded btn" 
                    @click="changeTargetMonth(11)"
                    v-if="currentDate.getMonth() <= 11">December</button>
            </div>

            <div class="" v-for="day in schedule.workingDays">
                <DayPlanComponent 
                    @open-viewer="openViewer"
                    @open-scheduler="openScheduler"
                    :dayBlock="day"
                    :dateTitle="new Date( new Date(Date()).getFullYear(), schedule.month, day.day).toDateString()"
                    />
            </div>
    </div>
    

</template>

