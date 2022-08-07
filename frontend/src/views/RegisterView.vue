<script setup lang="ts">
  import NavBar from '@/components/NavBar.vue';
  import RegisterForm from '@/components/RegisterForm.vue';
  import { defineComponent} from 'vue';
  import {useRouter} from "vue-router"

  const router = useRouter();

  defineComponent({
    name: "RegisterView",
      components:{
        NavBar,
        RegisterForm
      }
      
  })


  function onRegister(){
    router.push({path: "/login"})
  }

</script>


<template>
  <main>
    <NavBar />
    <RegisterForm header="Register"  @registered="onRegister"/>
  
  </main>
</template>

<style>

</style>