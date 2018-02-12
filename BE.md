## 后端整合

### spring 整合

后端一般都是使用 spring 来开发，所以这里给出 spring 集成方式，其他运行模式请参考。关于 spring 整合的 [demo 可以看这里](https://github.com/fex-team/jello-spring-example)。

对于后端来说，只需关心前端输出的模板文件、静态资源和 map json文件。

默认的输出路径是：

* 模板文件： /templates/**.vm
* 静态资源： /static/**
* map json 文件：/WEB-INF/config/xxx-map.json

为了让 velocity 能正常渲染模板，需要设置模板目录，以及将 fis 提供的自定义 diretives 启动。
配置内容如下：

```xml
<bean id="velocityConfigurer" class="org.springframework.web.servlet.view.velocity.VelocityConfigurer">
    <property name="resourceLoaderPath" value="/WEB-INF/views/"/>
    <property name= "velocityProperties">
        <props>
            <prop key="input.encoding">utf-8</prop>
            <prop key="output.encoding">utf-8</prop>
            <!--启用 fis 提供的自定义 diretives 启动-->
            <prop key="userdirective">com.baidu.fis.velocity.directive.Html, com.baidu.fis.velocity.directive.Head, com.baidu.fis.velocity.directive.Body, com.baidu.fis.velocity.directive.Require, com.baidu.fis.velocity.directive.Script, com.baidu.fis.velocity.directive.Style, com.baidu.fis.velocity.directive.Uri, com.baidu.fis.velocity.directive.Widget, com.baidu.fis.velocity.directive.Block, com.baidu.fis.velocity.directive.Extends</prop>
        </props>
    </property>
</bean>
```

为了让 fis 自定义的 directive 能够正常读取 map.json 文件，需要添加一个 bean 初始化一下。

```xml
<!--初始 fis 配置-->
<bean id="fisInit" class="com.baidu.fis.velocity.spring.FisBean" />
```

默认 map json 文件是从 /WEB-INF/config 文件夹下读取的，如果有修改存放地址，则需要添加一个 fis.properties 文件到 /WEB-INF/ 目录。
内容如下：

```ini
# 相对与 WEB-APP 根目录。
mapDir = /velocity/config
```

fis 框架代码可以在[此下载](https://github.com/fex-team/fis-velocity-tools/releases)。所有代码开源在 [github](https://github.com/fex-team/fis-velocity-tools) 上。

### View Resolver 推荐配置

```xml
<bean id="viewResolver" class="org.springframework.web.servlet.view.velocity.VelocityViewResolver">
    <property name="cache" value="true"/>
    <property name="prefix" value=""/>
    <property name="suffix" value=".vm"/>
    <property name="cacheUnresolved" value="false" />
    <property name="exposeSpringMacroHelpers" value="true"/>
    <property name="contentType" value="text/html;charset=UTF-8" />
    <property name="requestContextAttribute" value="request" />
    <property name="exposeSessionAttributes" value="true" />
    <property name="attributesMap">
        <map>
            <entry key="esc"><bean class="org.apache.velocity.tools.generic.EscapeTool"/></entry>
            <entry key="render"><bean class="org.apache.velocity.tools.generic.RenderTool" /></entry>
            <entry key="link"><bean class="org.apache.velocity.tools.generic.LinkTool" /></entry>
            <entry key="context"><bean class="org.apache.velocity.tools.generic.ContextTool"/></entry>

            <entry key="jello"><bean class="com.baidu.fis.velocity.tools.JelloTool" /> </entry>
        </map>
    </property>
</bean>
```

### web.xml 配置

```xml
<listener>
    <listener-class>com.baidu.fis.servlet.MapListener</listener-class>
</listener>
```

> **注意** 

> `cacheUnresolved`一定要设置成false，否则会影响前端分开部署
> 另外这里只启用了部分 velocity tools, 其他 tools 请根据自己需求配置
