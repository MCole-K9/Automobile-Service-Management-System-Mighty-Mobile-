<script setup lang="ts">

    import {currentUserStore} from "../stores/User"


    const currentUser = currentUserStore();    
    const props = defineProps({
        onDashboard: {
            default: false,
        }
    })

    async function logout(){

        currentUser.$reset();
        //Navigate to Home
       // await router.push({path: "/"})

    }

</script>

<template>
    <div class="flex-none flex space-x-3 items-center " >
        <h4 class="text-lg">{{currentUser.User.firstName}} {{currentUser.User.lastName}}</h4>
        <div  class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" />
          </div>
        </label>
        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <router-link v-if="!props.onDashboard" to="/dashboard" class="justify-between">
              Dashboard
            </router-link>
            <router-link v-else to="/">Home</router-link>
          </li>
          <li><a>Profile</a></li>
          <li><a>Settings</a></li>
          <li><a @click="logout">Logout</a></li>
        </ul>
      </div>
      </div>
</template>

<style>

</style>