<script setup lang="ts">
    import { currentUserStore } from '@/stores/User';
    import {ref, watch} from 'vue';
    import BackendService from '../../BackendService';
    import type {MinimumJobInfoItem, MinimumJobInfoList} from '../classlib/MinimalJobInfo';
    import type {FullJobInformation, JobStageWithSchedule} from '../classlib/PrismaDerivedTypes';
    import type {Ref} from 'vue';
    import type { Prisma } from '.prisma/client';

    type TimeToCheck = {
        targetTime: number,
        targetDay: number,
        duration: number
    }

    const props = defineProps<{
        open: boolean
        time: number,
        day: number,
        month: number,
        clashResult: boolean
    }>();

    watch(() => props.clashResult, (result)=>{
    console.log("clash changed, value: " + result);
    if (result === true){
        isDurationClash.value = true;
        durationErrorText.value = "ERROR: value exceeds maximum available duration";
    }
    else{
        isDurationClash.value = false;
    }
    });

    const emit = defineEmits<{
        (e: 'schedulerModalClose'): void
        (e: 'durationRangeValueChange', duration: number, time: number, day: number): void,
        (e: 'updateSchedule', targetMonth: number): void
    }>();
    
    const currentUser = currentUserStore();

    let isVehicleInformationOpen: Ref<Boolean> = ref(false);
    let isJobInformationOpen: Ref<Boolean> = ref(false);

    const newJobStage: Ref<Prisma.JobStageCreateInput> = ref({
        description: "",
        duration: 0,
        stageNumber: 0,
        job: {
            connect: {
                jobNumber: 0
            }
        },
        scheduledItem: {
            create: {
                date: new Date()
            }
        }
    });

    // Getting and populating the list of open jobs assigned to this user
    const jobsFromDatabase = await BackendService.getActiveJobsForMechanic(currentUser.User.id);
    const listOfJobs: MinimumJobInfoList = {items: []};
    let selectedJob: Ref<FullJobInformation> = ref({}) as Ref<FullJobInformation>;
    jobsFromDatabase?.data.forEach((job: any) => {
        let jobListItem: MinimumJobInfoItem = {jobNumber: 0, clientFirstName: "", clientLastName: "", clientId: 0};
        jobListItem.jobNumber = job?.jobNumber;
        jobListItem.clientFirstName = job.vehicle.owner.firstName;
        jobListItem.clientLastName = job.vehicle.owner.lastName;
        jobListItem.clientId = job.vehicle.owner.id;

        listOfJobs.items.push(jobListItem);
    });

    const optionSelectJob = ref();
    watch(optionSelectJob, async(optionSelect)=>{
        const jobId = optionSelect;

        if (jobId !== NaN){
            const fullJobInformation = await BackendService.getFullJobInformation(jobId);
            // console.log(fullJobInformation);
            selectedJob.value = fullJobInformation?.data;
        }
    });

    // method to validate new Job stage information
    const isValidationError: Ref<boolean> = ref(false);
    const isPostSuccess: Ref<boolean> = ref(false);
    const validationErrorMessage: Ref<string> = ref("");
    const durationErrorText: Ref<string> = ref("");
    const isDurationClash: Ref<Boolean> = ref(false);
    async function validateJobStageAndSubmit(){
        console.log("reached validateJobStage");
        
        emit('durationRangeValueChange', newJobStage.value.duration, props.time, props.day);

        if (props.clashResult === false){
            validationErrorMessage.value.replace("Duration of Job Stage at 4PM cannot be longer than 1 hour. ", "");

            if (newJobStage.value.description !== ""){
                validationErrorMessage.value.replace("Description is missing. ", "");

                if (newJobStage.value.scheduledItem !== null){
                    isValidationError.value = false;
                    
                    let targetDate: Date = new Date(Date.now());
                    targetDate.setMonth(props.month);
                    targetDate.setDate(props.day);
                    targetDate.setHours(props.time);
                    targetDate.setMinutes(0);
                    targetDate.setMilliseconds(0);
                    targetDate.setSeconds(0);

                    newJobStage.value.scheduledItem!.create!.date = targetDate;
                    newJobStage.value.stageNumber = selectedJob.value.stages.length + 1;
                    newJobStage.value.job.connect!.jobNumber = selectedJob.value.jobNumber;

                    const result = await BackendService.writeJobStageToDatabase({...newJobStage.value});

                    if (result?.status == 201){
                        isPostSuccess.value = true;
                        
                        setTimeout(() => {
                            emit('schedulerModalClose');
                            resetAllJobValues();
                        }, 2000);
                        emit('updateSchedule', props.month);
                    }
                    else if (result?.status == 503){
                        validationErrorMessage.value = "Could not connect to Database. Please try again or try again later. ";
                        isValidationError.value = true;
                    }

                }
                else{
                    validationErrorMessage.value += "job";
                    isValidationError.value = true;
                }
            }
            else{
                if (validationErrorMessage.value.search("Description is missing. ") === -1){
                    validationErrorMessage.value += "Description is missing. ";
                }
                isValidationError.value = true;
            }
        }
        else{
            if (props.time === 16 && newJobStage.value.duration > 1){
                if (validationErrorMessage.value.search("Duration of Job Stage at 4PM cannot be longer than 1 hour. ") === -1){
                    validationErrorMessage.value += "Duration of Job Stage at 4PM cannot be longer than 1 hour. ";
                }
            }
            isValidationError.value = true;
        }
        
    }

    function resetAllJobValues(){
        optionSelectJob.value = null;
        selectedJob.value = {} as FullJobInformation;
        newJobStage.value = {
            description: "",
            duration: 1,
            stageNumber: 0,
            job: {
                connect: {
                    jobNumber: 0
                }
            },
            scheduledItem: {
                create: {
                    date: new Date()
                }
            }
        }
        isValidationError.value = false;
        isPostSuccess.value = false;
    }
