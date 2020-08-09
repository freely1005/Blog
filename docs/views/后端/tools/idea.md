---
title: idea小技巧
date: 2019-07-18
sidebar: auto
tags: 
 - 开发工具
categories:
 - 后端
---

> 本文主要介绍idea的各种插件的运用
> 熟悉使用插件才能更快的编写代码

<!-- more -->

# 使用IDEA的Run Dashboard来运行SpringCloud应用
- win系统 可以点击 view——tool windows——Run Dashboard
- mac系统 需要打开.idea——workspacs.xml文件
```
<component name="RunDashboard"> 
    <option name="configurationTypes">
        <set> 
            <option value="SpringBootApplicationConfigurationType" />
        </set> 
    </option> 
    <option name="ruleStates"> 
        <list> 
            <RuleState> 
                <option name="name" value="ConfigurationTypeDashboardGroupingRule" /> 
            </RuleState> 
            <RuleState> 
                <option name="name" value="StatusDashboardGroupingRule" /> 
            </RuleState> 
        </list>
    </option> 
</component>
```
最后重启IDEA就会有Run Dashboard了。