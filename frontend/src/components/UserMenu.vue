<script setup lang="ts">
    import { useRouter } from "vue-router";
    import {currentUserStore} from "../stores/User"

    const router = useRouter();

    const currentUser = currentUserStore();    
    const props = defineProps<{
      onDashboard?: boolean
    }>()
    

    async function logout(){

        currentUser.$reset();
        //Navigate to Home
         router.push({path: "/"})

    }

</script>

<template>
    <div class="flex-none flex" >
        <div  class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost flex space-x-3">
          <div class="w-10 ">
            <img class="rounded-full avatar" src="https://placeimg.com/80/80/people" />
          </div>
          <h4 class="text-sm">{{currentUser.User.firstName}} {{currentUser.User.lastName}}</h4>
        </label>
        
        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <router-link v-if="!props.onDashboard" to="/dashboard" class="justify-between">
              Dashboard
            </router-link>
            <router-link v-else to="/">Home</router-link>
          </li>
          <li><router-link to="/profile">Profile</router-link></li>
          <li><a @click="logout">Logout</a></li>
        </ul>
      </div>
      </div>
</template>

<style>

</style>

<script lang="ts">
export default {};
</script>