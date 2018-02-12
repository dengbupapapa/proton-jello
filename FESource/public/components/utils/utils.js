// 弹出层 zIndex 值
var popupZIndex = 3000;

// 获取下一个弹出层zIndex
function getNextIndex() {
    return popupZIndex++
}

/**
 * 两位小数的字符串
 * @param  {[Number]} str [description]
 * @return {[Number]}     [description]
 */
function getDBNum(str) {
    if (!!!str && str != 0) {
        return '';
    }
    if (+str > 9) {
        return str;
    } else {
        return '0' + str;
    }
}

/**
 * 键值对字符串转换为对象 同键名转为数组
 * @param  {[type]} str [description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function getParam(str, key) {
    var __o = {};
    var __strArr = str.split('&');
    var __cValue = '';

    for (var i = __strArr.length - 1; i >= 0; i--) {
        var __d = __strArr[i].split('=');
        var __k = decodeURIComponent(__d[0]);
        var __v = decodeURIComponent(__d[1]);
        __cValue = __o[k];
        if (__cValue) {
            if (typeof __cValue == 'string') {
                __o[k] = [__cValue, __v];
            } else {
                __o[k].push(__v);
            }
        } else {
            __o[k] = __v;
        }
    }
    return key ? __o[key] : __o;
}

/**
 * 把URL中的参数转换为对象
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function getUrlParam(key) {
    var __str = location.search.substring(1);
    if (__str) {
        return getParam(__str, key);
    } else {
        return {};
    }
}

module.exports = {
    getNextIndex: getNextIndex,
    getDBNum: getDBNum,
    getParam: getParam,
    getUrlParam: getUrlParam
}