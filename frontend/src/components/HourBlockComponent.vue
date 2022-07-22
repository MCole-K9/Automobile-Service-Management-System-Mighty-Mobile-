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
    <div class="{{id == null ? filledBlock : emptyBlock}} " @click="$emit('open-scheduler{{time}}')">
        <!--shows if the id for the block isn't blank-->
        <span v-if="hourDataBlock.description!=''" class="truncate">{{hourDataBlock.description}}</span>
        <span v-if="hourDataBlock.client!=''">Client: {{hourDataBlock.client}}</span>
        
        <!--shows if the id for the block Is blank-->
        <span v-if="hourDataBlock.id===null">+</span>
    </div>
</template>

<style scoped>
    .filledBlock{
        bg-ourYellow

    }

    .emptyBlock{
        bg-white
    }

</style>