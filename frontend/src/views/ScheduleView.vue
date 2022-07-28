<script setup lang="ts">
    import NavBar from '../components/NavBar.vue'
    import DayPlanComponent from '@/components/DayPlanComponent.vue';
    import HourBlockComponent from '@/components/HourBlockComponent.vue';
    import type {MonthBlock, DayBlock}  from '@/classlib/MonthlySchedule';
    import {HourDataBlock} from '@/classlib/MonthlySchedule';
    import {currentUserStore, newUserStore} from "../stores/User";
    import { onMounted, ref, reactive } from 'vue';
    import BackendService from '../../BackendService';
    import DashboardLayout from '../components/DashboardLayout.vue';
    import { defineAsyncComponent } from 'vue';
    // it's necessary to import the component normally into the parent apparently
    import ScheduleViewAsyncComponent from '../components/ScheduleViewAsyncComponent.vue';

    const asyncSchedule = defineAsyncComponent(() => import('../components/ScheduleViewAsyncComponent.vue'));
</script>

<template>
    <NavBar />
    
    <div class="max-w-screen px-4 overflow-hidden overscroll-x-auto lg:mx-auto lg:w-min">
        <Suspense>
            <ScheduleViewAsyncComponent />

            <template #fallback>
                <div class="w-min container mx-auto my-auto">Loading...</div>
            </template>
        </Suspense>

        <!-- So afaict multiple suspense tags work on one page -->
        <Suspense>
            <!--This is probably where the modal to add a jobstage will go-->
            <!--Should be another one for viewing the information of a given job/appointment/schedule item-->

        </Suspense>
        <div v-show="" class="modal">
            <!--Placeholder-->
        </div>
    </div>
    

</template>