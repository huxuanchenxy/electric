import { ElLoading, ElMessage, ElNotification } from "element-plus";
import moment from 'moment';
export const keyMd5 = ")(*@wsxqaz!anglar"

export const dateFormat = (row, column) => {
    const daterc = row[column.property];
    if (daterc != null) {
        const dateMat = new Date(daterc);
        return moment(dateMat).format("YYYY-MM-DD HH:mm:ss");
    }
}

export const ElMsg = (msg, type = "success") => {
    ElMessage({
        showClose: true,
        message: msg,
        type: type,
        center: true,
    });

}

export const ElNotific = (message, title, type = "success") => {
    ElNotification({
        type,
        message, // "欢迎回来",
        title, // `hi,${getTime()}好`,
    });
}
export const CusElLoading = (msg = "数据保存中……") => {
    const loading = ElLoading.service({
        lock: true,
        text: msg,
        background: "rgba(0, 0, 0, 0.7)",
        fullscreen: true,
    });
    return loading;
}


export const getCurrentTime = () => {
    const dateMat = new Date();
    return moment(dateMat).format("YYYY-MM-DD HH:mm:ss");
}


export const SetToken = (token) => {
    sessionStorage.setItem('yytoken', token)
}

export const GetToken = () => {
    return sessionStorage.getItem('yytoken')
}

export const RemoveToken = () => {
    sessionStorage.removeItem('yytoken')
}
export const getTime = () => {
    let message = ''
        //通过内置构造函数Date
    const hours = new Date().getHours()
        //情况的判断
    if (hours <= 4) {
        message = '凌晨'
    } else if (hours <= 9) {
        message = '早上'
    } else if (hours <= 12) {
        message = '上午'
    } else if (hours <= 18) {
        message = '下午'
    } else {
        message = '晚上'
    }
    return message
}


export const autoPicture = async(el, options) => {
    let { scale = 1, allowTaint = false, useCORS = true, width = '375', height = '649', backgroundColor = null } = options
    const id = document.getElementById(el)
    const canvas = await html2canvas(id, {
        scale, //缩放比例,默认为1
        allowTaint, //是否允许跨域图像污染画布
        useCORS, //是否尝试使用CORS从服务器加载图像
        width, //画布的宽度
        height, //画布的高度
        backgroundColor //画布的背景色，默认为透明
    })
    return canvas.toDataURL('image/png')
}