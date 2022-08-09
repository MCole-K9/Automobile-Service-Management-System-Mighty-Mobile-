<script setup lang="ts">
import DashboardLayout from '@/components/DashboardLayout.vue';
import { onMounted, ref } from 'vue';
import BackendService from '../../BackendService';
import type { User } from '@/classlib/Types';

const users = ref<User[]>([]);

onMounted(async () => {
    const res = await BackendService.getUsers();
    users.value = res?.data;
});
</script>
<template>
    <DashboardLayout>
        <template #content>
            <div class="flex justify-end py-2">
                <router-link to="/dashboard/adduser" class="btn">
                    Add User
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </router-link>
            </div>
            <div class="overflow-x-auto w-full">
                <table class="table w-full">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Roles</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="user in users">
                            <th>
                                <label>
                                    <input type="checkbox" class="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div class="flex items-center space-x-3">
                                    <div class="avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="font-bold">{{ user.firstName }} {{ user.lastName }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="">
                                <div class="flex space-x-2">
                                    <span v-for="userRole in user.roles" class="badge badge-ghost badge-sm">{{ userRole.role }}</span>
                                </div>
                            </td>
                            <th>
                                <button class="btn btn-ghost btn-xs">Edit</button>
                                <button class="btn btn-ghost btn-xs">Delete</button>
                            </th>
                        </tr>


                    </tbody>


                </table>
            </div>
        </template>
    </DashboardLayout>
</template>
<script lang="ts">
export default {
    name: "ManageUserView",
    components: {
    }
}
</script>