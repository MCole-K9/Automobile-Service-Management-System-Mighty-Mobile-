<script setup lang="ts">
    // components
    import NavBar from '../components/NavBar.vue'
    import DayPlanComponent from '@/components/DayPlanComponent.vue';
    import HourBlockComponent from '@/components/HourBlockComponent.vue';
    import type {MonthBlock, DayBlock}  from '@/classlib/MonthlySchedule';
    import {HourDataBlock} from '@/classlib/MonthlySchedule';
    import DashboardLayout from '../components/DashboardLayout.vue';
    import ScheduleViewAsyncComponent from '../components/ScheduleViewAsyncComponent.vue';
    import SchedulerModalComponent from '@/components/SchedulerModalComponent.vue';
    import ViewerModalComponent from '@/components/ViewerModalComponent.vue';

    //utilities
    import {currentUserStore, newUserStore} from "../stores/User";
    import { onMounted, ref, reactive } from 'vue';
    import type {Ref} from 'vue';
    import BackendService from '../../BackendService';
    import { defineAsyncComponent } from 'vue';

    const scheduleView = defineAsyncComponent(
        () => import('../components/ScheduleViewAsyncComponent.vue'));
    const schedulerModal = defineAsyncComponent(
        () => import('../components/SchedulerModalComponent.vue'));
    const viewerModal = defineAsyncComponent(
        () => import('../components/ViewerModalComponent.vue'));

    let isScheduleOpen = ref(false);
    let isViewerOpen = ref(false);

    // schedule-specific values
    let time: Ref<number> = ref(0);
    let day: Ref<number> = ref(0);
    let month: Ref<number> = ref(0);

    // viewer-specific values
    let id: Ref<number> = ref(0);
    let blockType: Ref<"APPOINTMENT" | "JOBSTAGE"> = ref("APPOINTMENT");

    function openScheduler(_time: number, _day: number, _month: number){
        
        // need to get the id of the div with the modal to add "modal-open" to it
        
        // gives time, day, and month to the modal
        time.value = _time;
        day.value = _day;
        month.value = _month;

        isScheduleOpen.value = true;
        // use this to open a modal for an empty block to schedule a new jobstage
    }

    function closeScheduler(){
        isScheduleOpen.value = false;
    }

    function openViewer(_id: number, _blockType: "APPOINTMENT" | "JOBSTAGE", _day: number){
        
        id.value = _id;
        blockType.value = _blockType;

        isViewerOpen.value = true;
    }

    function closeViewer(){
        isViewerOpen.value = false;
    }

</script>

<template>
    <NavBar />
    
    <div class="max-w-screen px-4 overflow-hidden overscroll-x-auto lg:mx-auto lg:w-min">
        <Suspense>
            <ScheduleViewAsyncComponent
            @open-scheduler="openScheduler"
            @open-viewer="openViewer"/>

            <template #fallback>
                <div class="w-min container mx-auto my-auto">Loading...</div>
            </template>
        </Suspense>

        <!-- Scheduler Modal -->
        <Suspense>
            <SchedulerModalComponent
                :open="isScheduleOpen"
                :time="time"
                :day="day"
                :month="month"
                @scheduler-modal-close="closeScheduler"/>
            <template #fallback>
                <div v-show="" class="modal">

                </div>
            </template>
        </Suspense>

        <!-- Viewer Modal -->
        <Suspense>
            <ViewerModalComponent 
            :open="isViewerOpen"
            :id="id"
            :block-type="blockType"
            @viewer-modal-close="closeViewer"/>
            <template #fallback>
                <div v-show="" class="modal">

                </div>
            </template>
        </Suspense>
        
    </div>
    

</template>