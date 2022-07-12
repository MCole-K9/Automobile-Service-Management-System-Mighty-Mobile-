<script setup lang="ts">
import { defineComponent, reactive, ref } from "@vue/runtime-core";
import NavBar from "../components/NavBar.vue";

defineComponent({
    NavBar,

})

interface IVehicle{
    make:String,
    model:String,
    year:Number
};

 let vehicle = reactive<IVehicle>({
    make: "",
    model: "",
    year: 2006,
 })

 const date = ref()

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
                    <Datepicker v-model="date" inputClassName="input w-full input-bordered" id="aptdate"></Datepicker>

                    <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" for="apttime">Appointment Time</label>
                    <input class="input w-full input-bordered " type="time"  id="apttime">
                </div>
            </div>
            <div>
                <div class="mx-auto flex flex-col space-y-4 w-full">
                    <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" >Contact Information</label>
                    <input class="input w-full input-bordered " placeholder="Full Name (John Doe)" type="text" id="name">
                    <input class="input w-full input-bordered " placeholder="Email Address" type="email" id="email">
                    <input class="input w-full input-bordered " placeholder="Phone Number" type="text" id="firstNam">
                </div>
                <p class=" px-2 my-2"><small>Note: This information will be used in the creation of your account</small></p>
            </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4 mt-8">
            <div>
                <div class="mx-auto flex flex-col space-y-4 w-full">
                    <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" for="problemDescription">Problem Description</label>
                    <textarea rows="6" class="textarea textarea-bordered" placeholder="Problem Description" id="problemDescription"></textarea>
                    <select class="select select-bordered w-full" id="firstNoticed">
                        <option disabled selected>First Noticed?</option>
                        <option>Today</option>
                        <option>Yesterday</option>
                        <option>Last 7 Days</option>
                        <option>Some Time this Month</option>
                    </select>
                </div>
            </div>
            <div>
                <div class="mx-auto flex flex-col space-y-4 w-full">
                    <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" >Location</label>
                    <input class="input w-full input-bordered " placeholder="Street Address" type="text" name="street_address" id="street_address">
                    <input class="input w-full input-bordered " placeholder="City/Town" type="text" name="city" id="city">
                    <input class="input w-full input-bordered " placeholder="Parish" type="text" name="parish" id="parish">
                </div>
            </div>
        </div>
        <div class="flex justify-center my-4">
            <button class="btn bg-ourYellow border-ourYellow w-4/12">Continue</button>
        </div>
        
    </section>

</main>
    

</template>

<style>

</style>