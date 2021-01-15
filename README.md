# @free-kits/dt-doc

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b4cae52220c4433a8d8b813cf50433ad)](https://app.codacy.com/gh/free-kits/doc?utm_source=github.com&utm_medium=referral&utm_content=free-kits/doc&utm_campaign=Badge_Grade)[![codecov](https://codecov.io/gh/free-kits/dt-doc/branch/canary/graph/badge.svg?token=ZX8NIV3186)](https://codecov.io/gh/free-kits/dt-doc)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ffree-kits%2Fdt-doc.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ffree-kits%2Fdt-doc?ref=badge_shield)

## 介绍

基于 Webpack 的文档工具可以帮助开发 React 库以及编写组件文档。

特征

- 🌈 开箱即用，专注于 React 组件库以及文档开发
- ✍ 强大的 Markdown 扩展，支持流程图和公式，以及代码演示，不依赖外部环境。
- 🐱‍🏍 高性能, 基于 Webpack 5 构建

## 使用手册说明

采用约定路由进行声明, 启动的时候会扫描所有`md`或者 `mdx`的文档. 并自动生成对应的路由信息.

生成规则如下

先扫描当前`md` 或者 `mdx` 文件中的头部信息

例子

```md
<!--
nav:
    title: 组件
group:
    title: 基础组件
title: Button 按钮
-->

## 这是一个测试的 md 文件

这是一些少许的文件信息
```

这里是常用的一些属性说明

- nav 表示生成导航条上的按钮信息
  - title 表示标题
- group 表示当前左侧的菜单信息
  - title 表示当前分组的名称
- title 表示当前在右侧显示的菜单信息

## 致谢

- 软件灵感来自于 [https://github.com/umijs/dumi](https://github.com/umijs/dumi)
- 页面设计风格来自于[https://material.io/](https://material.io/)
- 首页图片采用[https://web.dev/](https://web.dev/)
- 感谢所有在packages.json中的依赖库

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ffree-kits%2Fdt-doc.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ffree-kits%2Fdt-doc?ref=badge_large)
