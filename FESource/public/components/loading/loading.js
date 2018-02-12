/**
 * loading 小工具
 */

var Popup = require('public/components/popup/popup');

function loading() {

    return new Popup({
        html: '<div class="loading"><span></span><span></span><span></span><span></span></div>'
    });

}

module.exports = loading;