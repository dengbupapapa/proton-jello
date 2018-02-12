# ui 使用/开发文档

## 样式

因为 `proton-parser-less-import` 解析插件的，所有 `less` 文件都把 `public/components/ui/mixins` 文件夹下面的 `less` 导入当前 `less` 文件，导入顺序按照文件排名。

### 基础样式

`reset.less` 重置左右标签的样式，内外边距都归零等。人人平等。

> 为了对IE的兼容，`box-sizing` 属性值为默认值。

计算数据的时候要多费心了。

---

`type.less` 基础的样式，例如H系列的标签、文字方向、颜色、背景色等。

样式权重都比较低，很容易就被覆盖或覆盖不了，对于一些继承下来的样式，可能会无效。

`a` 链接会有 `visited` 样式。

``` html
<div class="demo-box">

    <h2 class="demo-title">h1 ~ h6</h2>

    <h1>标题 H1
        <span class="small">悄悄话</span>
    </h1>
    <h2>标题 H2
        <span class="small">悄悄话</span>
    </h2>
    <h3>标题 H3
        <span class="small">悄悄话</span>
    </h3>
    <h4>标题 H4
        <span class="small">悄悄话</span>
    </h4>
    <h5>标题 H5
        <span class="small">悄悄话</span>
    </h5>
    <h6>标题 H6
        <span class="small">悄悄话</span>
    </h6>

</div>
<div class="demo-box">

    <h2 class="demo-title">text-align</h2>

    <p class="text-left">文字左对齐</p>
    <p class="text-center">文字中间对齐</p>
    <p class="text-right">文字右对齐</p>

</div>

<div class="demo-box">

    <h2 class="demo-title">文字颜色</h2>

    <p class="text-primary">文字 primary 颜色
        <a href="/23" class="text-success">链接 success 颜色</a>
    </p>
    <p class="text-success">文字 success 颜色
        <a href="/32" class="text-primary">链接 primary 颜色</a>
    </p>
    <p class="text-warning">文字 warning 颜色
        <a href="/32" class="text-danger">链接 danger 颜色</a>
    </p>
    <p class="text-danger">文字 danger 颜色
        <a href="/32" class="text-warning">链接 warning 颜色</a>
    </p>

</div>

<div class="demo-box">

    <h2 class="demo-title">背景颜色</h2>

    <p class="bg-primary">背景颜色 是 primary
        <a href="/32">链接</a>
    </p>
    <p class="bg-success">背景颜色 是 success
        <a href="/32">链接</a>
    </p>
    <p class="bg-warning">背景颜色 是 warning
        <a href="/32">链接</a>
    </p>
    <p class="bg-danger">背景颜色 是 danger
        <a href="/32">链接</a>
    </p>

</div>
```

### 栅格布局

`grid.less` 简易版 `栅格布局`。

每个 `col` 没有左右内边距，所以需要在内部再添加一个 `div` 实现边距。

`col` 也会配合后面的表单使用。

`col` 共分为 12 份，不支持响应式。

```html
<div class="demo-box">
    <h2 class="demo-title">row col</h2>

    <div class="row">
        <div class="col-1 bg-warning">col-1</div>
        <div class="col-11 bg-primary">col-11</div>
    </div>

    <div class="row">
        <div class="col-11 offset-1 bg-danger">col-11</div>
    </div>
</div>
```

### 表格/列表

`table.less` 列表、表格 按照设计图做的

表格的话，只需要 `<table class="table table-bordered">`

