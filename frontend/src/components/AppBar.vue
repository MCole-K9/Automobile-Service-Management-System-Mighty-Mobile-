<script setup lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { currentUserStore } from '../stores/User';
import UserMenu from './UserMenu.vue';

defineComponent({
    name: "AppBar",
    components: {
        UserMenu
    }
})

</script>
<template>
    <div class="navbar bg-ourYellow shadow-lg sticky top-0 z-50">
        <!-- sticky or fixed make the shadow appear on the drawer, looks nice but if you dont like just take off sticky, top-0 and z-50 - elliot-->
        <div class="flex-none">
            <slot></slot>
        </div>
        <div class="flex-1">
            <router-link class="flex items-center space-x-2" to="/">
                <img class="h-20" src="../assets/Mighty Mobile Logo(PS)-Sm.png" alt="Logo">
                <h4 class="text-xl hidden md:block">Mighty Mobile Auto Service & Repair</h4>
            </router-link>
        </div>
        <UserMenu :onDashboard="true" />
    </div>
</template>



<style>

</style>
<script lang="ts">
export default {};
</script>