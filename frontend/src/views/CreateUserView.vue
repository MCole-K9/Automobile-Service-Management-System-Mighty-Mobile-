<script setup lang="ts">
    import DashboardLayout from '@/components/DashboardLayout.vue';
    import SelectRoles from '@/components/SelectRoles.vue';
    import type { Role, User } from '@/classlib/Types';
    import { ref } from 'vue';
    import BackendService from '../../BackendService';
    import { useRouter } from 'vue-router';
    import UserComponent from '@/components/User.vue';
    import { rolesStore } from '@/stores/Roles';

    const router = useRouter();
    const roles = rolesStore();

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

    function handleRoleSelect(){
        user.value.roles = roles.roles;
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
            <UserComponent :User="user">
                <template #Extra>
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
                </template>
            </UserComponent>
                
                
        
            
        </template>
    </DashboardLayout> 
</template>
<script lang="ts">  
    export default {
        name: "UserProfileView",
        components: {
            SelectRoles,
            UserComponent
        }
    }
</script>