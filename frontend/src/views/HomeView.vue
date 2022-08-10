<script setup lang="ts">
import NavBar from "../components/NavBar.vue";

</script>

<template>
  <main>
      <NavBar />
      <div class="hero" style="background-image: url(https://cdn.pixabay.com/photo/2018/10/19/12/04/workshop-3758513_960_720.jpg); height: 48rem; background-attachment: fixed;">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-2xl">
          <Transition name="in" appear>
            <span>
              <h1 class="mb-5 text-5xl font-bold">Mighty Mobile Auto Service & Repair</h1>
              <p class="mb-5">Bringing the garage to you. We offer affordable car repairs and maintenance at your convenience. Sign up today to book an appointment</p>
              <button class="btn btn-primary" @click="$router.push('/appointmentbooking')">Book Appointment</button>
            </span>
          </Transition>
          
        </div>
      </div>
    </div>



    <footer class="footer items-center py-4 px-14 bg-neutral text-neutral-content">
    <div class="items-center grid-flow-col">
        <router-link class="flex items-center space-x-2" to="/">
        <img class="h-12" src="../assets/Logo.png" alt="Logo">
        <h4 class="text hidden md:block">Mighty Mobile Auto Service & Repair</h4>
      </router-link>
      <p>Copyright © 2022 - All right reserved</p>
    </div> 
  </footer>
  </main>
</template>
<style>
.in-enter-active,
.in-leave-active {
  transition: opacity 1.5s ease-in-out;
}

.in-enter-from,
.in-leave-to {
  opacity: 0;
}
</style>