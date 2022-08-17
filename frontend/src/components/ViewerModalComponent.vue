<script setup lang="ts">
    import BackendService from '../../BackendService';
    import {ref, watch, watchEffect} from 'vue';   
    import type {Ref} from 'vue';
    import type {ShortJobInfo, ShortAppointmentInfo} from '../classlib/ShortScheduleInfo';

    const props = defineProps<{
        open: boolean,
        id: number,
        blockType: "APPOINTMENT" | "JOBSTAGE"
    }>();

    const emit = defineEmits<{
        (e: 'viewerModalClose') : void
    }>();

    let fullDetails;

    const shortJobInformation: Ref<ShortJobInfo> = ref({
        description: "",
        duration: 0,
        stageNumber: 0,
        jobNumber: 0,
        streetAddress: "",
        town: "",
        parish: "",
        jobSummary: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: 0,
        ownerId: 0,
        ownerFirstName: "",
        ownerLastName: "",
        scheduleDate: new Date(Date.now()),
    });

    const shortAppointmentInformation: Ref<ShortAppointmentInfo> = ref({
        customerId: 0,
        customerLastName: "",
        customerFirstName: "",
        appointmentId: 0,
        street: "",
        town: "",
        parish: "",
        problemDescription: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: 0,
        vehicleId: 0,
        scheduleDate: new Date(Date.now()),
    });

    watch(props, async (prop) => {
        if (props.blockType === 'APPOINTMENT'){
            try{
                fullDetails = await BackendService.getShortAppointmentInformation(prop.id);

                shortAppointmentInformation.value.appointmentId = fullDetails?.data.id;
                shortAppointmentInformation.value.customerId = fullDetails?.data.customer.id;
                shortAppointmentInformation.value.customerLastName = fullDetails?.data.customer.lastName;
                shortAppointmentInformation.value.customerFirstName = fullDetails?.data.customer.firstName;
                shortAppointmentInformation.value.street = fullDetails?.data.streetAddress;
                shortAppointmentInformation.value.town = fullDetails?.data.town;
                shortAppointmentInformation.value.parish = fullDetails?.data.parish;
                shortAppointmentInformation.value.problemDescription = fullDetails?.data.problemDescription;
                shortAppointmentInformation.value.vehicleMake = fullDetails?.data.vehicle.make;
                shortAppointmentInformation.value.vehicleModel = fullDetails?.data.vehicle.model;
                shortAppointmentInformation.value.vehicleYear = fullDetails?.data.vehicle.year;
                shortAppointmentInformation.value.vehicleId = fullDetails?.data.vehicle.id;
                shortAppointmentInformation.value.scheduleDate = fullDetails?.data.schedule.date;
            }
            catch(err){
                console.log(err);
            }    
        }
        else if (props.blockType === 'JOBSTAGE'){
            try{
                fullDetails = await BackendService.getShortJobStageInformation(prop.id);

                shortJobInformation.value.description = fullDetails?.data.description;
                shortJobInformation.value.duration = fullDetails?.data.duration;
                shortJobInformation.value.stageNumber = fullDetails?.data.stageNumber;
                shortJobInformation.value.jobNumber = fullDetails?.data.job.jobNumber;
                shortJobInformation.value.streetAddress = fullDetails?.data.job.streetAddress;
                shortJobInformation.value.town = fullDetails?.data.job.town;
                shortJobInformation.value.parish = fullDetails?.data.job.parish;
                shortJobInformation.value.jobSummary = fullDetails?.data.job.summary;
                shortJobInformation.value.vehicleMake = fullDetails?.data.job.vehicle.make;
                shortJobInformation.value.vehicleModel = fullDetails?.data.job.vehicle.model;
                shortJobInformation.value.vehicleYear = fullDetails?.data.job.vehicle.year;
                shortJobInformation.value.ownerId = fullDetails?.data.job.vehicle.owner.id;
                shortJobInformation.value.ownerFirstName = fullDetails?.data.job.vehicle.owner.firstName;
                shortJobInformation.value.ownerLastName = fullDetails?.data.job.vehicle.owner.lastName;
                shortJobInformation.value.scheduleDate = fullDetails?.data.scheduledItem.date;
            }
            catch(err){
                console.log(err);
            }
        }
    })

