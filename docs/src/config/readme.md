<!--
nav:
    title: 文档
group:
    title: 配置
    order: 100
title: 项目配置
-->

# 描述

所有的配置，都在 `package.json` 的 `@free-kits/config` 字段中进行设置, 以下是对应的字段信息。

| 属性信息 | 类型    | 描述
|------    |-----   |--------
|title     |`string` | 描述当前项目的标题信息

## title

类型 `string` 类型, 表示当前项目的标题信息是什么. 他会设置网页的 title 标签, 以及头部的title信息。

## meta

当前的网页的meta信息,参数类型为JSON类型

例如我想设置 JSON 如下

```json
{
    "@free-kits/config": {
         "meta": {
             "key": "value"
         }
     }
}
```

会生成一下的html标签

```html
<meta name="key" content="value" />
```

> JSON 的 key 表示 meta的 name信息，value表示content信息

```jsx live=true
const Button = () => {
    return <button >点击查询 </button>
}
render(<Button />)
```

$$
a[i+1]=
\begin{cases}
a[i]+1&S[i]=\text{'a'}\\
a[i]& S[i]\neq\text{'a'}
\end{cases}
$$
