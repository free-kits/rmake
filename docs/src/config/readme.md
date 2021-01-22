<!--
nav:
    title: 文档
group:
    title: 配置
title: 项目配置
-->

# 描述

所有的配置，都在 `package.json` 的 `@freekits/config` 字段中进行设置, 以下是对应的字段信息。

## title

类型 `string` 类型, 表示当前项目的标题信息是什么. 他会设置网页的 title 标签, 以及头部的title信息。

## meta

当前的网页的meta信息,参数类型为JSON类型

例如我想设置 JSON 如下

```json
{
    "@freekits/config": {
         "meta": {
             "key": "value"
         }
     }
}
```

会生成一下的html标签

`<meta name="key" content="value" />`

> JSON 的 key 表示 meta的 name信息，value表示content信息
