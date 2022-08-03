<script setup lang="ts">
import { onMounted } from 'vue';

    
    defineProps<{
        hourDataBlock: {
            time: number,
            description: string,
            duration: number,
            id: number | null,
            client: string,
            blocktype: "APPOINTMENT" | "JOBSTAGE" | null,
        }
    }>()

</script>

<template>
    <div class="" >
        <!--shows if the id for the block isn't blank-->
        <button v-if="hourDataBlock.id != null"
            class="filledBlock w-20 h-20"
            @click="$emit('open-viewer', hourDataBlock.id, hourDataBlock.blocktype)">
            <div  class="truncate ">{{hourDataBlock.description}}</div>
            <div >Client: {{hourDataBlock.client}}</div>
        </button>
        
        <!--shows if the id for the block Is blank-->
        <button class="text-center text-6xl px-4 align-middle emptyBlock" 
            v-if="hourDataBlock.id===null" 
            @click="$emit('open-scheduler', hourDataBlock.time)">+</button>
    </div>
</template>

<style scoped>

</style>