<script setup lang="ts">
    import {ref} from 'vue';

    const props = defineProps<{
        open: boolean
        time: number,
        day: number,
        month: number,
    }>();

    const emits = defineEmits<{
        (e: 'modalClose'): void
    }>();


</script>

<template>
    <div class="modal" 
        :class="{'modal-open': open}"
        @click="$emit('modalClose')">
        <div class="modal-box">
            <div>Schedule Job Stage for {{time}} {{day}} {{month}}</div>
            <button 
            class="btn"
            @click="$emit('modalClose')">Close the modal</button>

        </div>
    </div>
</template>