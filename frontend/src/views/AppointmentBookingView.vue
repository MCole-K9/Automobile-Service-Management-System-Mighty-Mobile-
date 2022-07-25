<script setup lang="ts">
import { defineComponent, reactive, ref } from "@vue/runtime-core";
import NavBar from "../components/NavBar.vue";
import BackendService from "../../BackendService"
import RegisterForm from "../components/RegisterForm.vue";
import {newUserStore} from "../stores/User"
import type { Appointment, Vehicle } from "../classlib/Types";

defineComponent({
    NavBar,
    RegisterForm

})

 let vehicle = reactive<Vehicle>({
    id: 0,
    make: "",
    model: "",
    year: 2006,
    ownerId: 0,

 })

 const date = ref<Date>(new Date())

 let appointment = reactive<Appointment>({
   id: 0,
   suggestedDate: new Date(),
   problemDescription: "",
   streetAddress: "",
   town: "",
   parish: "",
   customerId: 0,
   vehicleId: 0,

 });

 let firstNoticed = ref<string>();



 const newUser = newUserStore();

 

let fullName = ref("");
let email = ref("")
let phoneNumber = ref("")


function handleContinueClick (){

    newUser.splitName(fullName.value)
    newUser.User.email = email.value;
    newUser.User.phoneNumber = phoneNumber.value;

    
}


async function onRegister(userId:number){
    try{
        newUser.clearData()
        

        const vehicleRegRes = await BackendService.registerVehicle(userId, vehicle);
        console.log(vehicleRegRes?.data)

        appointment.vehicleId = vehicleRegRes?.data.id;

        const aptBookingRes = await BackendService.makeAppointment(userId, appointment);
        console.log(aptBookingRes)
        //Route to login

    }catch(err){

        console.log({error:err, source: "onRegister Function in AppointmentBookingView"})
    }
    
}

 

</script>

<template>
<main class="">
    <NavBar />
    <section id="heading" class="mt-4 text-center mx-auto">
        <h4 class="text-2xl font-bold">Book An Apppointment</h4>
        <p class="w-1/2 text-center mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro et asperiores ipsa sapiente voluptatibus neque quam adipisci quasi amet tenetur unde cumque perspiciatis inventore dolorum cum, ipsam corrupti velit voluptatum?
        </p>
    </section>
    <section id="apoointmentbooking" class="mt-10 py-4 px-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div class="mx-auto flex flex-col space-y-4 w-full">
                <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" for="vmake">Vehicle Make</label>
                <input class="input w-full input-bordered " type="text" v-model="vehicle.make" id="vmake">
            </div>
            <div class="mx-auto flex flex-col space-y-4 w-full">
                <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg"  for="vmodel">Vehicle Model</label>
                <input class="input w-full input-bordered " type="text" v-model="vehicle.model" id="vmodel">
            </div>
            <div class="mx-auto flex flex-col space-y-4 w-full">
                <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" for="vyear">Vehicle Year</label>
                <div class="flex items-center space-x-3">
                    <input type="range" min="1990" max="2025" v-model="vehicle.year"  class="range range-sm text-ourGrey flex-grow-1" />
                    <input class="input w-full input-bordered" type="number" id="vyear" v-model="vehicle.year">
                </div>
            </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4 mt-8">
            <div>
                <div class="mx-auto flex flex-col space-y-4 w-full">
                    <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" for="aptdate">Appointment Date</label>
                    <!-- <input class="input w-full input-bordered " type="date"  id="aptdate"> -->
                    <Datepicker v-model="appointment.date" inputClassName="input w-full input-bordered" id="aptdate"></Datepicker>

                    <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" for="apttime">Appointment Time</label>
                    <input class="input w-full input-bordered " type="time"  id="apttime">
                </div>
            </div>
            <div>
                <div class="mx-auto flex flex-col space-y-4 w-full">
                    <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" >Contact Information</label>
                    <input class="input w-full input-bordered " v-model="fullName" placeholder="Full Name (John Doe)" type="text" id="name">
                    <input class="input w-full input-bordered " v-model="email" placeholder="Email Address" type="email" id="email">
                    <input class="input w-full input-bordered " v-model="phoneNumber" placeholder="Phone Number" type="text" id="firstNam">
                </div>
                <p class=" px-2 my-2"><small>Note: This information will be used in the creation of your account</small></p>
            </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4 mt-8">
            <div>
                <div class="mx-auto flex flex-col space-y-4 w-full">
                    <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" for="problemDescription">Problem Description</label>
                    <textarea rows="6" class="textarea textarea-bordered" v-model="appointment.problemDescription" placeholder="Problem Description" id="problemDescription"></textarea>
                    <select v-model="firstNoticed" class="select select-bordered w-full" id="firstNoticed">
                        <option  disabled selected>First Noticed?</option>
                        <option value="Today">Today</option>
                        <option value="Yesterday">Yesterday</option>
                        <option value="Last 7 Days">Last 7 Days</option>
                        <option value="Some Time this Month">Some Time this Month</option>
                    </select>
                </div>
            </div>
            <div>
                <div class="mx-auto flex flex-col space-y-4 w-full">
                    <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" >Location</label>
                    <input v-model="appointment.streetAddress" class="input w-full input-bordered " placeholder="Street Address" type="text" name="street_address" id="street_address">
                    <input v-model="appointment.town" class="input w-full input-bordered " placeholder="City/Town" type="text" name="city" id="city">
                    <input v-model="appointment.parish" class="input w-full input-bordered " placeholder="Parish" type="text" name="parish" id="parish">
                </div>
            </div>
        </div>
        <div class="flex justify-center my-4">
            <!-- The button to open modal -->
            <label @click="handleContinueClick" for="my-modal-3" class="btn bg-ourYellow border-ourYellow w-4/12 modal-button">Continue</label>
        </div>
        

        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal">
        <div class="modal-box relative  w-3/4 max-w-5xl">
            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <RegisterForm header="Complete Booking by Creating An Account" @registered="onRegister"/>
        </div>
        </div>
        
    </section>

</main>
    

</template>

<style>

</style>