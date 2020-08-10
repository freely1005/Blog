---
title: mysql查询语句
date: 2019-09-01
sidebar: auto
tags: 
 - mysql
categories:
 - 数据库
---

> 本文主要介绍mysql的一些简单查询函数
>
> 正确的使用sql可以有效的较低数据库压力


# 常用sql函数

## MySQL 查询某字段的多条结果展示成按逗号隔开
``` sql
select group_concat(tel) from tt  
```