<script setup lang="ts">
import { computed, ref } from "vue"
import User from "@/classlib/User"


const props = defineProps({
    User: User,
    header: String,

})

const emit = defineEmits(['Register']);


let password = ref<string>("");
let passwordConfirm = ref<string>("");

let passwordMatch = computed(()=>{
    return password.value === passwordConfirm.value;
})

function handleRegisterClick(){
    emit('Register', password.value)
}
 
</script>

<template>
    <div class="flex items-center justify-center bg-gray-100 ">
        <div class="px-4 py-4 mx-4 mt-4 text-left bg-white shadow-lg  w-6/12">  <!-- md:w-1/3 lg:w-1/3 sm:w-1/3 -->
            <h3 class="text-xl font-bold text-center my-4">{{props.header}}</h3>
            <form @submit.prevent="">
                <div class="flex flex-col space-y-4">
                    <div>
                        <label class="block" for="first_name">First Name</label>
                        <input type="text" :value="props.User?.firstName" id="first_name" placeholder="First Name" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    </div>
                    <div>
                        <label class="block" for="last_name">Last Name</label>
                        <input type="text" :value="props.User?.lastName" id="last_name" placeholder="Name" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    </div>
                    <div >
                        <label class="block" for="email">Email </label>
                        <input type="text" id="email" :value="props.User?.email" placeholder="Email" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    </div>
                    <div >
                        <label class="block" for="phone_number">Phone Number </label>
                        <input type="text" id="phone_number" :value="props.User?.phoneNumber" placeholder="Phone Number" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    </div>
                    <div >
                        <label class="block">Password </label>
                        <input type="password" v-model="password" placeholder="Password" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    </div>
                    <div >
                        <label class="block"> Confirm Password</label>
                        <input type="password" v-model="passwordConfirm" placeholder="Password" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        <span :class="[passwordMatch ? 'hidden' : 'block' , 'text-xs', 'text-red-400']">Password must be same!</span>
                    </div>
                    
                    
                </div>
                <div class="flex">
                        <button @click="handleRegisterClick" class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create
                            Account</button>
                    </div>
                    <div class="mt-6 text-grey-dark">
                        Already have an account?
                        <a class="text-blue-600 hover:underline" href="#">
                            Log in
                        </a>
                    </div>
            </form>
        </div>
    </div>
</template>



<style>
</style>