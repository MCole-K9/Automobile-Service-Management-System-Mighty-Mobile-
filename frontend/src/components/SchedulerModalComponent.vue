<script setup lang="ts">
    import { currentUserStore } from '@/stores/User';
    import {ref} from 'vue';
    import BackendService from '../../BackendService';
    import type {MinimumJobInfoItem, MinimumJobInfoList} from '../classlib/MinimalJobInfo';
    import type {Job} from '../classlib/Types';
    import type {Ref} from 'vue';

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
    const jobs: MinimumJobInfoList = {items: []};

    dbJobs?.data.forEach((job: any) => {
        let jobListItem: MinimumJobInfoItem = {jobNumber: 0, clientFirstName: "", clientLastName: "", clientId: 0};
        jobListItem.jobNumber = job?.jobNumber;
        jobListItem.clientFirstName = job.vehicle.owner.firstName;
        jobListItem.clientLastName = job.vehicle.owner.lastName;
        jobListItem.clientId = job.vehicle.owner.id;

        jobs.items.push(jobListItem);
    });

    const activeJobs = ref(jobs);
    let selectedJob: Job;

    async function getFullJobInformation(option: number | ""){
        if (option !== ""){
            const jobId: number = option;
            const fullJobInformation = BackendService.getJob(jobId).then(result => {
                if (result !== undefined){
                    selectedJob = result;
                }
            });
            
        }
        else{
            return;
        }
    }

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
                    <select @change="getFullJobInformation($options.selected.value)">
                        <option disabled value="" selected>Select a Job</option>
                        <option v-for="item in jobs.items"
                        :key="item.jobNumber" :value="item.jobNumber">
                            {{item.jobNumber}} | {{item.clientFirstName}} {{item.clientLastName}} (ID: {{item.clientId}})
                        </option>
                    </select>
                </label>
                
            </label>
            
            <button 
            class="btn"
            @click="$emit('schedulerModalClose')">Close</button>

        </div>
    </div>
</template>