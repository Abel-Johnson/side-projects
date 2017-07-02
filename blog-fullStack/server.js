// //依赖一个http模块，相当于java中的import，与C#中的using
// var http = require('http');

// //创建一个服务器对象
// server = http.createServer(function (req, res) {
// //设置请求成功时响应头部的MIME为纯文本
// res.writeHeader(200, {"Content-Type": "text/plain"});
// //向客户端输出字符
// res.end("Hello World\n");
// });
// //让服务器监听本地8000端口开始运行
// server.listen(8000,'127.0.0.1');
// console.log("server is runing at 127.0.0.1:8000");\
'use strict';

// 导入http模块:
var http = require('http');

// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口:
server.listen(8080);


var path = require('path');

// 解析当前目录:
var workDir = path.resolve('.'); // '/Users/michael'

// 组合完整的文件路径:当前目录+'pub'+'index.html':
var filePath = path.join(workDir, '', 'index.html');
// '/Users/michael/pub/index.html'