</script>
<template>
    <div class="modal z-50" 
        :class="{'modal-open': open}">
        <!-- <input type="checkbox" @change="$emit('schedulerModalClose')" id="close-modal-test"/> -->
        <div class="modal-box max-h-[30rem]">
            <!--This currently shows the current date (because that's what's stored in the object), so i need to rework it to show the intended date-->
            <div class="mb-4">
                <h2 class="text-xl font-semibold">Schedule New Job-Stage for </h2>
                <h2 class="text-xl font-semibold ml-4">{{`${new Date(Date.now()).getFullYear()}/${(props.month+1)}/${props.day}, ${props.time >12 ? props.time-12: props.time}:00 ${props.time > 12 ? 'PM':'AM'}`}}</h2>
                <label for="close-modal-test" @click.stop="$emit('schedulerModalClose')" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            </div>

            <label class="form-control sticky ml-8 mr-8">
                
                <label class="label">
                    <span class="font-semibold">Select the Job:</span>
                </label>
                <select v-model.number="optionSelectJob">
                    <option disabled value="" selected>Select a Job</option>
                    <option v-for="item in listOfJobs.items"
                    :key="item.jobNumber" :value="item.jobNumber">
                        {{item.jobNumber}} | {{item.clientFirstName}} {{item.clientLastName}} (ID: {{item.clientId}})
                    </option>
                </select>
            </label>
            
            <!--This should stay hidden until the user picks an active job-->
            <div tabindex="0" class="collapse collapse-arrow" v-if="selectedJob.jobNumber !== undefined">
                <input type="checkbox" />
                <h3 class="collapse-title text-lg font-semibold">Job Information</h3>
                <div class="collapse-content mx-4">
                    <div><span class="font-semibold">Job Number:</span> {{selectedJob.jobNumber}}</div>
                    <div><span class="font-semibold">Client:</span> {{selectedJob.vehicle.owner.firstName}} {{selectedJob.vehicle.owner.lastName}} (Customer ID: {{selectedJob.vehicle.owner.id}})</div>
                    <div><span class="font-semibold">Total Cost:</span> ${{selectedJob.totalCost}}</div>
                    <div><span class="font-semibold">Start Date:</span> {{new Date(selectedJob.startDate).toLocaleString()}}</div>
                    <div class="mb-2"><span class="font-semibold">Service Type:</span> {{selectedJob.serviceType}}</div>
                    <div class="mb-2">
                        <div class="font-semibold">Summary:</div>
                        <div class="ml-4">{{selectedJob.summary}}</div>
                    </div>

                    <div><span class="font-semibold">Address:</span></div>
                    <div v-if="selectedJob.town == null || selectedJob.town == undefined" class="ml-4">
                        <div>{{selectedJob.streetAddress}},</div>
                        <div>{{selectedJob.town}},</div>
                        <div>{{selectedJob.parish}}</div>
                    </div>
                    
                </div>
            </div>

            <!--This should also stay hidden-->
            <div tabindex="0" class="collapse collapse-arrow divide-y" v-if="selectedJob.jobNumber !== undefined">
                <input type="checkbox" />
                <h3 class="collapse-title text-lg font-semibold">Vehicle Information</h3>
                <div class="collapse-content mx-4">
                    <div>{{selectedJob.vehicle.year}} {{selectedJob.vehicle.make}} {{selectedJob.vehicle.model}} (License Plate: {{selectedJob.vehicle.licensePlate}})</div>
                    <div v-if="selectedJob.requiredParts.length !== 0">
                        <h4 class="font-semibold text-md mt-2">Required Parts</h4>
                        <div v-for="parts in selectedJob.requiredParts">
                        <span>Name: {{parts.name}}</span> <span>Cost ${{parts.price}}</span>
                        </div>

                    </div>
                </div>
            </div>
            
            <div v-if="selectedJob.stages !== null">
                <div tabindex="0" class="collapse collapse-arrow  divide-y" v-for="stage in selectedJob.stages">
                    <input type="checkbox" />
                    <h3 class="collapse-title text-lg font-semibold">Stage {{stage.stageNumber}}</h3>
                    <div class="collapse-content mx-4">
                        <div><span class="font-semibold">Duration:</span> {{stage.duration}} Hour(s)</div>
                        <div><span class="font-semibold">Date:</span> {{ stage.scheduledItem != null ? new Date(stage!.scheduledItem!.date).toLocaleString() : ""}}</div>
                        <div><span class="font-semibold">Description:</span> {{stage.description}}</div>                        
                    </div>
                </div>
            </div>

            <!--This should maybe also be hidden, not sure yet-->
            <div class="mx-4 mb-4" v-if="selectedJob.jobNumber !== undefined">
                <h3 class="text-lg font-semibold">New Stage</h3>
                <label class="form-control mx-2 mb-2">
                    <label class="label font-semibold">Description:</label>
                    <input v-model.trim="newJobStage.description" type="textarea" 
                    rows="4"
                    class="flex justify-between px-2 bg-gray-300"/>
                </label>

                <label class="form-control mx-2">
                    <label class="label font-semibold">Duration (Hours):</label>
                    <input v-model.number="newJobStage.duration" type="range" min="1" max="3" steps="1" class="range"
                    @change="$emit('durationRangeValueChange', newJobStage.duration, props.time, props.day)"/>
                    <div class="w-full flex justify-between text-xs px-2">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </div>
                    <label v-show="isDurationClash"
                    class="text-red-500">{{durationErrorText}}</label>
                </label>

                <!-- <button class="btn">Add images</button> -->
                <div class="text-red-500" v-show="isValidationError">ERROR: {{validationErrorMessage}}</div>
                <div class="text-green-500" v-show="isPostSuccess">Job Stage has been created. Updating schedule...</div>
            </div>

            <button 
            class="btn ml-auto mr-auto w-36 h-2 bg-ourYellow border-none text-black hover:bg-yellow-500 mt-4"
            @click="validateJobStageAndSubmit">Confirm New Job Stage</button>

        </div>
    </div>
</template>