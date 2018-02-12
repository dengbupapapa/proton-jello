/**
 * 自定义滚动条
 *
 * 暂时不知道怎么把 CSS 单独加载进去，至少写到 ui.less 里面
 */


/**
 * 滚动事件
 * @param  {[type]}   el [description]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function mousewheelEvent(el, fn) {

    var __type = 'mousewheel';
    var __eventCompat = function (event) {
        var type = event.type;
        if (type == 'DOMMouseScroll' || type == 'mousewheel') {
            event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
        }
        if (event.srcElement && !event.target) {
            event.target = event.srcElement;
        }
        if (!event.preventDefault && event.returnValue !== undefined) {
            event.preventDefault = function () {
                event.returnValue = false;
            }
        }
        return event;
    }

    if (window.addEventListener) {
        if (document.mozFullScreen !== undefined) {
            __type = 'DOMMou seScroll';
        }

        el.addEventListener(__type, function (event) {
            fn.call(this, __eventCompat(event));
        }, false);
    }
    if (window.attachEvent) {
        el.attachEvent('on' + __type, function (event) {
            event = event || window.event;
            fn.call(el, __eventCompat(event));
        });
    }

}


/**
 * 自定义滚动条
 * @param  {[type]} $el [description]
 * @return {[type]}     [description]
 */
function scrollBar(options) {

    this.$box = options.$box;
    this.$content = options.$content;
    this.unitLength = 60; // 每次移动的单位长度 px
    this.xTop = 0; // 当前滚动位置
    this.isRolling = false; // 是否在滚动
    this.barTop = 0; // bar 当前位置
    this.isMoving = false; // bar 是否在移动
    this.xMax = 0;
    this.barMax = 0;

    if (this.$box.length <= 0 || this.$content.length <= 0) {
        return
    }

    this.$box
        .addClass('scroll-box')
        .append('<div class="scroll-bar"></div>')

    this.$bar = this.$box.find('.scroll-bar');
    this.init();

}

scrollBar.prototype = {
    constructor: scrollBar,
    init: function () {

        var self = this;

        self.resetRange();
        self.moveBar();
        self.moveContent();

        $(window)
            .on('resize', function () {
                self.resetRange();

                if (self.xMax > 0) {
                    self.$bar.show();
                } else {
                    self.xTop = 0;
                    self.moveNav();
                    self.$bar.hide();
                }
            })
            .trigger('resize')

    },
    resetRange: function () {
        this.barMax = this.$box.height() - this.$bar.height();
        this.xMax = this.$content.height() - this.$box.height();
    },
    moveBar: function () {

        var self = this;
        var __barStartY = 0;

        self.$bar
            .on('mousedown', function (e) {
                __barStartY = e.pageY
                self.isMoving = true;
            })
            .on('mousemove', function (e) {
                if (!self.isMoving) {
                    return
                }
                moveBar(e.pageY - __barStartY);
            })
            .on('mouseout', function (e) {
                if (!self.isMoving) {
                    return
                }
                self.isMoving = false;
                moveBar(e.pageY - __barStartY, true);
            })
            .on('mouseup', function (e) {
                if (!self.isMoving) {
                    return
                }
                self.isMoving = false;
                moveBar(e.pageY - __barStartY, true);
            })

        function moveBar(distance, end) {

            var __y = self.barTop + distance;

            // 超范围修正
            if (__y < 0) {
                __y = 0;
            }
            if (__y > self.barMax) {
                __y = self.barMax;
            }

            self.$bar.css('top', (__y) + 'px');

            var __top = Math.ceil((__y / self.barMax) * self.xMax);

            self.$content.css('margin-top', '-' + __top + 'px');

            if (end) {
                self.barTop = __y;
            }

        }

    },
    moveContent: function () {

        var self = this;

        mousewheelEvent(self.$box[0], function (e) {

            e.stopPropagation();
            e.preventDefault();

            if (self.isRolling || -self.xMax > 0) {
                return;
            }

            self.isRolling = true;

            self.xTop += e.delta * self.unitLength;

            // 超范围修正
            if (self.xTop > 0) {
                self.xTop = 0;
            }
            if (self.xTop < -self.xMax) {
                self.xTop = -self.xMax;
            }

            self.moveNav();

        });

    },
    moveNav: function () {

        var self = this;

        self.$content.animate({
            'margin-top': self.xTop + 'px'
        }, 20, function () {
            self.isRolling = false;
        });

        var __top = Math.ceil((self.xTop / -self.xMax) * self.barMax);

        self.barTop = __top;

        self.$bar.animate({
            top: self.barTop + 'px'
        }, 20);

    }
}

module.exports = scrollBar;