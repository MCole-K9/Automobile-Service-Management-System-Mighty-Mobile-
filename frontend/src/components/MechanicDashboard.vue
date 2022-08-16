<template>
    <div class="px-5">
            <span>
                <FormKit
                type="datetime-local"
                value="2020-03-13T18:22"
                label="End of the world"
                help="When will the end of the world take place?"
                validation="required|after"
                validation-visibility="live"
                v-model="test"
                />
                <button class="btn btn-sm m-5" @click="$log(new Date('2022-08-15T15:18'))">test</button>
            </span>
    </div>
</template>
<script lang="ts">
import BackendService from "../../BackendService"
import { defineComponent } from "vue"
import Request from "./Request.vue"
import type { Appointment } from '../classlib/Types';
import { currentUserStore } from "@/stores/User";
// import { Form }

const currentUser = currentUserStore();

export default defineComponent({
    name:'UserDashboard',
    components:{
        Request,
    },
    data(){
        return{
            UserAppointments : <Appointment[]>([]),
            test : <any>({})
        }
    },
    async created(){
        let res = await BackendService.getAppointments()
        // console.log(res?.data);
        this.UserAppointments = res?.data
        this.UserAppointments = this.UserAppointments.filter(e => e.customerId == currentUser.User.id)
    }
})
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $log(anything:any) : void
  }
}
</script>