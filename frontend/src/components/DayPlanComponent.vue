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
    <span>{{dateTitle}}</span>
    <div class="flex-nowrap">
        <div v-for="hourBlock in dayBlock.hourBlocks">
            <HourBlockComponent :hourDataBlock="hourBlock" />
        </div>
        <div>
            <p>&nbsp;8 AM</p>
            <p>&nbsp;9 AM</p>
            <p>10 AM</p>
            <p>11 AM</p>
            <p>12 PM</p>
            <p>&nbsp;1 PM</p>
            <p>&nbsp;2 PM</p>
            <p>&nbsp;3 PM</p>
            <p>&nbsp;4 PM</p>
            <p>&nbsp;5 PM</p>
        </div>
    </div>
</template>