```html
<div class="demo-box">

    <h2 class="demo-title">列表 无边框</h2>

    <table class="table">
        <colgroup>
            <col width="10%">
            <col width="30%">
            <col>
            <col width="10%">
        </colgroup>
        <thead>
            <tr>
                <th>序号</th>
                <th>名称</th>
                <th>备注</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="text-primary">1</td>
                <td class="text-left">这里是一个名称</td>
                <td>备注什么，不写了</td>
                <td>
                    <a href="/">编辑过了</a>
                    <a href="/">编辑过了</a>
                </td>
            </tr>
            <tr>
                <td class="text-danger">1</td>
                <td class="text-right bg-danger">这里是一个名称</td>
                <td>备注什么，不写了</td>
                <td>
                    <a href="/3">编辑</a>
                </td>
            </tr>
            <tr>
                <td>1</td>
                <td>这里是一个名称</td>
                <td>备注什么，不写了</td>
                <td>
                    <a href="/32">编辑</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

### 表单

`form.less` 表格相关

统一输入框的样式，`form-input` 就可以在任意地方使用。

单选、多选需要注意，每个选项需要用 `label` 包裹，`<label><input type="checkbox" name="1">选项</label>` ，点击文字也会激活选项。另外，配合表单的样式，还要被 `form-checkbox` 包裹一下。

```html
<div class="demo-box">
    <p>
        <!-- 普通输入框 -->
        <input class="form-input" type="text" placeholder="输入框">
    </p>
    <p>
        <!-- 禁用 -->
        <input class="form-input" type="text" disabled value="disabled">
    </p>
    <p>
        <!-- 只读 -->
        <input class="form-input" type="text" readonly value="readonly">
    </p>
    <p>
        <textarea class="form-input"></textarea>
    </p>
    <p>
        <select class="form-input" name="">
            <option value="">323</option>
            <option value="">323</option>
        </select>
    </p>
    <p>
        <span class="form-checkbox">
            <label>
                <input type="checkbox" name="1">什么跟什么</label>
        </span>
        <span class="form-checkbox">
            <label>
                <input type="checkbox" name="1">什么跟什么</label>
        </span>
    </p>
    <p>
        <span class="form-checkbox">
            <label>
                <input type="radio" name="2">什么跟什么</label>
        </span>
        <span class="form-checkbox">
            <label>
                <input type="radio" name="2">什么跟什么</label>
        </span>
    </p>
</div>
```

表单组合使用。

`form-group` 与 `row` 用法一致。

```html
<div class="demo-box">
	<!-- 一行一个输入项 -->
	<div class="form-group">
		<div class="col-2">
			<!-- 默认文字右对齐 -->
			<div class="input-label">这是什么呢</div>
		</div>
		<div class="col-10">
			<!-- 输入框默认宽 加上 hundred 就全占满 -->
			<input class="form-input" type="text">
		</div>
	</div>
	<!-- 一行两个或多个输入项 -->
	<div class="form-group">
		<div class="col-2">
			<div class="input-label">这是什么呢</div>
		</div>
		<div class="col-4">
			<input class="form-input hundred" type="text">
		</div>
		<div class="col-2">
			<div class="input-label">这是什么呢</div>
		</div>
		<div class="col-4">
			<input class="form-input hundred" type="text">
		</div>
	</div>
</div>
```

表单需要做验证规则

```html
<div class="demo-box">
	<form class="validate-form">
		<div class="form-group">
			<div class="col-2">
				<!-- 必填需要加 input-required -->
				<div class="input-label input-required">用户名</div>
			</div>
			<div class="col-4">
				<!-- jQuery.validate 控件上有 required 会添加必填规则 -->
				<input class="form-input" type="text" name="userName" required>
			</div>
			<div class="col-2">
				<div class="input-label input-required">昵称</div>
			</div>
			<div class="col-4">
				<input class="form-input" type="text" name="nickname" required>
			</div>
		</div>
		<div class="form-group">
			<div class="col-2">
				<div class="input-label input-required">性别</div>
			</div>
			<div class="col-10">
				<!-- 涉及多个选项，把错误信息放到最后一个 -->
				<!-- 用 j-validate-group 包裹所有的选项 -->
				<div class="j-validate-group">
					<span class="form-checkbox">
						<label>
							<!-- 用 j-validate-group-item 表示每个选项 -->
							<input class="j-validate-group-item" type="radio" name="sex" value="1" required>男
						</label>
					</span>
					<span class="form-checkbox">
						<label>
							<!-- 用 j-validate-group-item 表示每个选项 -->
							<input class="j-validate-group-item" type="radio" name="sex" value="0" required>女
						</label>
					</span>
				</div>
			</div>
		</div>
	</form>
