<script setup lang="ts">
    import type { Role, User } from '@/classlib/Types';
    import DashboardLayout from '@/components/DashboardLayout.vue';
    import { computed, onMounted, ref, type Ref } from 'vue';
    import UserComponent from '@/components/User.vue';
    import {useRoute, useRouter} from "vue-router";
    import BackendService from '../../BackendService';
    import SelectRoles from '@/components/SelectRoles.vue';
    import { rolesStore } from '@/stores/Roles';
    import LoadingAnimation from '@/components/LoadingAnimation.vue';
    import { currentUserStore } from "@/stores/User";
    const currentUser = currentUserStore();


    const route = useRoute()
    const router = useRouter()


    const user = ref<User>({

        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        roles: []

    });

    const roles = rolesStore();

    let renderChild = computed(()=>{
        return (roles.roles.length > 0) // returns result of comparison
    })

    
    async function updateUser() {
        roles.stripRoleName();
        const res = await BackendService.updateUser(user.value);

        if (res?.status && res?.status < 300){
            router.push({name: "manageusers"});
        }
    }

    function updateRoles(){
        user.value.roles = roles.roles;
    }

    onMounted(async ()=> {
        const userId = parseInt(route.params.id as string);

        const res = await BackendService.getOneUser(userId);

        user.value = res?.data;

        roles.roles = user.value.roles as Role[]
        
        roles.setUserRoles()
        
        

    });
</script>
<template>
    <DashboardLayout>
        <template #content>
            <p class="text-2xl my-3 text-center font-bold">Edit Profile</p>
            <UserComponent :User="user">
                <template #Extra>
                    <div v-if="currentUser.isAdmin">
                        <label for="">Roles:</label>
                        <SelectRoles   @selected="updateRoles" />
                        
                    </div>
                    <div v-else>

                    </div>
                    <div class="flex justify-center">
                        <button class="btn">Change Password</button>
                    </div>
                    <div class="flex justify-center col-span-2">
                        <button @click="updateUser" class="btn w-1/2">Save</button>
                    </div>
                </template>
            </UserComponent>
        </template>
    </DashboardLayout> 
</template>
<script lang="ts">  
    export default {
        name: "EditUserView",
        components: {
            SelectRoles
        }
    }
</script>