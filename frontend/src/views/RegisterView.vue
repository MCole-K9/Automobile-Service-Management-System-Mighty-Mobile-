<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import { defineComponent} from 'vue';

defineComponent({
  name: "RegisterView",
    components:{
      NavBar,
      RegisterForm
    }
    
})


function onRegister(){

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