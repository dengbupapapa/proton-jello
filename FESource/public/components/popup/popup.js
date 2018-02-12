/**
 * 创建弹出层 基础
 */

var Utils = require('public/components/utils/utils');
var $body = $('body');
var $html = $('html');

function popup(options) {

    // 是否有背景
    this.backdrop = (typeof options.backdrop === 'boolean' && !options.backdrop) ? false : true;
    // 是否 html 添加 overflow: hidden
    this.overflow = (typeof options.overflow === 'boolean' && !options.overflow) ? false : true;
    this.html = options.html || '';
    this.closeSelect = options.close || null;

    this.init();

}

popup.prototype = {
    constructor: popup,
    init: function () {

        var self = this;
        self.$box = $('<div class="popup"></div>').html([
            self.backdrop ? '<div class="popup-overlay"></div>' : '',
            self.html
        ].join(''));

        self.$box.appendTo($body);

        if (self.closeSelect) {
            self.$box.on('click', self.closeSelect, function () {
                self.hide();
            });
        }

    },
    hide: function () {
        if (this.overflow) {
            $html.removeClass('popup-open');
        }
        this.$box.scrollTop(0).removeClass('active');
        return this;
    },
    show: function () {
        if (this.overflow) {
            $html.addClass('popup-open');
        }
        this.$box
            .css('zIndex', Utils.getNextIndex())
            .addClass('active');
        return this;
    }
}

module.exports = popup;