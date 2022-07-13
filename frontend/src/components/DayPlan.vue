<script setup lang="ts">
    import {ref} from 'vue'

    const appointments = ref([])

    /* To do this i need to know the:
     * - Start Time
     * - Duration
     * - Details
     * 
     * and then generate a component whose size fits according to that
     * 
    */


</script>

<template>
    <div class="flex-nowrap">
        <div>
            <!--This will contain the various blocks-->
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