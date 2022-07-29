<script setup lang="ts">
    import {ref} from 'vue';

    const props = defineProps<{
        open: boolean
        time: number,
        day: number,
        month: number,
    }>();

    const emits = defineEmits<{
        (e: 'schedulerModalClose'): void
    }>();


</script>

<template>
    <div class="modal" 
        :class="{'modal-open': open}"
        @click="$emit('schedulerModalClose')">
        <div class="modal-box">
            <div>Schedule Job Stage for {{time}} {{day}} {{month}}</div>
            <button 
            class="btn"
            @click="$emit('schedulerModalClose')">Close the modal</button>

        </div>
    </div>
</template>