---
title: mac使用
date: 2019-07-18
sidebar: auto
tags: 
 - 小技巧
categories:
 - mac
---

> 本文主要介绍日常使用mac的技巧
> 熟悉使用系统才能有更快的生产力

<!-- more -->

# 快捷键
> 使用快捷键能提高下班时间

## 修改hosts
- 打开Finder 在菜单中选择【前往】【前往文件夹】
或使用快捷键Command+Shift+G
即可找到hosts


## 显示隐藏文件
- Command+Shift+.    可以显示隐藏文件、文件夹，再按一次，恢复隐藏；
finder下使用Command+Shift+G 可以前往任何文件夹，包括隐藏文件夹。

- 终端中显示
defaults write com.apple.finder AppleShowAllFiles -bool true;
KillAll Finder
这条命令来显示。同时，将 true 改成 false, 就可恢复隐藏状态。