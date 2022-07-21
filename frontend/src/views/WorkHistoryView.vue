<template>
    <span>
        <DashboardLayout>
            <template #content>
                    <p class="text-4xl font-bold text-center my-5">Work history</p>
                    <div class="flex flex-col justify-start gap-5 overflow-y-auto">
                        <div class="card sm-600:card-side h-fit bg-gray-200 rounded mx-5" v-for="i in 8" :key="i">
                        <figure><img class="aspect-square" src="https://placeimg.com/200/280/arch" alt="Movie"></figure>
                        <div class="card-body p-5 flex-row justify-between">
                            <span class="flex flex-col justify-between">
                                <p class="font-medium">Mechanic :
                                     John Doe 
                                     </p>
                                <p class="font-medium">Date: 
                                    19/7/2022 
                                    </p>
                                <p class="font-medium">Vehicle: 
                                    Honda Civic 
                                    </p>
                                <p class="font-bold">Job No. #12345 </p>
                            </span>
                            <span class="flex flex-col justify-end">
                                 <button class="btn btn-sm" @click="$router.push('/viewjob')">
                                    view
                                </button>
                            </span>
                           
                        </div>
                        </div>
                    </div>
                </template>
        </DashboardLayout>
    </span>
</template>
<script lang="ts">
import DashboardLayout from "../components/DashboardLayout.vue"
export default{
    name: "WorkHistoryView",
    components: { DashboardLayout }
}
</script>
<style scoped>
.max-h-grid{
    max-height: 60vh;
}
</style>