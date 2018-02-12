# proton-jello

基于 fis3 针对 velocity 模板的前端工程解决方案。


## 安装

```
npm install -g @obc/proton-jello --registry=http://10.19.13.50:80
```

输入`pt -v` 输出fis的标识，说明安装成功


# 启动本地开发

```
npm start
```
# 发布

```
npm run build
```

# 获取mock数据
```
pt mock
```

# proton-jello 开发流程

首先确保已经安装成功

### 目录规范
    workspace
    	├── webapp
    	└── FESource
            ├── output
            ├── page
            │   ├── layout
            │   └── demo
            │       ├── demo.vm
            │       ├── demo.less
            │       └── demo.js
            ├── public
            │   ├── components
            │   ├── lib
            │   └── static
            ├── test
            │   ├── page
            │   └── ajax
            │── widget
            │    ├── footer
            │    │   ├── footer.vm
            │    │   ├── footer.less
            │    │   └── footer.js
            │    └── header
            ├── fis-conf.js
            └── server.conf

**说明**

- `webapp` 发布后生成的前端资源
- `FESource` 前端源码
	- `output` 开发阶段生成资源
	- `page` 用来存放各类页面级模板文件(.vm), 可以直接在jello 环境下预览。
    	- `layout` 骨架 vm
	- `public` 用来存放各类静态资源
    	- `components` ui组件（包含html、css(less)或js一体的组件）
    	- `lib` js库
    	- `static` 页面静态资源 (零散的复用资源)
	- `test` 用来存放各类测试数据
	- `widget` 用来存放页面服务器端渲染复用小片段组件，方便其它.vm引用
	- `fis-conf.js` 用来设置 fis 编译配置
	- `server.conf` 路由配置文件

注意保持`就近原则`，例如footer相关的模板、脚本、样式、图片等应都在widget/footer下存放，便于模块化管理



### 注意事项
1. 为了不用跨越几个顶级目录去查找vm对应的js、less，我们把同一页面下的专属js、less放在page子项同一同名目录下，因为fis设置了同名策略，只要保证vm、js、less同名，故可以隐式的载入资源。由于在fis配置中给页面专属js包裹了define，最后通过require执行.

		#script()
			require("./demo.js");
		#end
		
2. widget下的模块同上
3. components为ui复用组件目录，零散的复用代码片段写到static下
4. 所有页面基础公用`手写`less、js写到static/common下，entry会自动吸收它
5. 所有页面基础公用`第三方`less、js放到lib下，添加到fisconfig的deps-pack项数组中
6. less中的mixins variables自动import到各个less文件中，顾不需要手动引入
7. 各个样式的若涉及到 variables 请优先使用 variables，方便日后批量修改
8. 别名，另外需要自己在fisconfig里加

        packages: [{
            name: '@components',
            location: '/public/components',
        }, {
            name: '@lib',
            location: '/public/lib',
        }, {
            name: '@static',
            location: '/public/static',
        }]
9. node_modules 直接require模块名字

### yapi 项目建立

前后端的接口文档在 [yapi](http://yapi.obcwork.com) 上定义。为了保证良好的前后端分离开发，我们在着手写代码前，就要和后端确认好相关功能接口。

接口定好后，可以将接口录入到 yapi 系统中。yapi 账号相关问题，请联系`周强`。

### 接口录入

接口定义了异步请求和页面模板，如下：

1. 请求类型 ： `GET|POST`

2. 请求url ： `/page/home` 异步接口或页面访问路径

3. 调用方式 ： 不填写默认是ajax异步调用，当为页面模板数据时，填写模板路径`不含.vm`，例如渲染的模板是`/page/index.vm`，则填写`/page/index`


接口数据录入后，即可通过 `pt mock` 命令下载测试数据到本地，方便本地开发和调试

每次 yapi 系统接口有更新后，都需要运行 `pt mock` 获取最新的测试数据

使用`pt mock`后会新生成测试数据test（目录下的数据和page下的模板是同名依赖关系）和路由文件server.conf，注意先在fis-config.js里面确定好mockId，mockId与yapi上建立的项目id保持一致，不然拉不下来数据。

[mock数据语法](http://yapi.qunar.com/mock.html)

### UI组件文档

暂无

### velocity语法

[戳这里](velocity.md)

### 同名资源加载

构建工具已配置同名依赖加载策略`useSameNameRequire`，同文件夹下模板会依赖同名css、js；js 会依赖同名 css，不需要显式引用

## 本地开发查看效果

本地服务基于yapi的mock数据，输入项目根目录下的 `server.conf` 文件里相应的接口地址即可看到效果
若未录入yapi，也可直接输入模板路径查看页面效果

## 和后端联调

doing

## 后端整合

[戳这里](BE.md)

## 相关文档

* [fis3](http://fis.baidu.com/)
* [fis3-jello](https://github.com/fex-team/fis3-jello)
* [yapi](http://yapi.qunar.com/)

