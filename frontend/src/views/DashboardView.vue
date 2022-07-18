<script setup lang="ts">
    import {defineComponent} from '@vue/runtime-core';
    import DashboardLayout from '../components/DashboardLayout.vue';

    defineComponent({
        name: "DashboardView",
        components: {
            DashboardLayout
        }
    })
</script>

<template>

    <DashboardLayout>
        <template #content>
             <h1 class="text-black">Testing</h1>
        </template>
    </DashboardLayout>
</template>


<style>

</style>