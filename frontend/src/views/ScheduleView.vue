<script setup lang="ts">
    import NavBar from '../components/NavBar.vue'
    import {createMonthObject, type MonthBlock, type DayBlock, HourBlock}  from '@/classlib/MonthlySchedule';


    const test: MonthBlock = createMonthObject(new Date(Date.now()).getMonth(), new Date(Date.now()));
    
    // Broadly: open the modal that's attached to the page
    function openScheduler(){
        

    }

</script>

<template>
    <NavBar />



    <div v-show="" class="modal">
        <!--Placeholder-->
    </div>

</template>