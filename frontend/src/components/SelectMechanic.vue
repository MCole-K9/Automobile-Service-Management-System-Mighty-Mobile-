<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import type {User} from "@/classlib/Types";
    import BackendService from '../../BackendService';

    const emits = defineEmits(["selected", "assign-mechanic", "cancel"]);

    const props = defineProps<{
        editableMech: boolean
    }>();

    let selectedMechanicId = ref(0);

    let mechanics = ref<User[]>([]);


    onMounted(async ()=>{
        const res = await BackendService.getMechanics();
        mechanics.value = res?.data;
    })


</script>

<template>

    <select @change="emits('selected', selectedMechanicId)" v-model="selectedMechanicId" :class="`select select-bordered w-full ${!props.editableMech? 'hidden': '' } `" id="selectMechanic">
        <option disabled selected>Select Mechanic</option>
        <option v-for="mechanic in mechanics" :key="mechanic.id" :value="mechanic.id">
            {{ mechanic.firstName }} {{ mechanic.lastName }}
        </option>
    </select>
    <div class="flex justify-end space-x-2 py-2">
        <button @click="emits('assign-mechanic')" class="btn btn-sm">{{editableMech? "Save": "Assign Mechanic"}}</button>
        <button v-if="props.editableMech" @click="emits('cancel')" class="btn btn-sm">Cancel</button>
    </div>

</template>

<script lang="ts">
</script>