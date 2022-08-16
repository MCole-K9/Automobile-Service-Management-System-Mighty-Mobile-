<script setup lang="ts">
import { HourDataBlock } from '@/classlib/MonthlySchedule';
import { ref, computed } from 'vue';

    
    const props = defineProps<{
        hourDataBlock: {
            time: number,
            description: string,
            duration: number,
            id: number | null,
            client: string,
            blocktype: "APPOINTMENT" | "JOBSTAGE" | null,
        }
    }>()

    const filledBlockSize = computed(()=>{
        return props.hourDataBlock.duration === 1 ? "w-20" : 
        props.hourDataBlock.duration === 2 ? "w-40" : props.hourDataBlock.duration === 3 ? "w-60" : "w-20"
    });

</script>

<template>
    <div class="" >
        <!--shows if the id for the block isn't blank-->
        <button v-if="hourDataBlock.id != null"
            class="filledBlock h-20 rounded-lg"
            :class="filledBlockSize"
            @click="$emit('open-viewer', hourDataBlock.id, hourDataBlock.blocktype)">
            <div class="text-sm ml-1"><span class="font-semibold">{{hourDataBlock.blocktype == "APPOINTMENT" ? "ApptID: " : "StageID: "}}</span>{{hourDataBlock.id}}</div>
            <!-- <div  class="truncate ">{{hourDataBlock.description}}</div> -->
            <div class="text-sm font-semibold ml-1">Client:</div>
            <div class="text-sm truncate ml-1">{{hourDataBlock.client}}</div>
        </button>
        
        <!--shows if the id for the block Is blank-->
        <button class="text-center text-6xl px-4 align-middle emptyBlock" 
            v-if="hourDataBlock.id===null" 
            @click="$emit('open-scheduler', hourDataBlock.time)">+</button>
    </div>
</template>

<style scoped>

</style>