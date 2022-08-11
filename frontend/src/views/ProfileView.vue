<template>
    <NavBar/>
    <div class="bg-white overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-2xl leading-6 font-medium text-center text-gray-900">Applicant Information</h3>
        <p class=" text-center text-sm text-gray-500">Personal details and user information.</p>
    </div>
    <UserComponent :forDisplay="true" :User="user" class="my-5">
        <template #Extra>
            <button class="btn col-span-2 justify-self-end" @click="$router.push(`/dashboard/manageusers/edit/${user.id}`)">edit profile</button>
        </template>
    </UserComponent>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";
import BackendService from '../../BackendService'
import type { User } from "../classlib/Types";
import UserComponent from "@/components/User.vue";
import { currentUserStore } from "@/stores/User";
const currentUser = currentUserStore();

export default defineComponent({
    name:'ProfileView',
    components:{NavBar,UserComponent},
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