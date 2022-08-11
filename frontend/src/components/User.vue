<script setup lang="ts">

 const props = defineProps<{
    User: User,
    forDisplay?: boolean
 }>()


</script>

<template>
    <div class="mx-auto max-w-3xl shadow-lg rounded-lg p-10 grid grid-cols-2 gap-4">
        <div class="mx-auto flex flex-col space-y-2 w-full">
            <label class="text-center w-full  py-2 px-2 bg-ourGrey shadow-lg" for="vmake">First Name</label>
            <input class="input w-full input-bordered my-3" type="text" v-model="props.User.firstName" id="vmake" :disabled="props.forDisplay">
        </div>
        <div class="mx-auto flex flex-col space-y-2 w-full">
            <label class="text-center w-full  py-2 px-2 bg-ourGrey shadow-lg" for="vmake">Last Name</label>
            <input class="input w-full input-bordered my-3" type="text" v-model="props.User.lastName"  id="vmake" :disabled="props.forDisplay">
        </div>
        <div class="mx-auto flex flex-col space-y-2 w-full col-span-2">
            <label class="text-center w-full  py-2 px-2 bg-ourGrey shadow-lg" for="vmake">Email</label>
            <input class="input w-full input-bordered my-3" type="text" v-model="props.User.email" id="vmake" :disabled="props.forDisplay">
        </div>
        <div class="mx-auto flex flex-col space-y-2 w-full col-span-2">
            <label class="text-center w-full  py-2 px-2 bg-ourGrey shadow-lg" for="vmake">Phone Number</label>
            <input class="input w-full input-bordered my-3" type="text" v-model="props.User.phoneNumber"  id="vmake" :disabled="props.forDisplay">
        </div>
        <slot name="Extra"></slot>
    </div>

</template>



<script lang="ts">
    import type { User } from '@/classlib/Types';
import  { defineComponent } from 'vue';

    export default defineComponent({
        name: "User"
    })
</script>