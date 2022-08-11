<script setup lang="ts">
    import type { Role } from '@/classlib/Types';
    import  { UserRole } from '@/classlib/Types';
    import { onMounted, onUnmounted,  } from 'vue';
    import { rolesStore } from '@/stores/Roles';

    
    const emits = defineEmits(["selected"])
   

    
    const roles = rolesStore();
    


    function onCheck(event:Event){
        let target = event.target as HTMLInputElement

        if(target.checked){

            roles.roles.push({
                id: parseInt(target.value) 
            
            });
            

        }else{

           
            roles.roles = roles.roles.filter((role) => {
                return role.id != parseInt(target.value) 
            });

        
        }

        emits("selected");
        
    }

    onUnmounted(()=>{
        roles.$reset();
    })
    


</script>
<template>
<div class="sm:w-1/2">
       <div class="form-control">
        <label class="cursor-pointer label justify-start space-x-2">
            <input @change="onCheck" type="checkbox" v-model="roles.userRoles.Customer"  class="checkbox " :value="UserRole.Customer" />
            <span class="label-text">Customer</span>

        </label>
        <label class="cursor-pointer label justify-start space-x-2 ">
            <input @change="onCheck"  type="checkbox"  class="checkbox " v-model="roles.userRoles.Mechanic" :value="UserRole.Mechanic" />
            <span class="label-text">Mechanic</span>
        </label>
        <label class="cursor-pointer label justify-start space-x-2">
            <input @change="onCheck"  type="checkbox"  class="checkbox " v-model="roles.userRoles.Manager" :value="UserRole.Manager" />
            <span class="label-text">Manager</span>
        </label>
        <label class="cursor-pointer label justify-start space-x-2">
            <input @change="onCheck"  type="checkbox"   class="checkbox " v-model="roles.userRoles.Admin" :value="UserRole.ADMIN" />
            <span class="label-text">Admin</span>
        </label>
    </div>
   
</div>

</template>
<script lang="ts">  
    export default {
        name: "SelectRoles",
        components: {
        }
    }
</script>