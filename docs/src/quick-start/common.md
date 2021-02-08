<!--
nav:
    title: 文档
group:
    title: 入门
order: 1000
title: CLI 参数
-->

# CLI

|启动命令参数                | 描述
|-------                    |----------
|fk-rmake dev-doc           | 启动开发文档信息资料
|fk-rmake build-doc         | 构建文档资料信息
|fk-rmake build-electron    | 构建 electron 的跨平台应用
|rk-rmake build-electron    | 编译 electron 的二进制分发文件, 同时会构建 linux window macos 三个平台的二进制文件

> 用户将 `devDependencies` 安装到本地依赖的时候， 即可使用 `fk-rmake` 的命令

```json
{
    "name": "normal",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "private": true,
    "scripts": {
        "start": "fk-rmake dev-doc"
    },
    "devDependencies": {
        "@free-kits/rmake": "file:../"
    },
    "dependencies": {
        "react": "^17.0.1",
        "react-dom": "^17.0.1"
    }
}
```

> 其文件路径如上，如果需要构建文档信息则使用 `fk-rmake build-doc`, 其他的仅仅只是参数的不同。
