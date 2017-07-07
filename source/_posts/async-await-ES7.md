---
title: async await ES7
date: 2016-07-07 10:57:03
tags: [ES7, js]
categories: study
description: ES7的async、await
---

## ES7之async、await

### 概念...

```
ES5 -> ECMAScript ECMAScript第五个版本
ES6 -> ECMAScript 2015
ES7 -> ECMAScript 2016 
```

so, what ECMAScript?

> https://en.wikipedia.org/wiki/ECMAScript
简言之，定制JavaScript标准的。

`It was created to standardize JavaScript, so as to foster multiple independent implementations.`

参考：

https://www.w3ctech.com/topic/1614

https://huangxuan.me/2015/09/22/js-version/?utm_source=caibaojian.com

### async/await示例

> async 是一个异步函数，await只能用在async函数内. 

```
await表示等待返回了promise对象后再继续执行；
await后面跟的是一个promise对象(其它返回值也可以，但是会立刻执行，无意义)
```

```js
//暂停
var sleep = function(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, time);
    });
};

//测试 start函数，顺序执行
var start = async function() {
    console.info("Start...");
    await sleep(3000); //暂停3s
    console.log("End...");
};
```

在浏览器控制台执行 `start();`，顺序输出 `Start...` 以及调用`sleep(3000)`后返回的promise对象，最后输出的是 `End...`

为了看清`await`函数功能，测试如下函数
```js
var start2 = function() {
    console.info("Start...");
    sleep(3000); //无await
    console.log("End...");
};
```
直接输出：`Start...` 和 `End...`

### async、await获得返回值

```js
var sleep = function(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (time < 2000) {
                reject("10000");
            } else {
                resolve("ok");
            }
        }, time);
    });
};

var test = async function() {
    let res = await sleep(3000);
    console.info(res);
    console.info("hehe");
};

var test2 = async function() {
    let res = await sleep(1000); //reject返回了一个错误
    console.log(res); //控制太执行显示的是 ”Uncaught (in promise) 10000“
    console.info("hehe");
};

// try catch 捕捉错误
var test3 = async function() {
    try {
        let res = await sleep(1000); //reject 错误
        console.log(res); // 只显示reject返回值，不会提示说是 "Uncaught"
        console.info("hehe"); //不会执行
    } catch (err) {
        console.error(err);
    }
};
```

引申：当需要顺序执行HTTP请求，需要根据第一个请求的返回然后执行后续的操作时，可以将请求封装一个Promise对象传给下一个处理函数(如这里的test)

```js
var httpRequest = function(URL) {
    return new Promise(function(resolve, reject){
        var x = $.ajax({
            type: "GET",
            url: URL,
        });
        /*
        x.done(function(res){
            if(res.error.returnCode == "0")
            resole(res.data);
            reject(res.error.returnCode);
        });
        */
        if(x)
            resolve(x);
        reject("10000");
    });
}

var req = async function() {
    try {
        console.log("开始请求");
        //var res = await httpRequest("http://www.baidu.com"); //因为在浏览器端存在跨域
        let res = await httpRequest("http://localhost/sites/JDBToolsPlatform/api/processQualityReport/reportDataDetail.php?beginDate=2017-06-01&endDate=2017-06-30");
        console.log(res); //获得返回的数据
        //console.log(typeof res); //返回的json类型：string
        //console.log(JSON.parse(res).error.returnCode); //获取返回状态码
        console.log("请求结束。。。");
    }catch (err) {
        console.log(err);
    }
};
```


### 异步函数

> 客户端fetch API, 一种替代 XMLHttpRequest 检索文件的方案.

```js
async function fetchJson(url) {
    try {
        let request = await fetch(url); //fetch函数返回的就是一个Promise对象
        let text = await request.text();
        return JSON.parse(text);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}
```

```js
var t = fetchJson("http://localhost/sites/JDBToolsPlatform/api/processQualityReport/reportDataDetail.php?beginDate=2017-06-01&endDate=2017-06-30");
// console.inf(typeof t); // "object" t是一个Promise对象

t.then(obj => console.log(obj)); //输出的json串
t.then(obj => console.log(obj.error)); //error信息
t.then(obj => console.log(obj.data)); //data信息
t.then(obj => function(){alert(obj.error);}());

```


