<script setup lang="ts">
import { computed, ref, defineComponent, onUnmounted } from "vue"
import BackendService from "../../BackendService";
import {newUserStore} from "../stores/User"
import Validation from "@/classlib/Validation"


defineComponent({
    name: "RegisterForm",
    
})


const props = defineProps({
    header: String,
})


const emit = defineEmits(['registered']);

const newUser = newUserStore()


let password = ref<string>("");
let passwordConfirm = ref<string>("");

//Validation***************************************************************************
let validationInfo = computed(()=>{
    return {
        firstNameEntered: !Validation.isEmpty(newUser.User.firstName),
        lastNameEntered: !Validation.isEmpty(newUser.User.lastName),
        emailIsValid: Validation.validEmail(newUser.User.email),
        passwordIsMatch: (password.value === passwordConfirm.value),
        phoneNumberValid: Validation.validPhoneNumber(newUser.User.phoneNumber as string),
        
    }
});


const showErrorMsg = ref(false)
function isValid(): boolean{
    //All has to be true
    return ( validationInfo.value.emailIsValid && validationInfo.value.firstNameEntered && validationInfo.value.lastNameEntered && validationInfo.value.passwordIsMatch)
}

//^^Validation***************************************************************************

async function register(){
    
    if (isValid()){ 


        newUser.changeAttr("password", password.value)

        const res = await BackendService.registerUser(newUser.User);
        console.log(res?.data)

        if (res?.data.registered){

            const userId: number = res?.data.createdUser.id
            emit('registered', userId)
        }else {
            //show message
        }
        
        

        //Give Message if registered
        

    }else{
        showErrorMsg.value = true
    }
     
 }

onUnmounted(()=>{
    newUser.$reset();
})

 

</script>

<template>
    <div class="flex items-center justify-center bg-gray-100 ">
        <div class="px-4 py-4 mx-4 mt-4 text-left bg-white shadow-lg  w-6/12">  <!-- md:w-1/3 lg:w-1/3 sm:w-1/3 -->
            <h3 class="text-xl font-bold text-center my-4">{{props.header}}</h3>
            <form @submit.prevent="">
                <div class="flex flex-col space-y-4">
                    <div>
                        <label class="block" for="first_name">First Name</label>
                        <input type="text" v-model="newUser.User.firstName"  id="first_name" name="firstName" placeholder="First Name" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        <span v-if="showErrorMsg" :class="`text-xs text-red-400 px-2 ${validationInfo.firstNameEntered ? 'hidden': 'block'}`">First Name is Required</span>
                    </div>
                    <div>
                        <label class="block" for="last_name">Last Name</label>
                        <input type="text"  v-model="newUser.User.lastName"   id="last_name" name="lastName" placeholder="Name" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        <span v-if="showErrorMsg" :class="`text-xs text-red-400 px-2 ${validationInfo.lastNameEntered ? 'hidden': 'block'}`">Last Name is Required</span>

                    </div>
                    <div >
                        <label class="block" for="email">Email </label>
                        <input type="text" v-model="newUser.User.email" id="email" name="email"  placeholder="Email"  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        <span v-if="showErrorMsg" :class="`text-xs text-red-400 px-2 ${validationInfo.emailIsValid ? 'hidden': 'block'}`">*Invalid Email</span>
                    </div>
                    <div >
                        <label class="block" for="phone_number">Phone Number </label>
                        <input type="text" v-model="newUser.User.phoneNumber" id="phone_number" name="phoneNumber"  placeholder="Phone Number" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        <span v-if="showErrorMsg" :class="`text-xs text-red-400 px-2 ${validationInfo.phoneNumberValid ? 'hidden': 'block'}`">Phone Number Format Invalid</span>
                    </div>
                    <div >
                        <label class="block">Password </label>
                        <input type="password" v-model="password" placeholder="Password" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                    </div>
                    <div >
                        <label class="block"> Confirm Password</label>
                        <input type="password" v-model="passwordConfirm" placeholder="Password" class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        <span v-if="showErrorMsg" :class="[validationInfo.passwordIsMatch ? 'hidden' : 'block' , 'text-xs', 'text-red-400']">Password must be same!</span>
                    </div>
                    
                    
                </div>
                <div class="flex">
                        <button @click="register" class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create
                            Account</button>
                    </div>
                    <div class="mt-6 text-grey-dark">
                        Already have an account?
                        <router-link to="/login" class="text-blue-600 hover:underline">
                            Log in
                        </router-link>
                    </div>
            </form>
        </div>
    </div>
</template>



<style>
</style>