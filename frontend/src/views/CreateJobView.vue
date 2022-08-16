<script setup lang="ts">
    import { onMounted, ref, computed, reactive } from "vue";
    import DashboardLayout from '@/components/DashboardLayout.vue';
    import BackendService from "../../BackendService";
    import type { Job, User, Vehicle, JobPart, Appointment } from '@/classlib/Types';
    import { currentUserStore } from "@/stores/User";
    import { useRouter, useRoute } from "vue-router";
    import Validation from "@/classlib/Validation";

    const router = useRouter()
    const route = useRoute();
    const id = route.params.id;
    id ?  getAppointmentFromRouteParam() : console.log('No ID');
    async function getAppointmentFromRouteParam(){
        let res = await BackendService.getAppointment(Number(id))
        let app = res?.data as Appointment
        customer.value = app.customer as User
        customerVehicle.value = app.vehicle
    }
        
    let currentUser = currentUserStore();
    let customers = ref<User[]>([]);
    let customer = ref<User>({
        id: 0,
        email: "",
        firstName: "",
        lastName: ""
    });

    let customerVehicle = ref<Vehicle>()

    let job = ref<Job>({
        jobNumber: 0,
        endDate: new Date(),
        serviceFee: 0,
        serviceType: "",
        startDate: new Date(),
        summary: "",
        vehicleId: customerVehicle.value?.id as number,
        requiredParts: []

    });
    
    const startDate = ref("")
    const endDate = ref("")

    let jobPart = ref<JobPart>({
        name: "",
        price: 0,
    })

    let totalCost = computed(()=>{
        

        let partsCost = 0;

        job.value.requiredParts?.forEach(part=>{
            partsCost += part.price; 
        });

        return job.value.serviceFee + partsCost;


    })

    function addPart() {
        if(validationInfo.part.valid){

            job.value.requiredParts?.push({ ...jobPart.value }); // solves the pushing the reference of jobPart object issue
            jobPart.value.name = "";
            jobPart.value.price = 0;
        } 
      
        

    }

    function removePart(position: number) {
        job.value.requiredParts = job.value.requiredParts?.filter((part, index) => {
            return index != position;
        })
    }

    //Validation****************************************************

    const validationInfo = reactive({
        customer: computed(()=>{
            return (customer.value.id > 0)
        }),
        vehicle: computed(()=>{
            return (customerVehicle.value?.id as number > 0)
        }),
        serviceType: computed(()=>{
            return (!Validation.isEmpty(job.value.serviceType))
        }),
        serviceFee: computed(()=>{
            return !Validation.isZeroOrNegative(job.value.serviceFee)
        }),
        startDate: computed(()=>{
            return Validation.dateGteToday(startDate.value) 
        }),
        endDate: computed(()=>{
            return Validation.dateGte(startDate.value, endDate.value ) as boolean
        }),
        part: {
            valid: computed(()=>{
                return (!Validation.isEmpty(jobPart.value.name) && !Validation.isZeroOrNegative(jobPart.value.price))
            }),
            name: computed(()=>{
                return !Validation.isEmpty(jobPart.value.name);
            }),
            price: computed(()=>{
                return !Validation.isZeroOrNegative(jobPart.value.price);
            })
        },
        summary: computed(()=>{
            return !Validation.isEmpty(job.value.summary)
        }),
        showErrorMsg: false
        


    })

    function isValid(){
        return (
            validationInfo.customer &&
            validationInfo.vehicle && 
            validationInfo.summary && 
            validationInfo.serviceFee && 
            validationInfo.serviceType &&
            validationInfo.startDate &&
            validationInfo.endDate 
            
        ) as  boolean
    }
    //Validation****************************************************

    async function addJob() {
        
        if(isValid()){
            job.value.createdById = currentUser.User.id;
            job.value.vehicleId = customerVehicle.value?.id as number;
            job.value.totalCost = totalCost.value;

            const res = await BackendService.createJob(job.value);
            
            if (res?.status && res?.status < 300){
                router.push({name: "jobboard"});
            }
            if(id){
                await BackendService.fulfillAppointment(Number(id))
            }
        }else{
            validationInfo.showErrorMsg = true;
        }
        


    }

    onMounted(async () => {
        const res = await BackendService.getCustomers()
        customers.value = [...res?.data]

        console.log()
    })
</script>


