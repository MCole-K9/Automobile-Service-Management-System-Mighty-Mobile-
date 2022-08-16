<script setup lang="ts">
    import {onMounted, reactive, ref} from "vue";
    import type {Appointment, Vehicle} from "@/classlib/Types";
    import {currentUserStore, newUserStore} from "@/stores/User"
    import BackendService from "../../BackendService.js";
    import RegisterForm from "@/components/RegisterForm.vue";
    import { useRouter } from "vue-router";
    
    const router = useRouter()
    const newUser = newUserStore();
    const currentUser = currentUserStore();

    const emits = defineEmits(["eu-booked"]) // after existing user books appointment

    let vehicle = ref<Vehicle>({
        make: "",
        model: "",
        year: 2006,
    })
    let appointment = reactive<Appointment>({
        suggestedDate: new Date(),
        problemDescription: "",
        streetAddress: "",
        town: "",
        parish: "",
        customerId: 0,
        vehicle: vehicle.value
    });

    let firstNoticed = ref<string>("First Noticed?");

    let fullName = ref("");
    let email = ref("");
    let phoneNumber = ref("");

    let selectedDate = ref("");
    let selectedTime = ref("");

    function handleContinueClick (){

        newUser.splitName(fullName.value)
        newUser.User.email = email.value;
        newUser.User.phoneNumber = phoneNumber.value;

    
    }

    async function bookAppointment(userId: number){


        appointment.suggestedDate = new Date(`${selectedDate.value}T${selectedTime.value}`)

    

        appointment.problemDescription += `. I First Noticed This Problem ${firstNoticed.value} `;
        const res = await BackendService.makeAppointment(userId, appointment)
        return res;

       
    }
    async function handleBookingClick(){

        //if valid

        const data = await bookAppointment(currentUser.User.id)
        console.log(data)

        if(currentUser.loggedIn){
            
            router.push("/dashboard")
        }
    }
    async function onRegister(userId:number){
        try{
            
            const res = await bookAppointment(userId)
            //Route to login
            router.push({path: "/login"});
        }catch(err){

            console.log({error:err, source: "onRegister Function in AppointmentBooking"});
        }
        
    }

    onMounted(async () => {
        if(currentUser.loggedIn){
            const res = await BackendService.getUserVehicles(currentUser.User.id);
            currentUser.User.vehicles = res?.data;
        }
    })


</script>
<template>
    <div v-if="currentUser.loggedIn" class="grid grid-cols-1  text-center mb-4">
        <div class="mx-auto flex flex-col space-y-4 w-full">
            <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" for="vmake"> Select Vehicle</label>
            <select v-model="appointment.vehicle" class="select select-bordered w-full text-center" id="">
                <option disabled selected>Select Vehicle</option>
                <option v-for="vehicle in currentUser.User.vehicles" :key="vehicle.id" :value="vehicle">{{ vehicle.year }} {{ vehicle.make }} {{ vehicle.model }}</option>
            </select>
        </div>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
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
                    <input type="range" min="1990" max="2025" v-model="vehicle.year" class="range range-sm text-ourGrey flex-grow-1" />
                    <input class="input w-full input-bordered" type="number" id="vyear" v-model="vehicle.year">
                </div>
            </div>
    </div>
    <div class="grid sm:grid-cols-2 gap-4 mt-8">
        <div>
            <div class="mx-auto flex flex-col space-y-4 w-full">
                <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" for="aptdate">Appointment Date</label>
                <input class="input w-full input-bordered " v-model="selectedDate" type="date"  id="aptdate">

                
                <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" for="apttime">Appointment Time</label>
                <input class="input w-full input-bordered " v-model="selectedTime" type="time"  id="apttime">
            </div>
        </div>
        <div>
            <div v-if="!currentUser.loggedIn" class="mx-auto flex flex-col space-y-4 w-full">
                <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" >Contact Information</label>
                <input class="input w-full input-bordered " v-model="fullName" placeholder="Full Name (John Doe)" type="text" id="name">
                <input class="input w-full input-bordered " v-model="email" placeholder="Email Address" type="email" id="new-user-email">
                <input class="input w-full input-bordered " v-model="phoneNumber" placeholder="Phone Number" type="text" id="firstNam">
                <p class=" px-2 my-2"><small>Note: This information will be used in the creation of your account</small></p>
            </div>
            <div v-else class="mx-auto flex flex-col space-y-4 w-full">
                <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg" >Contact Information</label>
                <input class="input w-full input-bordered " disabled :value="currentUser.fullName" placeholder="Full Name (John Doe)" type="text" id="name">
                <input class="input w-full input-bordered " disabled :value="currentUser.User.email" placeholder="Email Address" type="email" id="current-user-email">
                <input class="input w-full input-bordered " disabled :value="currentUser.User.phoneNumber" placeholder="Phone Number" type="text" id="firstNam">
            </div>
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
                    <option value="Some Time This Week">Last 7 Days</option>
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
            <label v-if="!currentUser.loggedIn" @click="handleContinueClick" for="my-modal-3" class="btn bg-ourYellow border-ourYellow w-4/12 modal-button">Continue</label>
            <button v-else @click="handleBookingClick" class="btn bg-ourYellow border-ourYellow w-4/12 modal-button">Book Appointment</button>
    </div>
        

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
    <div class="modal">
    <div class="modal-box relative  w-3/4 max-w-5xl">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <RegisterForm header="Complete Booking by Creating An Account" @registered="onRegister"/>
    </div>
    </div>
       
</template>
<script lang="ts">  
    export default {
        name: "AppointmentBooking",
        components: {
            RegisterForm
        }
    }
</script>