<script setup lang="ts">
    import { currentUserStore } from '@/stores/User';
    import {ref} from 'vue';
    import BackendService from '../../BackendService';
    import type {MinimumJobInfoItem, MinimumJobInfoList} from '../classlib/MinimalJobInfo'

    const props = defineProps<{
        open: boolean
        time: number,
        day: number,
        month: number,
    }>();

    const emit = defineEmits<{
        (e: 'schedulerModalClose'): void
    }>();

    const currentUser = currentUserStore();

    const dbJobs = await BackendService.getActiveJobsForMechanic(currentUser.User.id);
    const activeJobs: MinimumJobInfoList = {items: []};

    dbJobs?.data.forEach((job: any) => {
        let jobListItem: MinimumJobInfoItem = {jobNumber: 0, clientFirstName: "", clientLastName: "", clientId: 0};
        jobListItem.jobNumber = job?.jobNumber;
        jobListItem.clientFirstName = job.vehicle.owner.firstName;
        jobListItem.clientLastName = job.vehicle.owner.lastName;
        jobListItem.clientId = job.vehicle.owner.id;

        activeJobs.items.push(jobListItem);
    });


</script>

<template>
    <div class="modal" 
        :class="{'modal-open': open}">
        <div class="modal-box">
            <div>Schedule Job Stage for {{time}} {{day}} {{month}}</div>
            
            <label class="form-control">
                <label class="label">
                    <span>Select the Job:</span>
                </label>
                <label class="input-group">
                    <span class="label-text bg-ourYellow">Job</span>
                    <select>
                        <option v-for="item in activeJobs.items"
                        :key="item.jobNumber" :value="`{{item.jobNumber}} | {{item.clientFirstName}} {{item.clientLastName}} (ID: {{item.clientId}})`"></option>
                    </select>
                </label>
                
            </label>
            
            <button 
            class="btn"
            @click="$emit('schedulerModalClose')">Close the modal</button>

        </div>
    </div>
</template>