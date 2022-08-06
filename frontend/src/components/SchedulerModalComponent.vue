<script setup lang="ts">
    import { currentUserStore } from '@/stores/User';
    import {ref, watch} from 'vue';
    import BackendService from '../../BackendService';
    import type {MinimumJobInfoItem, MinimumJobInfoList} from '../classlib/MinimalJobInfo';
    import type {FullJobInformation} from '../classlib/PrismaDerivedTypes';
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

    let isVehicleInformationOpen: Ref<Boolean> = ref(false);
    let isJobInformationOpen: Ref<Boolean> = ref(false);


    // Getting and populating the list of open jobs assigned to this user
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

    // filling job information based on the selection of the dropdown
    const activeJobs = ref(jobs);
    const optionSelectJob = ref();
    let selectedJob: Ref<FullJobInformation> = ref({}) as Ref<FullJobInformation>;

    watch(optionSelectJob, async(optionSelect)=>{
        const jobId = optionSelect;

        if (jobId !== ""){
            const fullJobInformation = await BackendService.getFullJobInformation(jobId);
            console.log(fullJobInformation);
            selectedJob.value = fullJobInformation?.data;
        }
    })

</script>

<template>
    <div class="modal" 
        :class="{'modal-open': open}">

        <div class="modal-box">
            <div>Schedule New Job-Stage</div>
            
            <label class="form-control">
                <label class="label">
                    <span>Select the Job:</span>
                </label>
                <label class="input-group">
                    <span class="label-text bg-ourYellow">Job</span>
                    <select v-model="optionSelectJob">
                        <option disabled value="" selected>Select a Job</option>
                        <option v-for="item in jobs.items"
                        :key="item.jobNumber" :value="item.jobNumber">
                            {{item.jobNumber}} | {{item.clientFirstName}} {{item.clientLastName}} (ID: {{item.clientId}})
                        </option>
                    </select>
                </label>
            </label>
            
            <!--This should stay hidden until the user picks an active job-->
            <div tabindex="0" class="collapse collapse-arrow" v-if="selectedJob.jobNumber !== undefined">
                <input type="checkbox" />
                <div class="collapse-title">Job Information</div>
                <div class="collapse-content">
                    <div>Job Number: {{selectedJob.jobNumber}}</div>
                    <div>Start Date: {{selectedJob.startDate}}</div>
                    <div>Summary: {{selectedJob.summary}}</div>
                    <div>Total Cost: {{selectedJob.totalCost}}</div>
                    <div>Service Type: {{selectedJob.serviceType}}</div>
                    <div>
                        <div>Address: </div>
                        <div>{{selectedJob.streetAddress}}</div>
                        <div>{{selectedJob.town}}</div>
                        <div>{{selectedJob.parish}}</div>
                    </div>
                    <div>Client: {{selectedJob.vehicle.owner.firstName}} {{selectedJob.vehicle.owner.lastName}} (ID: {{selectedJob.vehicle.owner.id}})</div>
                </div>
            </div>

            <!--This should also stay hidden-->
            <div tabindex="0" class="collapse collapse-arrow" v-if="selectedJob.jobNumber !== undefined">
                <input type="checkbox" />
                <div class="collapse-title">Vehicle Information</div>
                <div class="collapse-content">
                    <div>{{selectedJob.vehicle.year}} {{selectedJob.vehicle.make}} {{selectedJob.vehicle.model}} (License Plate: {{selectedJob.vehicle.licensePlate}})</div>
                    <div>Required Parts</div>
                </div>
            </div>
            
            <div v-if="selectedJob !== undefined">
                <div tabindex="0" class="collapse collapse-arrow" v-for="stage in selectedJob.stages">
                    <input type="checkbox" />
                    <div class="collapse-title">Stage {{stage.stageNumber}}</div>
                    <div class="collapse-content">
                        <div>{{stage.stageNumber}}</div>
                    </div>
                </div>
            </div>

            <!--This should maybe also be hidden, not sure yet-->
            <div v-if="selectedJob.jobNumber !== undefined">
                <div>New Stage</div>
                <label class="form-control">
                    <label class="label">Description:</label>
                    <input type="textarea" class="flex justify-between text-xs px-2"/>
                </label>

                <label class="form-control">
                    <label class="label">Duration (Hours):</label>
                    <input type="range" min="0" max="3" value=1 steps="1" class="range"/>
                    <div class="w-full flex justify-between text-xs px-2">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                </label>

                <!-- <button class="btn">Add images</button> -->
                <div></div>
            </div>

            <button 
            class="btn"
            @click="$emit('schedulerModalClose')">Close</button>

        </div>
    </div>
</template>