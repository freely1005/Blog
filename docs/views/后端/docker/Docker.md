---
title: docker容器
date: 2019-06-18
sidebar: auto
tags: 
 - 运维
categories:
 - 运维
---

> 本文主要介绍Docker安装ElasticSearch

<!-- more -->

# 1.查找镜像
```
docker search elasticsearch
```
## 2.拉取官方的镜像
```
docker pull elasticsearch:7.6.0
```
## 3.查看本地镜像列表
```
实体类使用不需要get set等
```

## 4.运行镜像
```
docker run --name elasticsearch -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.6.0
```
### 命令说明：
- -name : 镜像的名称
- -p 对外的端口
- -e "discovery.type=single-node"