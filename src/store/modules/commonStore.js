import { defineStore } from 'pinia';
let commonStore = defineStore('commonStore', {
    state: () => {
        return {
            fold: false,
            refsh: false,

        }
    }
})
export default commonStore;