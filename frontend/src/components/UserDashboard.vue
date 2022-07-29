<template>
    <div class="px-5">
        <span class="flex justify-between my-5">
                <p class="text-gray-800 text-xl sm:text-2xl lg:text-4xl font-bold">Dashboard</p>
                <button class="btn btn-sm lg:btn-md" @click="$router.push('dashboard/vehicles')">view vehicles</button>
            </span>
        <div class="flex lg:flex-row flex-col w-full  h-fit gap-5 lg:justify-between">
            <div class="bg-gray-200 rounded grow h-96 relative overflow-y-scroll">
                <div class="rounded bg-gray-800 w-1/1 h-16 flex sticky top-0 justify-center items-center mb-3">
                    <p class="text-xl lg:text-2xl font bold text-white">Requests For Appointment </p>
                </div>
                <div class="bg-green-500 min-w-max h-20 rounded mb-3 w-1/1 mx-3" v-for="i in 5">

                </div>
            </div>

        <div class="bg-gray-200 rounded grow h-96 relative overflow-y-scroll">
            <div class="rounded bg-gray-800 w-1/1 h-16 flex sticky top-0  justify-center items-center mb-3">
                <p class="text-xl lg:text-2xl font bold text-white">Ongoing Repairs/Maintenance</p>
            </div>
            <div class="bg-green-500 min-w-max h-20 rounded mb-3 w-1/1 mx-3" v-for="i in 5">

                </div>
        </div>

        </div>
    </div>
</template>
<script lang="ts">

export default{
    name:'UserDashboard',
}
</script>