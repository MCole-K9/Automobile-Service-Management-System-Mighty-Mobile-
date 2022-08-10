<script  lang="ts">
import { defineComponent} from "@vue/runtime-core";
import NavBar from "../components/NavBar.vue";
import AppointmentBooking from "@/components/AppointmentBooking.vue"

export default defineComponent({
    components:{
        NavBar,
        AppointmentBooking
    }

})



</script>

<template>
<main class="">
    <NavBar />
    <section id="heading" class="mt-4 text-center mx-auto">
        <h4 class="text-2xl font-bold">Book An Appointment</h4>
        <p class="w-1/2 text-center mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro et asperiores ipsa sapiente voluptatibus neque quam adipisci quasi amet tenetur unde cumque perspiciatis inventore dolorum cum, ipsam corrupti velit voluptatum?
        </p>
    </section>
    <section id="apoointmentbooking" class="mt-10 py-4 px-4">
        <AppointmentBooking/>
    </section>

</main>
    

</template>

<style>

</style>