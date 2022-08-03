<script setup lang="ts">

    const props = defineProps<{
        open: boolean,
        id: number,
        blockType: "APPOINTMENT" | "JOBSTAGE"
    }>();

    const emit = defineEmits<{
        (e: 'viewerModalClose') : void
    }>();

</script>

<template>
    <div class="modal"
        :class="{'modal-open': open}"
        @click="$emit('viewerModalClose')">
        <div class="modal-box">
            <button @click="$emit('viewerModalClose')">{{id}} {{blockType}}</button>
        </div>
    </div>
</template>