<template>
    <DashboardLayout>
        <template #content>

            <section id="customer_info">
                <button class="btn btn-sm max-w-fit" @click="$router.back()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                </button>
                <p class="text-2xl lg:text-4xl mb-5 text-center font-bold">Create Job</p>
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
                    <div v-if="!id" class="mx-auto flex flex-col space-y-4 w-full">
                        <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg">Customer Name</label>
                        <select v-model="customer" class="select select-bordered w-full" id="selectCustomer">
                            <option disabled selected>Select Customer</option>
                            <option v-for="customer in customers" :key="customer.id" :value="customer">
                                {{ customer.firstName }} {{ customer.lastName }}</option>
                        </select>
                        <span v-if="validationInfo.showErrorMsg" :class="`text-xs text-red-400 px-2 ${validationInfo.customer ? 'hidden': 'block'}`">Customer Is Required</span>
                    </div>
                    <div v-else class="mx-auto flex flex-col space-y-4 w-full">
                        <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg">Customer Name</label>
                        <select v-model="customer" class="select select-bordered w-full" id="selectCustomer" disabled>
                            <option disabled selected :value="customer">{{ customer.firstName }} {{ customer.lastName }}</option>
                        </select>
                    </div>
                    <div class="mx-auto flex flex-col space-y-4 w-full">
                        <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg">Mobile Number</label>
                        <input class="input w-full input-bordered " type="text" :value="customer.phoneNumber" disabled>
                    </div>
                    <div class="mx-auto flex flex-col space-y-4 w-full">
                        <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg">Email Address</label>
                        <input class="input w-full input-bordered" type="email" :value="customer.email" disabled>
                    </div>
                    <div v-if="!id" class="mx-auto flex flex-col space-y-4 w-full">
                        <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg">Vehicle</label>
                        <select v-model="customerVehicle" :disabled="customer.id === 0"
                            class="select select-bordered w-full" id="firstNoticed">
                            <option disabled selected>Select Vehicle</option>
                            <option v-for="vehicle in customer.vehicles" :key="vehicle.id" :value="vehicle">
                                {{ vehicle.year }} {{ vehicle.make }} {{ vehicle.model }}</option>
                        </select>
                        <span v-if="validationInfo.showErrorMsg" :class="`text-xs text-red-400 px-2 ${validationInfo.vehicle ? 'hidden': 'block'}`">Vehicle  Is Required</span>

                    </div>
                    <div v-else class="mx-auto flex flex-col space-y-4 w-full">
                        <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg">Vehicle</label>
                        <select v-model="customerVehicle" class="select select-bordered w-full" id="selectCustomer" disabled>
                            <option disabled selected :value="customerVehicle">{{ customerVehicle?.year }} {{ customerVehicle?.make }} {{ customerVehicle?.model }}</option>
                        </select>
                    </div>
                </div>
            </section>
            <section id="job_info" class="mt-10">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div class="mx-auto flex flex-col space-y-4 w-full">
                        <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg">Service Type</label>
                        <select v-model="job.serviceType" class="select select-bordered w-full">
                            <option disabled selected>Select type</option>
                            <option value="Repair">Repair</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                        <span v-if="validationInfo.showErrorMsg" :class="`text-xs text-red-400 px-2 ${validationInfo.serviceType ? 'hidden': 'block'}`">Service Type Is Required</span>
                    </div>
                    <div class="mx-auto flex flex-col space-y-4 w-full">
                        <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg">Start Date</label>
                        <input class="input input-bordered"  type="date" v-model="startDate">
                        <span v-if="validationInfo.showErrorMsg" :class="`text-xs text-red-400 px-2 ${validationInfo.startDate ? 'hidden': 'block'}`">Invalid Date</span>
                    </div>
                    <div class="mx-auto flex flex-col space-y-4 w-full">
                        <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg">End Date</label>
                        <div class="flex w-full space-x-2 items-center">
                            <input class="input input-bordered w-full flex-grow-1" type="date"  v-model="endDate">
                            <button class="btn btn-sm" @click="endDate = startDate">Same Day</button>
                        </div>
                        <span v-if="validationInfo.showErrorMsg" :class="`text-xs text-red-400 px-2 ${validationInfo.endDate ? 'hidden': 'block'}`">Invalid Date</span>
                    </div>
                </div>

            </section>
            <section class="mt-10">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div class="mx-auto flex flex-col space-y-4 w-full">
                        <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg">Service Fee</label>
                        <label class="input-group w-full">
                            <span>$</span>
                            <input type="number" class="input input-bordered w-full" v-model="job.serviceFee" />
                        </label>
                        <span v-if="validationInfo.showErrorMsg" :class="`text-xs text-red-400 px-2 ${validationInfo.endDate ? 'hidden': 'block'}`">Service Fee Required</span>
                    </div>
                    <div class="mx-auto flex flex-col space-y-4 w-full sm:col-span-2">
                        <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg">Parts Needed</label>
                        <div class="flex space-x-3 ">
                            <input type="text" class="input input-bordered w-full" placeholder="Name"
                                v-model="jobPart.name" />
                            <label class="input-group w-full">
                                <span>$</span>
                                <input type="number" class="input input-bordered w-full" placeholder="Cost"
                                    v-model="jobPart.price" />
                            </label>
                        </div>
                        <div class="flex justify-end space-x-3">
                            <label for="my-modal-4"
                                :class="`btn btn-sm modal-button ${job.requiredParts && job.requiredParts?.length > 0 ? '' : 'hidden'}`">Preview
                                Parts</label>
                            <button class="btn  btn-sm" @click="addPart()">Add Part +</button>
                        </div>

                    </div>
                </div>
            </section>
            <section id="summery" class="mt-5">
                <div class="grid grid-cols-1 text-center">
                    <div class="mx-auto flex flex-col space-y-4 w-full ">
                        <label class="text-center w-full  py-4 px-2 bg-ourGrey shadow-lg">Summery</label>
                        <textarea rows="8" class="textarea textarea-bordered" placeholder="Summery"
                            v-model="job.summary"></textarea>
                        <span v-if="validationInfo.showErrorMsg" :class="`text-xs text-red-400 px-2 ${validationInfo.summary ? 'hidden': 'block'}`">Summery is Required</span>

                    </div>

                </div>
            </section>
            <div class="flex justify-center mt-4">
                <button @click="addJob" class="btn btn-sm px-8  bg-ourYellow">Create</button>
            </div>

            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for="my-modal-4" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="text-lg font-bold text-center">Job Parts</h3>
                    <ul class="flex flex-col space-y-3 mt-4">
                        <li v-for="(part, index) in job.requiredParts" :key="index"
                            class="flex justify-between items-center">
                            <span>{{ part.name }}</span>
                            <span>${{ part.price }}</span>
                            <span class="btn btn-ghost cursor-pointer" @click="removePart(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>


        </template>
    </DashboardLayout>


</template>

<script lang="ts">
export default {
    name: "CreateJobView",
    components: {
        DashboardLayout,

    }
}
</script>