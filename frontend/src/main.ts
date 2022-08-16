import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import "./index.css"
import { plugin, defaultConfig } from '@formkit/vue'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import '@formkit/themes/genesis'
const app = createApp(App).use(plugin, defaultConfig)
app.config.globalProperties.$parseDate = (rawDate:Date) => {
    let parsedDate = new Date(rawDate)
    return parsedDate.toLocaleDateString()
}
app.config.globalProperties.$log = (anything:any) => {
    console.log(anything)
}
const pinia = createPinia()

// Wasn't working. Leaving here to look over and understand why later
// pinia.use((context)=>{

//     const storeId = context.store.$id;

//     const serializer = {
//         serialize: JSON.stringify,
//         deserialize: JSON.parse
//     }
//     if(storeId == "currentUser"){
//         console.log(storeId)
//         // sync store from local Storage
//         let storageData = localStorage.getItem(storeId);
//         console.log(storageData)

//         if (storageData){
            
//             context.store.$patch(serializer.deserialize(storageData));
//         }

//         //Listen for changes and updates local storage
//         context.store.$subscribe((mutation, state)=>{
//             console.log(state)
//             localStorage.setItem(storeId, serializer.serialize(state));
            
//         });
//     }
    

//     //Undesired behavior -  Suspects that this runs for every store..
// });

pinia.use(piniaPluginPersistedstate);

app.use(pinia)

app.use(router)

app.component('Datepicker', Datepicker)

app.mount('#app')
