<template>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div class="mx-auto flex flex-col space-y-4 w-full">
                <label class="text-center w-full p-2 bg-ourGrey shadow-lg" for="vmake">Vehicle Make</label>
                <input class="input w-full input-bordered" type="text" v-model="vehicle.make" id="vmake">
            </div>
            <div class="mx-auto flex flex-col space-y-4 w-full">
                <label class="text-center w-full p-2 bg-ourGrey shadow-lg"  for="vmodel">Vehicle Model</label>
                <input class="input w-full input-bordered " type="text" v-model="vehicle.model" id="vmodel">
            </div>
            <div class="mx-auto flex flex-col space-y-4 w-full min-w-52">
                <label class="text-center w-full p-2 bg-ourGrey shadow-lg" for="vyear">Vehicle Year</label>
                <div class="flex items-center space-x-3">
                    <input type="range" min="1990" max="2025" v-model="vehicle.year"  class="range range-sm text-ourGrey flex-grow-1" />
                    <input class="input w-full input-bordered" type="number" id="vyear" v-model="vehicle.year">
                </div>
            </div>
            <div class="mx-auto flex flex-col space-y-4 w-full min-w-52">
                <label class="text-center w-full p-2 bg-ourGrey shadow-lg" for="vplate">License Plate</label>
                <input class="input w-full input-bordered " type="text" v-model="vehicle.licensePlate" id="vplate">    
            </div>
             <div class="mx-auto flex flex-col space-y-4 w-full min-w-fit text-left ">
                <label class="text-center w-full p-2 bg-ourGrey shadow-lg" for="vimage">{{vehicle.image == null ? 'Upload':'Change'}} Image</label>
                <FormKit
                type="file"
                accept=".jpg,.jpeg,.png"
                help="Select an image"
                multiple="false"
                @change="uploadImage" 
                id="vimage"
                name="Vehicle name"
                validation="required"
                validation-visibility="live"
                />
            </div>
        </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

// import type { Vehicle } from "@/classlib/Types";

export default defineComponent({
    name:'AddVehicle',
    props:['vehicle'],
    data(){
        return{
            imagePlaceHolder : ''
        }
    },
    components:{},
    methods:{
        uploadImage(e: any){
            let reader = new FileReader()
            reader.addEventListener("load", async (e)=>{
                this.imagePlaceHolder = String(e.target?.result)
                let base64string:string = this.getBase64StringFromDataURL(e.target?.result)
                this.$emit('imageUpload',base64string)
                
                
            })
            reader.readAsDataURL(e.target.files[0]);
        },
        getBase64StringFromDataURL(dataURL:any){
            return dataURL.replace('data:', '').replace(/^.+,/, '');
        }
    },
    created(){

    }
})
</script>