<script setup lang="ts">
    import {ref} from 'vue'
    import type {HourDataBlock} from '../classlib/MonthlySchedule';
    import HourBlockComponent from './HourBlockComponent.vue';

    const emit = defineEmits<{
        (e: 'openViewer', id: number, blocktype: "APPOINTMENT" | "JOBSTAGE", day: number): void,
        (e: 'openScheduler', time: number, day: number): void
    }>()

    const props = defineProps<{
        dayBlock: {
            day: number
            hourBlocks: HourDataBlock[]
        }
        dateTitle : string
    }>()

    // probably need to put method handlers for the relevant events here
    function openViewer(id: number, blocktype: "APPOINTMENT" | "JOBSTAGE"){
        // sends a new emit with the id, blockType, and day
        emit('openViewer', id, blocktype, props.dayBlock.day);
    }

    function openScheduler(time: number){
        // emits a new event with the time and day
        emit('openScheduler', time, props.dayBlock.day);
    }

</script>

<template>
    <div class="w-25 mb-2 font-semibold">{{dateTitle}}</div>
    <div class="mx-auto lg:w-min w-max-xs mb-6 overscroll-x-auto overflow-auto container">
        
        <div class="flex-nowrap shadow-md mx-auto w-min border pt-2 pb-2 pl-1 pr-1 rounded">
            
            <!-- each hourblock -->
            <div class="flex flex-row flex-nowrap w-min pl-8 space-x-2">
                <div v-for="hourBlock in dayBlock.hourBlocks">
                    <HourBlockComponent :hourDataBlock="hourBlock" 
                    @open-scheduler="openScheduler"
                    @open-viewer="openViewer"/>
                </div>
            </div>
            
            <!-- Time labels for each block -->
            <div class="flex flex-row flex-nowrap space-x-2">
                <p class="text-left w-20">&nbsp;8 AM</p>
                <p class="text-left w-20">&nbsp;9 AM</p>
                <p class="text-left w-20">10 AM</p>
                <p class="text-left w-20">11 AM</p>
                <p class="text-left w-20">12 PM</p>
                <p class="text-left w-20">&nbsp;1 PM</p>
                <p class="text-left w-20">&nbsp;2 PM</p>
                <p class="text-left w-20">&nbsp;3 PM</p>
                <p class="text-left w-20">&nbsp;4 PM</p>
                <p class="text-left w-12">&nbsp;5 PM</p>
            </div>
        </div>
    </div>
    
</template>