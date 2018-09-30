const Cookie = {

    setCookie: (name, value) => {
        var Days = 30
        var exp = new Date()
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
    },
    
    getCookie: (name) => {
        const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
        const arr = document.cookie.match(reg)
        if (arr != null)
            return unescape(arr[2]);
        else
            return null;
    }
}

export default Cookie