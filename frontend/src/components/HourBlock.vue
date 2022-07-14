<script setup lang="ts">
import { onMounted } from 'vue';

    
    const props = defineProps<{
        id: number
        blockType: string
        duration: number
        startTime: number
    }>()

    onMounted(()=>{
        if (props.id === undefined){
            // Just leave this as it is, pretty much
            
        }
        else{
            // This needs to:
            // * make block match duration
            // * make the block's start time work
            // * indicate the blockType 
        }

    })

</script>

<template>
    <div class="w-24 h-24 text-4xl text-center" @click="$emit('open-scheduler')">
        + 
    </div>
</template>