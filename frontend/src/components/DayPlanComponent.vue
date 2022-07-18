<script setup lang="ts">
    import {ref} from 'vue'
    import HourBlock from './HourBlockComponent.vue';

    const dayBlocks = ref([])


</script>

<template>
    <div class="flex-nowrap">
        <div>

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