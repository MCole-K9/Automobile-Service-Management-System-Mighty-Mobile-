<script setup lang="ts">
    import DashboardLayout from '@/components/DashboardLayout.vue';
    import SelectRoles from '@/components/SelectRoles.vue';
    import type { Role, User } from '@/classlib/Types';
    import { ref } from 'vue';
    import BackendService from '../../BackendService';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const user = ref<User>({

        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        roles: []

    });

    async function create() {
        const res = await BackendService.createUser(user.value);
        if (res?.status && res?.status < 300){
            
            router.push({name: "manageusers"});
        }
    }

    function handleRoleSelect(roles:Role[]){
        user.value.roles = roles;
        console.log(user.value)
    }

    async function generatePass() {
        const res = await BackendService.getRandomPassword(8);
        user.value.password = res?.data;
    }

    async function randomUser() {
        const res = await BackendService.getRandUser();
        console.log(res?.data)

        user.value.firstName = res?.data.results[0].name.first;
        user.value.lastName = res?.data.results[0].name.last;
        user.value.email = res?.data.results[0].email;
        user.value.phoneNumber = res?.data.results[0].phone;
        user.value.password = res?.data.results[0].login.password;
    }
</script>
<template>
    <DashboardLayout>
        <template #content>
            <div class="mx-auto max-w-3xl shadow-lg rounded-lg p-10 grid grid-cols-2 gap-4">
                <div class="mx-auto flex flex-col space-y-2 w-full">
                    <label class="text-center w-full  py-2 px-2 bg-ourGrey shadow-lg" for="vmake">First Name</label>
                    <input class="input w-full input-bordered " type="text" v-model="user.firstName" id="vmake">
                </div>
                <div class="mx-auto flex flex-col space-y-2 w-full">
                    <label class="text-center w-full  py-2 px-2 bg-ourGrey shadow-lg" for="vmake">Last Name</label>
                    <input class="input w-full input-bordered " type="text" v-model="user.lastName"  id="vmake">
                </div>
                <div class="mx-auto flex flex-col space-y-2 w-full col-span-2">
                    <label class="text-center w-full  py-2 px-2 bg-ourGrey shadow-lg" for="vmake">Email</label>
                    <input class="input w-full input-bordered " type="text" v-model="user.email" id="vmake">
                </div>
                <div class="mx-auto flex flex-col space-y-2 w-full col-span-2">
                    <label class="text-center w-full  py-2 px-2 bg-ourGrey shadow-lg" for="vmake">Phone Number</label>
                    <input class="input w-full input-bordered " type="text" v-model="user.phoneNumber"  id="vmake">
                </div>
                <div>
                    <label for="">Roles:</label>
                    <SelectRoles @selected="handleRoleSelect" />
                </div>
                <div class="flex flex-col space-y-3">
                    <div>
                        <label for="">Password:</label>
                        <input v-model="user.password" class="input input-bordered w-full" type="text" name="" id="">
                    </div>
                    <button @click="generatePass" class="btn">Generate</button>
                    <button @click="randomUser" class="btn">Random User</button>
                </div>
                <div class="flex justify-center col-span-2">
                    <button @click="create" class="btn w-1/2">Save</button>
                </div>
            </div>
            
        </template>
    </DashboardLayout> 
</template>
<script lang="ts">  
    export default {
        name: "UserProfileView",
        components: {
            SelectRoles
        }
    }
</script>