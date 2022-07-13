<script setup lang="ts">
import { onMounted } from 'vue';

    
    defineProps<{
        id: number
        blockType: string
        duration: number
        startTime: number
    }>()

</script>

<template>
    <div class="w-24 h-24 text-4xl text-center" @click="$emit('open-scheduler')">
        + 
    </div>
</template>