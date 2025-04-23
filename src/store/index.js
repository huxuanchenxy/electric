import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
let pinia = createPinia();
pinia.use(piniaPluginPersist);
export default pinia;

// import {defineStore} from 'pinia'
// export const mainStore=defineStore('mian',{
//     // state(){
//     //     return {
//     //         title:'a'
//     //     }
//     // },
//     state:()=>({
//         title:'a'

//     }),
//     getters:{

//     },
//     actions:{

//     }
// })