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
    <div class="" @click="$emit('open-scheduler{{time}}')">
        <!--shows if the id for the block isn't blank-->
        <button v-if="hourDataBlock.id != null">
            <span  class="truncate">{{hourDataBlock.description}}</span>
            <span >Client: {{hourDataBlock.client}}</span>
        </button>
        
        <!--shows if the id for the block Is blank-->
        <button class="text-center text-6xl px-4 align-middle emptyBlock" v-if="hourDataBlock.id===null">+</button>
    </div>
</template>

<style scoped>

</style>