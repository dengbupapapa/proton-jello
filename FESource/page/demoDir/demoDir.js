$.ajax({
    url: '/demomock'
});

// require('fis3-packager-deps-pack')

require('./reqdemo.less')
/**
 * 菜单栏 滚动条
 * @return {[type]} [description]
 */
// function navScroll() {
//     var ScrollBar = require('public/components/scroll-bar/scroll-bar');
//     var $navSidebar = $('#nav-sidebar');
//     new ScrollBar({
//         $box: $navSidebar,
//         $content: $navSidebar.find('.nav-sidebar-content')
//     });
// }

function poppupA() {

    var Popup = require('@components/popup/popup.js');
    var a = new Popup({
        html: '<div class="card" style="width: 600px; padding: 20px; margin: 20px auto;">这是什么<div class="buttons-row text-center"><button type="button" class="button button-fill">关闭</button></div></div>',
        close: '.button-fill'
    });

    $('#j-poppup-a').on('click', function() {
        a.show();
    })

}

// function loadingA() {

//     var loading = require('public/components/loading/loading')();

//     $('#j-loading-a').on('click', function() {
//         loading.show();

//         setTimeout(function() {
//             loading.hide();
//         }, 5000);
//     })

// }

// function tipsA() {

//     var Tips = require('public/components/tips/tips');
//     var getText = function() {
//         var __num = Math.floor(Math.random() * 10);
//         var __text = '一句话是多少';
//         for (var i = 0; i < __num; i++) {
//             __text += '，没多少';
//         }
//         return __text;
//     }

//     $('#j-tips-a').on('click', function() {
//         Tips(getText(), 3000, 'success');
//         Tips(getText(), 3000, 'warning');
//         Tips(getText(), 3000, 'info');
//         Tips(getText(), 3000, 'error');
//     })

// }

// function modalA() {

//     var Modal = require('public/components/modal/modal');
//     var ModalA = new Modal({
//         title: '测试一下标题',
//         body: '<p>什么</p><div style="height: 4000px;"></div><p>结束</p>',
//         okCallBack: function() {
//             console.log('ok');
//         }
//     });
//     $('#j-modal-a').on('click', function() {
//         ModalA.show();
//     })

// }

// function validateFormA() {

//     require('public/lib/jquery/jquery.validate');
//     require('public/lib/jquery/jquery.validate.extend');

//     var $jValidateForm = $('#j-validate-form');

//     $jValidateForm.validate();

//     $('#j-validate-form-submit').on('click', function() {
//         console.log($jValidateForm.valid());
//     });

// }

let a = {
    b: 1,
    c: 2,
    d: 3,
    e: 4
}

const {
    b
} = a;

console.log(b, a, 1, 123213);

let x = () => {
    console.log('x');
};
x();;
(function init() {
    // navScroll();
    poppupA();
    // loadingA();
    // tipsA();
    // modalA();
    // validateFormA();
})();