</div>
```

### 按钮/按钮组

`button.less` 按钮相关

可以使用在 `a`、`input`、`button` 标签上面。

宽度自适应，不固定。

共四个颜色，默认、success、danger、warning

```html
<div class="demo-box">
	<p>
	    <a href="javascript:void(0);" class="button">按钮</a>
	    <button type="button" class="button">按钮</button>
	    <input type="button" class="button" value="按钮">
	</p>
	<p>
		<!-- 默认为空心按钮 -->
	    <button type="button" class="button">button</button>
	    <!-- 加上 button-fill 变实心 -->
	    <button type="button" class="button button-fill">button</button>
	</p>
	<p>
	    <button type="button" class="button button-success">button-success</button>
	    <button type="button" class="button button-success button-fill">button-success</button>
	</p>
	<p>
	    <button type="button" class="button button-danger">button-danger</button>
	    <button type="button" class="button button-danger button-fill">button-danger</button>
	</p>
	<p>
	    <button type="button" class="button button-warning">button-warning</button>
	    <button type="button" class="button button-warning button-fill">button-warning</button>
	</p>
</div>
```

按钮组

```html
<div class="demo-box">
	<!-- 按钮居中对齐 -->
	<div class="buttons-row text-center">
	    <button type="button" class="button">取消</button>
	    <button type="button" class="button button-fill">保存</button>
	</div>
	<!-- 按钮右对齐 -->
	<div class="buttons-row text-right">
	    <button type="button" class="button">取消</button>
	    <button type="button" class="button button-fill">保存</button>
	</div>
	<!-- 默认左对齐 -->
	<div class="buttons-row">
	    <button type="button" class="button">取消</button>
	    <button type="button" class="button button-fill">保存</button>
	</div>
</div>
```

Tab切换样式

```html
<div style="padding: 20px;">
    <div class="buttons-tab">
        <button type="button" class="button">tab1</button>
        <button type="button" class="button active">tab2</button>
        <button type="button" class="button">tab3</button>
        <button type="button" class="button">tab4</button>
    </div>
    <div class="demo-box" style="margin: 0;">
        2323
    </div>
</div>
```

### 分页

```html
<div class="demo-box">
    <div class="pagination">
        第 1/10 页 每页 9 项 共 0 项
        <ul class="pages">
            <li class="jump first"></li>
            <li class="jump prev"></li>
            <li class="page active" data-page="1">1</li>
            <li class="page" data-page="2">2</li>
            <li class="page" data-page="3">3</li>
            <li class="jump next"></li>
            <li class="jump last"></li>
        </ul>
        <input type="text" class="input" />
        <button type="button" class="button">跳转</button>
    </div>
</div>
```

### 进度条

```html
<div class="demo-box">
    <div class="progress">
        <div class="progress-bar" style="width: 20%;">
            20%
        </div>
    </div>
</div>
```

## 插件

> 普通变量 驼峰命名规则。
> 插件、类 变量名称首字母大写。
> 静态数据、常量 全部大写，多个单词使用 `_` 连接。
> jQuery 对象 变量名称加 `$`。

### 基本模块加载

`mod.js` 作为一个模块加载器，仅仅只是能解析模块化写的。

模块的加载是在 `fis` 处理的，把资源引入已写入 `Velocity` 模板中。

先加载 `mod.js`，在全局环境中定义 `require`、`define` 两个变量，后续模块化的代码文件使用 `define` 定义、导出变量，每个模块导出的数据都存放在 `factoryMap` 中。假若加载的文件不是模块化的文件，就会报错(141行)，但有时候我们需要加载一些非模块化的文件，就注释了。

所以 `mod.js` 只是解析文件，如何加载的问题都是由 `fis` 完成的。

### utils 工具函数集合

把常用、公共的函数写到一个文件里面。

> var Utils = require('public/components/utils/utils');

|函数名  |备注  |
|:-----|:---|
|getNextIndex  |获取下一个弹出层zIndex  |
|getDBNum  |两位以上的数字  |
|getParam  |键值对字符串转换为对象 同键名转为数组  |
|getUrlParam  |把URL中的参数转换为对象  |

### 表单验证

使用的是 `jquery.validate` 插件，一个非模块化(非mod模块化)的文件。

`jquery.validate.extend` 对默认规则汉化，以及添加一些默认的配置项。

> require('public/lib/jquery/jquery.validate');
> require('public/lib/jquery/jquery.validate.extend');

```javascript
// 默认配置项
$.validator.setDefaults({
    errorClass: 'error-tips',
    errorElement: 'span',
    onkeyup: false,
    errorPlacement: function ($error, $element) {
        if ($element.hasClass('j-validate-group-item')) {
            $error.appendTo($element.parents('.j-validate-group'));
        } else {
            $error.appendTo($element.parent());
        }
    }
})
```

使用方式

```javascript
require('public/lib/jquery/jquery.validate');
require('public/lib/jquery/jquery.validate.extend');

