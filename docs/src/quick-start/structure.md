<!--
nav:
    title: 文档
group:
    title: 入门
title: 目录介绍
-->

# 结构介绍

以下详细介绍了当前项目的项目结构，以及对应的目录信息。

## 项目的目录信息如下

一个常规的项目结构

```shell
project
|- assets # 静态资源文件
├─.doc # 内部生成的代码，每次更新都会重新生成对应的信息
|   |-components
|   |-pages
|   |-config.ts
|   └─entry.tsx
|─src # 当前markdown的文件存放的路径
|─tsconfig.json # tsconfig.json
└─package.json  # npm 的 package.json
```

> 这是一个常规的文档目录。
