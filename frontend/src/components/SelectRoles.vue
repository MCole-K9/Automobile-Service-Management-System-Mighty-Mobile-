<script setup lang="ts">
    import type { Role } from '@/classlib/Types';
    import  { UserRole } from '@/classlib/Types';
    import { ref } from 'vue';

    const emits = defineEmits(["Selected"])
    const roles = ref<Role[]>([]);

    function onCheck(event:Event){
        let target = event.target as HTMLInputElement

        if(target.checked){

            roles.value.push({
                id: parseInt(target.value) 
                
            });

        }else{

        
            roles.value = roles.value.filter((role) => {
                return role.id != parseInt(target.value) 
            });
        }

        emits("Selected", roles.value)
        
    }

</script>
<template>
<div class="sm:w-1/2">
       <div class="form-control">
        <label class="cursor-pointer label justify-start space-x-2">
            <input @change="onCheck" type="checkbox" name="Customer"  class="checkbox " :value="UserRole.Customer" />
            <span class="label-text">Customer</span>

        </label>
        <label class="cursor-pointer label justify-start space-x-2 ">
            <input @change="onCheck"  type="checkbox" name="Mechanic" class="checkbox " :value="UserRole.Mechanic" />
            <span class="label-text">Mechanic</span>
        </label>
        <label class="cursor-pointer label justify-start space-x-2">
            <input @change="onCheck"  type="checkbox"  name="Manager" class="checkbox " :value="UserRole.Manager" />
            <span class="label-text">Manager</span>
        </label>
        <label class="cursor-pointer label justify-start space-x-2">
            <input @change="onCheck"  type="checkbox" name="Admin"  class="checkbox " :value="UserRole.ADMIN" />
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