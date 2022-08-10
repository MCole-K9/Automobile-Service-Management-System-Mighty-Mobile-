<template>
    <NavBar/>
    <div class="bg-white overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-2xl leading-6 font-medium text-center text-gray-900">Applicant Information</h3>
        <p class=" text-center text-sm text-gray-500">Personal details and user information.</p>
    </div>
    <div class="border-t border-gray-200 mx-3 lg:mx-12">
        <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">First name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{user.firstName}}</dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Last name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{user.lastName}}</dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{user.email}}</dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{user.phoneNumber}}</dd>
        </div>
        </dl>
    </div>
    </div>
    
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";
import BackendService from '../../BackendService'
import type User from "../classlib/User";
import { currentUserStore } from "@/stores/User";
const currentUser = currentUserStore();

export default defineComponent({
    name:'ProfileView',
    components:{NavBar},
    methods:{},
    data(){
        return{
            user: <User>({})
        }
    },
    async created(){
        let res = await BackendService.getOneUser(currentUser.User.id)
        this.user = res?.data
        console.log(this.user);
    },
})
</script>