</script>

<template>
    <div class="modal"
        :class="{'modal-open': open}"
        @click="$emit('viewerModalClose')">
        <div class="modal-box">
            <div
                class=""
                v-if="blockType === 'JOBSTAGE'">
                <h2 class="font-semibold text-lg mb-2">Stage {{shortJobInformation.stageNumber}} of Job #{{shortJobInformation.jobNumber}}</h2>
                <div class="mx-4 mb-4">
                    <div><span class="font-semibold">Client: </span>{{shortJobInformation.ownerFirstName}} {{shortJobInformation.ownerLastName}} (Customer ID: {{shortJobInformation.ownerId}}) </div>
                    <div><span class="font-semibold">Date: </span>{{new Date(shortJobInformation.scheduleDate).toLocaleString()}}</div>
                    <div><span class="font-semibold">Vehicle Information: </span>{{shortJobInformation.vehicleMake}} {{shortJobInformation.vehicleModel}} {{shortJobInformation.vehicleYear}}</div>
                    <div v-if="shortJobInformation.town === null || shortJobInformation.town === undefined">
                        <div class="font-semibold">Address: </div>
                        <div class="ml-4">{{shortJobInformation.streetAddress}},</div>
                        <div class="ml-4">{{shortJobInformation.town}},</div> 
                        <div class="ml-4">{{shortJobInformation.parish}}</div>
                    </div>
                    <div class="mt-2 mb-2">
                        <div class="font-semibold mb-1">Job Summary:</div>
                        <div class="ml-4">{{shortJobInformation.jobSummary}}</div>
                    </div>
                    
                    <div><span class="font-semibold">Stage Duration: </span>{{shortJobInformation.duration}} Hour(s)</div>
                    <div>
                        <div class="font-semibold mb-1">Stage Description: </div>
                        <div class="ml-4">{{shortJobInformation.description}}</div>
                    </div>
                    
                </div>
                <div class="flex justify-center w-max">
                    <button class="btn bg-ourYellow text-black hover:bg-yellow-500 mx-auto border-none justify-center" 
                    @click="$router.push(`/dashboard/viewjob/${shortJobInformation.jobNumber}`)">See Full Job</button>
                </div>
               
            </div>
            <div 
                class=""
                v-if="blockType === 'APPOINTMENT'">
                <h2 class="font-semibold text-lg">Appointment for {{shortAppointmentInformation.customerFirstName}} 
                {{shortAppointmentInformation.customerLastName}} (Customer ID: {{shortAppointmentInformation.customerId}})</h2>
                <div class="mb-4">
                    <div><span class="font-semibold">Vehicle Information: </span>{{shortAppointmentInformation.vehicleMake}} {{shortAppointmentInformation.vehicleModel}} {{shortAppointmentInformation.vehicleYear}}</div>
                    <div><span class="font-semibold">Date: </span>{{shortAppointmentInformation.scheduleDate}}</div>
                    <div v-if="shortAppointmentInformation.town === null || shortAppointmentInformation.town === undefined">
                        <div class="font-semibold">Address: </div>
                        <div class="ml-4">{{shortAppointmentInformation.street}},</div>
                        <div class="ml-4">{{shortAppointmentInformation.town}},</div>
                        <div class="ml-4">{{shortJobInformation.parish}}</div>
                    </div>
                    <div>
                        <div class="font-semibold">Problem Description:</div>
                        <div class="ml-4">{{shortAppointmentInformation.problemDescription}}</div>
                    </div>
                    
                </div>
                <button class="btn bg-ourYellow text-black hover:bg-yellow-500 border-none" @click="$router.push(`/dashboard/appointment/${shortAppointmentInformation.appointmentId}`)">See Full Appointment</button>
            </div>
            <button @click="$emit('viewerModalClose')"></button>
        </div>
    </div>
</template>