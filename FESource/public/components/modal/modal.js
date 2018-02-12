/**
 * 对话框 小工具
 */

var Popup = require('public/components/popup/popup');

function Modal(options) {
    this.title = options.title;
    this.body = options.body || '';
    this.okCallBack = options.okCallBack;
    this.noCallBack = options.noCallBack;

    this.init();
}

Modal.prototype = {
    constructor: Modal,
    init: function () {

        var self = this;

        var __popup = new Popup({
            html: [
                '<div class="modal">',
                '<div class="modal-header"><a class="close" href="javascript: void(0);">&times;</a><h3 class="title">' + self.title + '</h3></div>',
                '<div class="modal-body">' + self.body + '</div>',
                '<div class="modal-footer buttons-row text-center"><button type="button" class="button button-fill btn-sure">确定</button><button type="button" class="button btn-false">取消</button></div>',
                '</div>'
            ].join('')
        });

        self.$box = __popup.$box;
        self.show = function() {
            __popup.show();
        };
        self.hide = function() {
            __popup.hide();
        };

        self.$box
            .on('click', '.btn-sure', function() {
                self.okCallBack && self.okCallBack();
                self.hide();
            })
            .on('click', '.btn-false, .close', function() {
                self.noCallBack && self.noCallBack();
                self.hide();
            })

    }
}

module.exports = Modal;