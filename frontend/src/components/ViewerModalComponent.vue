<script setup lang="ts">
    import BackendService from '../../BackendService';
    import {ref, watch, watchEffect} from 'vue';   
    import type {Ref} from 'vue';

    const props = defineProps<{
        open: boolean,
        id: number,
        blockType: "APPOINTMENT" | "JOBSTAGE"
    }>();

    const emit = defineEmits<{
        (e: 'viewerModalClose') : void
    }>();

    let fullDetails;


    type ShortJobInfo = {
        

    }

    type ShortAppointmentInfo = {
        customerId: number,
        customerLastName: string,
        customerFirstName: string,
        appointmentId: number,
        street: string,
        town: string,
        parish: string,
        problemDescription: string,
        vehicleMake: string,
        vehicleModel: string,
        vehicleYear: number,
        vehicleId: number,
        scheduleDate: Date,
    }
    const shortJobInformation: Ref<ShortJobInfo> = ({}) as Ref<ShortJobInfo>;
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
            fullDetails = await BackendService.getShortJobStageInformation(prop.id);

            // put the full details into the shortAppointmentInformation
        }
    })

</script>

<template>
    <div class="modal"
        :class="{'modal-open': open}"
        @click="$emit('viewerModalClose')">
        <div class="modal-box">
            <div v-if="blockType === 'JOBSTAGE'">
            <div>THIS IS A JOBSTAGE</div>
            {{id}} {{blockType}}
        </div>
        <div v-if="blockType === 'APPOINTMENT'">
            <div>Appointment {{shortAppointmentInformation.customerFirstName}} 
            {{shortAppointmentInformation.customerLastName}} (ID: {{shortAppointmentInformation.customerId}})</div>
            <div>Rest of details go here</div>
        </div>
            <button @click="$emit('viewerModalClose')"></button>
        </div>
    </div>
</template>