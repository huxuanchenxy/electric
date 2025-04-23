import axios from './index'
import {
    baseUrl
} from './baseUrl'

export default {
    // saveSysUser: params => { 
    //     return axios.post(`${baseUrl}/SysUserAdd/SaveSysUser`,
    //         params,
    //     ).then(res => res)
    // },  
    getFuncList: () => {
        return axios.get(`${baseUrl}/Sys/GetSysFuncList`).then(res => res.data)
    },
    addSysFuncList: (params) => {
        return axios.post(`${baseUrl}/Sys/AddSysFuncList`, params).then(res => res.data)
    },
    addModule: (params) => {
        return axios.post(`${baseUrl}/Sys/AddModule`, params).then(res => res.data)
    },
    delModule: params => {
        return axios.get(`${baseUrl}/Sys/DelModule`, {
            params
        }).then(res => res.data)
    },
    renameModule: params => {
        return axios.get(`${baseUrl}/Sys/Rename`, {
            params
        }).then(res => res.data)
    },
    getModule: params => {
        return axios.get(`${baseUrl}/Module/GetModule`, {
            params
        }).then(res => res.data)
    },
    getModuleAsync: async params => {
        return await axios.get(`${baseUrl}/Module/GetModule`, {
            params
        })
    },
    validateModule: params => {
        return axios.get(`${baseUrl}/Sys/ValidateModuleName`, {
            params
        })
    },
    saveAll: params => {
        return axios.post(`${baseUrl}/Module/SaveModule`,
            params).then(res => res)
    },
    getSegmentsList: () => {
        return axios.get(`${baseUrl}/Sys/GetSegmentsList`).then(res => res.data)
    },
    validateSegmentsName: params => {
        return axios.get(`${baseUrl}/Sys/ValidateSegmentsName`, {
            params
        })
    },
    updateSegmentsName: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateSegmentsName`, {
            params
        }).then(res => res.data)
    },
    delSegments: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateSegmentsStatus`, {
            params
        }).then(res => res.data)
    },
    addSegments: (params) => {
        return axios.post(`${baseUrl}/Sys/SaveSegments`, params).then(res => res.data)
    },

    getDevicesList: () => {
        return axios.get(`${baseUrl}/Sys/GetDevicesList`).then(res => res.data)
    },
    validateDevicesName: params => {
        return axios.get(`${baseUrl}/Sys/ValidateDevicesName`, {
            params
        })
    },
    updateDevicesName: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateDevicesName`, {
            params
        }).then(res => res.data)
    },
    delDevices: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateDevicesStatus`, {
            params
        }).then(res => res.data)
    },
    addDevices: (params) => {
        return axios.post(`${baseUrl}/Sys/SaveDevices`, params).then(res => res.data)
    },
    getControlsList: () => {
        return axios.get(`${baseUrl}/Sys/GetControlsList`).then(res => res.data)
    },
    validateControlsName: params => {
        return axios.get(`${baseUrl}/Sys/ValidateControlsName`, {
            params
        })
    },
    updateControlsName: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateControlsName`, {
            params
        }).then(res => res.data)
    },
    delControls: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateControlsStatus`, {
            params
        }).then(res => res.data)
    },
    addControls: (params) => {
        return axios.post(`${baseUrl}/Sys/SaveControls`, params).then(res => res.data)
    },
    getResourcesList: () => {
        return axios.get(`${baseUrl}/Sys/GetResourceList`).then(res => res.data)
    },
    delResources: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateResourcesStatus`, {
            params
        }).then(res => res.data)
    },
    addResources: (params) => {
        return axios.post(`${baseUrl}/Sys/SaveResource`, params).then(res => res.data)
    },
    getResourceFuncsList: () => {
        return axios.get(`${baseUrl}/Sys/GetResourceFuncList`).then(res => res.data)
    },

    addSegDev: (params) => {
        return axios.post(`${baseUrl}/Sys/SaveSegmentDevice`, params).then(res => res.data)
    },
    getSegDevList: (params) => {
        return axios.get(`${baseUrl}/Sys/GetSegmentDeviceList`, {
            params
        }).then(res => res.data)
    },
    getAllDevicesList: () => {
        return axios.get(`${baseUrl}/Sys/GetAllDeviceList`).then(res => res.data)
    },

}
