## velocity语法

基本的逻辑标签请查看[velocity 官方文档](http://velocity.apache.org/engine/devel/user-guide.html)。

### velocity宏

Velocity 里面，不像 smarty 一样，可以写 PHP 函数，不过，它有它自己的机制，比如宏的定义。一些重用且复杂的渲染逻辑，可以封装成 velocity 宏来处理。

**宏方法定义**
```velocity
#macro( tablerows $color $somelist )
#foreach( $something in $somelist )
    <tr><td bgcolor=$color>$something</td></tr>
#end
#end
```

**宏方法使用**
```velocity
#set( $greatlakes = ["Superior","Michigan","Huron","Erie","Ontario"] )
#set( $color = "blue" )
<table>
    #tablerows( $color $greatlakes )
</table>
```

**输出结果**
```html
<table>
    <tr><td bgcolor="blue">Superior</td></tr>
    <tr><td bgcolor="blue">Michigan</td></tr>
    <tr><td bgcolor="blue">Huron</td></tr>
    <tr><td bgcolor="blue">Erie</td></tr>
    <tr><td bgcolor="blue">Ontario</td></tr>
</table>
```

### velocity 全局变量

#### $request

通过它，可以知道当前页面请求，请求的参数是什么，或者知道当前请求头部是什么等等。

 ```velocity
## 请求 GET 参数 layout 是否等于 "right"
$request.getParameter("layout").equals("right")

## 是否是来源于 ajax 请求？
$request.getHeader("X-Requested-With").equals("XMLHttpRequest")
 ```
 
#### $jello
 
目前只实现了 `$jello.jsonEncode($variable)`，即：把 java 对象转换成 json。
 
#### velocity tools
 
`velocity tools`是 velocity 官方开发一系列帮助开发的工具集，jello 中默认集成了所有的 [GenericTools](http://velocity.apache.org/tools/devel/generic.html)


### 扩展标签

#### **#html()**

  代替`<html>`标签，设置页面运行的前端框架，以及控制整体页面输出。

  语法: `#html([$framework[, $attrs]])body #end`

  ```velocity

  #html("fis-site:static/js/mod.js", "lang", "zh")
  ...
  body content.
  ...
  #end
  ```

  **输出**

  ```html
  <html lang="zh">
  ...
  body content
  ...
  </html>
  ```
#### **#head()**

  代替`<head>`标签，控制CSS资源加载输出。

  语法: `#head([$attrs]) body #end`

  ```velocity
  #head()
  <meta charset="utf-8"/>
  #end
  ```
#### **#body()**

  代替`<body>`标签，控制JS资源加载输出。

  语法: `#body([$attrs]) body #end`

  ```velocity
  #html("static/lib/mod.js")
    #head()
    <meta charset="utf-8"/>
    #end

    #body()
        ...
    #end
  #end
  ```
#### **#script()**

  代替`<script>`标签，收集使用JS组件的代码块，控制输出至页面底部。

  语法: `#script([$attrs]) body #end`

  ```velocity
  #html("static/lib/mod.js")
    #head()
    <meta charset="utf-8"/>

      ## 通过script插件收集加载组件化JS代码
      #script()
      require.async("static/ui/B/B.js");

      console.log('here');
      #end
    #end

    #body()
        ...
    #end
  #end
  ```
  ```velocity
    ##  引入外部资源，非 FIS ID
    #script("//code.jquery.com/jquery-1.11.0.min.js")#end
  ```
#### **#style()**

  代替`<style>`标签，收集使用CSS组件的代码块，控制输出至页面头部。

  语法: `#style([$attrs]) body #end`

  ```velocity
  #html("static/lib/mod.js")
    #head
    <meta charset="utf-8"/>

      #style()
      @import url(xxx.css);

      body {
          color: #fff;
      }
      #end
    #end

    #body
        ...
    #end
  #end
  ```

#### **#require()**

  用来引入资源，不管是 JS 资源还是 CSS 资源，都统一通过 `#require()` 引入。

  语法: `#require( $uri )`

  ```velocity
  #html("static/lib/mod.js")
    #head()
    <meta charset="utf-8"/>

      ## 通过script插件收集加载组件化JS代码
      #script()
      require.async("static/ui/B/B.js");

      console.log('here');
      #end
    #end

    #body()
      #require("static/index/index.css")
    #end
  #end
  ```
#### **#widget()**

 页面中比较常用的小的部分，可以抽离成widget，比如：登陆框、头部菜单、边栏菜单等等
 
 抽离成小模板后，可以通过这样的方式引入页面的任意位置。

 语法: `#widget( $uri )`

 ```velocity
  #html("static/lib/mod.js")
    #head()
    <meta charset="utf-8"/>

      ## 通过script插件收集加载组件化JS代码
      #script()
      require.async("static/ui/B/B.js");

      console.log('here');
      #end
    #end

    #body()
      #require("static/index/index.css")
      #widget("widget/A/A.tpl")
    #end
  #end
  ```
  除了模板复用外，有时候变量也需要复用，在通过 #widget() 引入模板的时候，可以通过以下两种方式指定变量
  - `with` 将指定变量下面的所有属性做为 widget 中的局部变量使用
  - `var` 设置 widget 中局部变量
  
  ```velocity
  #widget("widget/sidebarmenus/sidebarmenus.vm" "with:$sidebar" "var:literal=字面量" "var:variable=$sidebar")
  ```
#### **#uri()**

  定位线上资源，允许跨模块(project)。与 `#require()` 的区别是，这个只会简单的输出路径，而不会引入此文件。

 语法: `#uri( $uri )`

 ```velocity
  #html("static/lib/mod.js")
    #head()
    <meta charset="utf-8"/>
    #end

    #body()
        #uri("static/css/bootstrap.css")
    #end
  #end
  ```