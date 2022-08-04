---
title: 前端对时间utc的处理
tags:
  - 技术
categories:
  - 技术
  - 前端
comments: true
hide: false
date: 2022-08-04 10:35:29
permalink:
index_img:
---

## 背景

​	海外业务在时间上可能会显示当地时间，而后端一般存在库里的是零时区的时间，在前端展示时需要对0时区时间进行处理，展示正确的时间

## 使用

Demo1: 后端返回的是时间戳 `1658825542000`

Demo2: 后端返回的是时间字符串 `2022-07-26 08:52:22`

demo1和demo2都是0时区的时间（即utc时间）

1. 转换为固定时区的时间，如尼日利亚 （1时区），北京（8时区）
2. 转换为页面时区的时间，如尼日利亚 （1时区），北京（8时区）

### [dayjs](https://day.js.org/docs/zh-CN/installation/node-js)

> 注意：dayjs需要引入`utc`插件
>
> 如果后端返回的不是常规的时间格式，需要引入`customParseFormat`去解析时间后再做处理

- [dayjs-utc](https://day.js.org/docs/zh-CN/manipulate/utc#docsNav)

  ```js
  dayjs().format() //2019-03-06T08:00:00+08:00
  dayjs().utc().format() // 2019-03-06T00:00:00Z
  ```
  
- [dayjs-offset](https://day.js.org/docs/zh-CN/manipulate/utc-offset)

  - 获取 UTC 偏移量 (分钟)

  - 如果输入在-16到16之间，会将您的输入理解为小时数而非分钟。

  

```js
// 引入依赖
import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const timeStamp = 1658825542000
const timeStr = '2022-07-26 08:52:22'
```

```js
// 时区枚举
const Timezone = {
  Nigeria: 1,
  China: 8
};

// 如果时间格式是时间戳，需要使用dayjs.utc(timeStamp)去处理时间戳
// 否则会被解析为当前时间
export function zeroToFixedTimezone1(timeStamp, timezone, format = "MMM DD,YYYY HH:mm:ss") {
  return dayjs.utc(timeStamp) // 注意！！！
    .add(timezone, "hour")
    .format(format);
}

// 如果时间格式是时间字符，使用dayjs.utc(timeStr)和dayjs(timeStr)是一样的结果
export function zeroToFixedTimezone2(timeStr, timezone, format = "MMM DD,YYYY HH:mm:ss") {
  return dayjs(timeStr) // 或者dayjs.utc(timeStr)
    .add(timezone, "hour")
    .format(format);
}

export function utcOffsetDate(date, format = "MMM DD,YYYY HH:mm:ss") {
  const utcOffset = dayjs().utcOffset();
  return dayjs.utc(date).add(utcOffset, "m")
    .format(format);
}

zeroToFixedTimezone1(1658825542000, Timezone.Nigeria) // Jul 26,2022 09:52:22
zeroToFixedTimezone2(1658825542000, Timezone.Nigeria) // Jul 26,2022 17:52:22 //!!!错误用法 北京时间 相当于比0时区大了9个小时，比尼日大了8个小时
zeroToFixedTimezone2('2022-08-26 08:52:22', Timezone.Nigeria) // Jul 26,2022 09:52:22

utcOffsetDate(1658825542000) // Jul 26,2022 16:52:22  北京时间 相当于比0时区大了8个小时
utcOffsetDate('2022-08-26 08:52:22') // Jul 26,2022 16:52:22 北京时间 相当于比0时区大了8个小时

```



### [moment](http://momentjs.cn/docs/)

- [moment-utc](http://momentjs.cn/docs/#/parsing/utc/)

- [moment-offset](http://momentjs.cn/docs/#/manipulating/utc-offset/)

  ​	此函数返回 UTC 的实际偏移量，而不是反向偏移量（类似 `Date.prototype.getTimezoneOffset` 返回的）

```js
import moment from 'moment'
// 类似dayjs,但是不需要安装插件

// 时区枚举
const Timezone = {
  Nigeria: 1,
  China: 8
};

// 如果时间格式是时间戳，需要使用dayjs.utc(timeStamp)去处理时间戳
// 否则会被解析为当前时间
export function zeroToFixedTimezone1(timeStamp, timezone, format = "MMM DD,YYYY HH:mm:ss") {
  return moment.utc(timeStamp) // 注意！！！
    .add(timezone, "hour")
    .format(format);
}

// 如果时间格式是时间字符，使用dayjs.utc(timeStr)和dayjs(timeStr)是一样的结果
export function zeroToFixedTimezone2(timeStr, timezone, format = "MMM DD,YYYY HH:mm:ss") {
  return moment(timeStr) // 或者dayjs.utc(timeStr)
    .add(timezone, "hour")
    .format(format);
}

export function utcOffsetDate(date, format = "MMM DD,YYYY HH:mm:ss") {
  const utcOffset = moment().utcOffset();
  return moment.utc(date).add(utcOffset, "m")
    .format(format);
}

zeroToFixedTimezone1(1658825542000, Timezone.Nigeria) // Jul 26,2022 09:52:22
zeroToFixedTimezone2(1658825542000, Timezone.Nigeria) // Jul 26,2022 17:52:22 //!!!错误用法 北京时间 相当于比0时区大了9个小时，比尼日大了8个小时
zeroToFixedTimezone2('2022-08-26 08:52:22', Timezone.Nigeria) // Jul 26,2022 09:52:22

utcOffsetDate(1658825542000) // Jul 26,2022 16:52:22  北京时间 相当于比0时区大了8个小时
utcOffsetDate('2022-08-26 08:52:22') // Jul 26,2022 16:52:22 北京时间 相当于比0时区大了8个小时

```



### 原生js

反向偏移量`Date.prototype.getTimezoneOffset`跟 dayjs和moment是相反的

`Date.getTimezoneOffset`是分钟为单位的

## 坑

时间戳： 如果时间格式是时间戳，需要使用`dayjs.utc(timeStamp)`去处理时间戳

时间字符串： 如果时间格式是时间字符，使用`dayjs.utc(timeStr`)和`dayjs(timeStr)`是一样的结果

**最好的方案**：都使用`dayjs.utc(date)`去解析时间





