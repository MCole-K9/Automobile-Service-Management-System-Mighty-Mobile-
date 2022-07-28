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
    <div class="mx-auto w-min mb-6">
        <span class="w-min">{{dateTitle}}</span>
        <div class="flex-nowrap shadow mx-auto overflow-x-auto w-min">
            <div class="flex flex-row flex-nowrap">
                <div v-for="hourBlock in dayBlock.hourBlocks">
                    <HourBlockComponent :hourDataBlock="hourBlock" />
                </div>
            </div>
            
            <div class="flex flex-row flex-nowrap">
                <p class="text-left w-20">&nbsp;8 AM</p>
                <p class="text-left w-20">&nbsp;9 AM</p>
                <p class="text-left w-20">10 AM</p>
                <p class="text-left w-20">11 AM</p>
                <p class="text-left w-20">12 PM</p>
                <p class="text-left w-20">&nbsp;1 PM</p>
                <p class="text-left w-20">&nbsp;2 PM</p>
                <p class="text-left w-20">&nbsp;3 PM</p>
                <p class="text-left w-20">&nbsp;4 PM</p>
                <p class="text-left w-20">&nbsp;5 PM</p>
            </div>
        </div>
    </div>
    
</template>