function format(date, fmt) {
    let o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length)
            );
        }
    }
    return fmt;
}

function getDate(timestamp) {
    return new Date(timestamp);
}

function getNextDate(timestamp, during) {
    return new Date(timestamp + during * 86400000);
}

function getFormatDate(timestamp) {
    return format(new Date(timestamp), 'yyyy-MM-dd');
}

function getFormatNextDate(timestamp, during) {
    return format(new Date(timestamp + during * 86400000), 'yyyy-MM-dd');
}

function getFormatDateTime(timestamp) {
    return format(new Date(timestamp), 'yyyy-MM-dd hh:mm:ss');
}

export {
    getDate,
    getNextDate,
    getFormatDate,
    getFormatNextDate,
    getFormatDateTime,
};
