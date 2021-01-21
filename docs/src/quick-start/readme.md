<!--
nav:
    title: 文档
group:
    title: 入门
title: 简介
-->

# 什么是 @freekits/doc ?

dt-doc, 文档工具, 它主要用通过 `markdown` 文件来生成文档信息.

> 这个站点就是基于 `@freekits/doc` 构建的

## 特性

- 📦 开箱即用, 将注意力集中文档编写上
- 📋 丰富的 Markdown 扩展
- 🏷 基于 TypeScript 类型定义，自动生成组件 API
- 🎨 主题轻松自定义，还可创建自己的 Markdown 组件

## 快速上手

首先得有 node，并确保 node 版本是 10.13 或最新.

```shell
$ node -v
v10.13.0
```

### 安装 @freekits/doc

如果用户使用 npm 则执行

```shell
npm install --save-dev @freekits/doc
# or
yarn add -D @freekits/doc
```

### 配置 packages.json 启动项目

修改当前项目中的packages.json文件, 启动命令 `freekits-doc dev` 例如

```json
{
    "name": "normal",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "private": true,
    "scripts": {
        "start": "freekits-doc dev"
    },
    "devDependencies": {
        "@freekits/doc": "file:../"
    },
    "dependencies": {
        "react": "^17.0.1",
        "react-dom": "^17.0.1"
    },
    "@freekits/dt-doc": {
        "title": "Free Kits Doc"
    }
}
```

执行 `yarn start` or `npm run start` 即可启动当前项目。

> 注意: 当前项目暂时不支持 yarn 2 也就是 yarn 的 berry 版本。
