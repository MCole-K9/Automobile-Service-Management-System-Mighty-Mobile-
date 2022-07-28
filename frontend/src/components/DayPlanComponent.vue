<script setup lang="ts">
    import {ref} from 'vue'
    import type {HourDataBlock} from '../classlib/MonthlySchedule';
    import HourBlockComponent from './HourBlockComponent.vue';

    defineProps<{
        dayBlock: {
            day: number
            hourBlocks: HourDataBlock[]
        }
        dateTitle : string
    }>()

</script>

<template>
    <div class="mx-auto lg:w-min w-max-xs mb-6 overscroll-x-auto overflow-auto">
        <div class="w-25 mb-2 font-semibold">{{dateTitle}}</div>
        <div class="flex-nowrap shadow-md mx-auto w-min border pt-2 pb-2 pl-1 pr-1 rounded">
            
            <!-- each hourblock -->
            <div class="flex flex-row flex-nowrap w-min pl-8 space-x-2">
                <div v-for="hourBlock in dayBlock.hourBlocks">
                    <HourBlockComponent :hourDataBlock="hourBlock" />
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