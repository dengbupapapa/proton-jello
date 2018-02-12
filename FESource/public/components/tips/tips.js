/**
 * 提示 小工具
 */
var Utils = require('public/components/utils/utils');
var $body = $('body');
var index = 0;
var nextId = function () {
    return 'tips-' + index++;
}
// 提示弹出层队列
var tipsQueue = [];
// 移出某个弹出层
var tipsQueueOut = function (id) {
    var newQueue = [];
    for (var i = 0; i < tipsQueue.length; i++) {
        if (tipsQueue[i].id != id) {
            newQueue.push(tipsQueue[i]);
        }
    }
    tipsQueue = newQueue;
}
// 对每个弹出层定位
var tipsPosition = function (id) {
    for (var i = 0; i < tipsQueue.length; i++) {
        tipsQueue[i].$box.css('top', (i + 1) * 42 + 'px');
    }
}

function Tips(options) {

    this.timeout = options.timeout || 3000;
    this.icon = options.icon || 'info';
    this.content = options.content;
    this.init();

}

Tips.prototype = {
    constructor: Tips,
    init: function () {
        var self = this;
        self.$box = $('<div></div>');
        self.$box
            .css('zIndex', Utils.getNextIndex())
            .text(self.content)
            .addClass('tips tips-' + self.icon)
            .appendTo($body)

        setTimeout(function () {
            self.$box.css('marginLeft', -self.$box.outerWidth() / 2);
            self.id = nextId();
            tipsQueue.push(self);
            tipsPosition();

            setTimeout(function () {
                self.$box.remove();
                tipsQueueOut(self.id);
                tipsPosition();
            }, self.timeout);
        }, 0);

    },
    hide: function () {

    }
}

module.exports = function (content, timeout, icon) {

    if (!!!content) {
        return
    }

    return new Tips({
        content: content,
        timeout: timeout,
        icon: icon
    })
}