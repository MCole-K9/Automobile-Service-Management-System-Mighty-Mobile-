<script setup lang="ts">
    import BackendService from '../../BackendService';
    import {ref, watch, watchEffect} from 'vue';   
    import type {Ref} from 'vue';
    import type {ShortJobInfo, ShortAppointmentInfo} from '../classlib/shortScheduleInfo';

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
                shortAppointmentInformation.value.appointmentId = fullDetails?.data.id;
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
            <div v-if="blockType === 'JOBSTAGE'">
            <div>Stage {{shortJobInformation.stageNumber}} of Job #{{shortJobInformation.jobNumber}}</div>
            <button>See All Jobs</button>
        </div>
        <div v-if="blockType === 'APPOINTMENT'">
            <div>Appointment for {{shortAppointmentInformation.customerFirstName}} 
            {{shortAppointmentInformation.customerLastName}} (ID: {{shortAppointmentInformation.customerId}})</div>
            <div>Rest of details go here</div>
            <button>See All Appointments</button>
        </div>
            <button @click="$emit('viewerModalClose')"></button>
        </div>
    </div>
</template>