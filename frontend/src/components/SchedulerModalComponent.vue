<script setup lang="ts">
    import { currentUserStore } from '@/stores/User';
    import {ref} from 'vue';
    import BackendService from '../../BackendService';

    const props = defineProps<{
        open: boolean
        time: number,
        day: number,
        month: number,
    }>();

    const emits = defineEmits<{
        (e: 'schedulerModalClose'): void
    }>();

    const currentUser = currentUserStore();

    const activeJobs = await BackendService.getActiveJobsForMechanic(currentUser.User.id);


</script>

<template>
    <div class="modal" 
        :class="{'modal-open': open}"
        @click="$emit('schedulerModalClose')">
        <div class="modal-box">
            <div>Schedule Job Stage for {{time}} {{day}} {{month}}</div>
            <!--Need to add drop down that uses this information-->
            <button 
            class="btn"
            @click="$emit('schedulerModalClose')">Close the modal</button>

        </div>
    </div>
</template>