var $jValidateForm = $('#j-validate-form');

$jValidateForm.validate();

$('#j-validate-form-submit').on('click', function() {
    console.log($jValidateForm.valid());
});
```

### 滚动条

滚动条，目前只支持 `Y` 轴。

> var ScrollBar = require('public/components/scroll-bar/scroll-bar');

入参

* `$box` 表示内容容器的 `jQuery` 对象
* `$content` 表示内容的 `jQuery` 对象

```html
<!-- 内容容器，固定一个高度 -->
<div id="nav-sidebar">
	<!-- 内容区域 -->
	<ul class="nav-sidebar-content"></ul>
</div>
```

```javascript
var ScrollBar = require('public/components/scroll-bar/scroll-bar');
var $navSidebar = $('#nav-sidebar');
new ScrollBar({
    $box: $navSidebar,
    $content: $navSidebar.find('.nav-sidebar-content')
});
```

### popup 弹出层

最基础的弹层组件。

> var Popup = require('public/components/popup/popup');

依赖 `Utils`

入参

* html 表示会被显示出来的内容
* [close] 弹出层中点击关闭的选择器

实例方法

* show 显示 popup
* hide 隐藏 popup

实例属性

* $box 整个弹出层DOM `jQuery` 对象

> 每次关闭弹出层，都会把弹出层的 `scrollTop` 回到 0。

```html
<!-- popup html结构 -->
<div class="popup">
	<div class="popup-overlay"></div>
	<!-- 自定义显示内容 -->
	<div class="card" style="width: 600px; padding: 20px; margin: 20px auto;">
		这是什么
		<div class="buttons-row text-center">
			<button type="button" class="button button-fill">关闭</button>
		</div>
	</div>
</div>
```

```javascript
var Popup = require('public/components/popup/popup');
var a = new Popup({
    html: '<div class="card" style="width: 600px; padding: 20px; margin: 20px auto;">这是什么<div class="buttons-row text-center"><button type="button" class="button button-fill">关闭</button></div></div>',
    close: '.button-fill'
});

$('#j-poppup-a').on('click', function () {
    a.show();
})
```

### loading 加载弹出层

加载动画弹出层。

> var loading = require('public/components/loading/loading')();

依赖 `popup`

动画效果依赖 `CSS3`，在某些浏览器上可能会奔溃。

返回一个完整的 `popup` 实例。

```javascript
var loading = require('public/components/loading/loading')();

$('#j-loading-a').on('click', function () {
    loading.show();

    setTimeout(function () {
        loading.hide();
    }, 5000);
})
```

### modal 对话框

对话框弹窗层。

> var Modal = require('public/components/modal/modal');

依赖 `poppup`

入参

* title 弹窗标题
* body
* [okCallBack] 点击确定的回调函数
* [noCallBack] 点击取消的回调函数

实例方法

* show 显示弹出层
* hide 隐藏弹出层

实例属性

* $box 整个弹出层DOM `jQuery` 对象 引用 `popup` 的 `$box`

点击确定、取消弹窗立即消失，不支持异步后关闭。

```javascript
var Modal = require('public/components/modal/modal');
var ModalA = new Modal({
    title: '测试一下标题',
    body: '<p>什么</p><div style="height: 4000px;"></div><p>结束</p>',
    okCallBack: function () {
        console.log('ok');
    }
});
$('#j-modal-a').on('click', function () {
    ModalA.show();
})
```

### tips 提示弹窗

多种样式的提示弹窗。

> var Tips = require('public/components/tips/tips');

依赖 `Utils`

> Tips(text, [time], [type])

* text 显示在弹层中的文字
* [time] 弹出层存在的时间 默认 3000
* [type] 弹出层的样式 默认 info


```javascript
var Tips = require('public/components/tips/tips');
var getText = function () {
    var __num = Math.floor(Math.random() * 10);
    var __text = '一句话是多少';
    for (var i = 0; i < __num; i++) {
        __text += '，没多少';
    }
    return __text;
}

$('#j-tips-a').on('click', function () {
    Tips(getText(), 3000, 'success');
    Tips(getText(), 3000, 'warning');
    Tips(getText(), 3000, 'info');
    Tips(getText(), 3000, 'error');
})
```