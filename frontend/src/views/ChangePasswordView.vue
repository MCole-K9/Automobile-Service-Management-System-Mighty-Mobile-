<script setup lang="ts">
    import DashboardLayout from '@/components/DashboardLayout.vue';
    import { reactive, ref, computed } from 'vue';
    import { currentUserStore } from '@/stores/User';
    import BackendService from '../../BackendService';


    const currentUser = currentUserStore();
    const oldPassword = ref("");
    const newPassword = ref("");
    const confirmNewPassword = ref("");

    const Msg = reactive({
        message: "",
        success: false,
        show: false
    })
    const validationInfo = reactive({

        passwordIsSame: computed(()=>{
            return (newPassword.value == confirmNewPassword.value)
        }),
        oldPasswordMatch: false
    })

    function isValid():boolean {
        return validationInfo.passwordIsSame
    }
    async function changePassword() {

        if (isValid()){

            const res = await BackendService.changePassword(currentUser.User.id, oldPassword.value, newPassword.value);
            
            console.log(res?.data);

            Msg.success = res?.data.changed as boolean
            Msg.message = res?.data.message as string
            Msg.show = true

            if(Msg.success){
                oldPassword.value = ""
                newPassword.value = ""
                confirmNewPassword.value = ""
            }
                
            

        }else{
            console.log("Error");
            
        }
        
        
    }
</script>
<template>
    <DashboardLayout>
        <template #content>
            <div class="mx-auto max-w-3xl shadow-lg rounded-lg p-10 flex flex-col space-y-3 ">
                <div v-if="Msg.show" :class="`alert ${Msg.success ? 'alert-success': 'alert-error'}`">{{Msg.message}}</div>
                <label class="text-center w-full  py-2 px-2 bg-ourGrey shadow-lg" for="vmake">Old Password</label>
                <input class="input w-full input-bordered my-3" type="password" v-model="oldPassword"  placeholder="Enter Old Password">
                <label class="text-center w-full  py-2 px-2 bg-ourGrey shadow-lg" for="vmake" >New Password</label>
                <input class="input w-full input-bordered my-3" type="password" v-model="newPassword"  placeholder="Enter New Password">
                <input class="input w-full input-bordered my-3" type="password" v-model="confirmNewPassword" placeholder="Confirm New Password">
                <span  :class="[validationInfo.passwordIsSame ? 'hidden' : 'block' , 'text-xs', 'text-red-400']">Password must be same!</span>
                <div class="flex justify-center">
                    <button class="btn" @click="changePassword">Change Password</button>
                </div>
            </div>
        </template>
    </DashboardLayout> 
</template>
<script lang="ts">  
    export default {
        name: "ChangePasswordView",
        components: {

        }
    }
</script>