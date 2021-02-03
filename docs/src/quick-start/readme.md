<!--
nav:
    title: 文档
group:
    title: 入门
title: 简介
-->

# 什么是 @free-kits/rmake ?

**@free-kits/rmake** 是用于做React的构建工具，用来构建文档。 或者构建项目

> 这个站点就是基于 `@free-kits/rmake` 构建的

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

## 使用脚手架

```shell
yarn create @free-kits/rmake
# or npm
npx @free-kits/rmake
```

> 按照问答的命令行方式进行预设项目的配置

## 手动构建项目

### 安装 @free-kits/rmake

执行 `npm init` 或者 `yarn init` 创建项目

安装依赖

```shell
npm install --save-dev @free-kits/rmake
# or
yarn add -D @free-kits/rmake
```

### 配置 packages.json 启动项目

修改当前项目中的packages.json文件, 启动命令 `fk-rmake dev` 例如

```json
{
    "name": "normal",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "private": true,
    "scripts": {
        "start": "fk-rmake dev"
    },
    "devDependencies": {
        "@free-kits/rmake": "file:../"
    },
    "dependencies": {
        "react": "^17.0.1",
        "react-dom": "^17.0.1"
    },
    "@free-kits/config": {
        "title": "Free Kits Doc"
    }
}
```

执行 `yarn start` or `npm run start` 即可启动当前项目。

> 注意: 当前项目暂时不支持 yarn 2 也就是 yarn 的 berry 版本。
