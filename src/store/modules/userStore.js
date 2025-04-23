import { defineStore } from 'pinia';
const userStore = defineStore('userStore', {

    state: () => {
        return {
            curUser: null
        }
    },

    actions: {
        setCurUsreInfo(curUserObj) {
            this.curUser = curUserObj;
        },
        clearCurUserInfo() {
            this.curUser = null;
        }
    },
    getters: {},
    persist: {
        enabled: true,
        strategies: [{
                key: 'userinfo',
                paths: ['curUser']
            },
            // {
            //   key: 'configSet',
            //   storage: localStorage,
            //   paths: ['configSet']
            // }
        ]
    }
})

export default userStore