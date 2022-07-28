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
    <!--<DashboardLayout></DashboardLayout>-->
    <Suspense>
        
        <ScheduleViewAsyncComponent />

        <template #fallback>
            <div>Loading...</div>
        </template>
    </Suspense>

    <!-- So afaict multiple suspense tags work on one page -->
    <Suspense>


    </Suspense>
    <div v-show="" class="modal">
        <!--Placeholder-->
    </div>

</template>