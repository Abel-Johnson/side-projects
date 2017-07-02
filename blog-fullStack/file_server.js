'use strict';

var
    mysql = require('mysql'),
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http'),
    root = path.resolve(process.argv[2] || '.');
var parseQuery = function(query){
    var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
    var obj = {};
    while(reg.exec(query)){
        obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
}


// 创建服务器:
var server = http.createServer(function (request, response) {
  var pathname = url.parse(request.url).pathname;
  var queryObj = url.parse(request.url,true).query;
  var method = request.method;
  // var requestId = queryObj.id
  console.log(pathname);
  if(/^\/blog/.test(pathname)) {
    var connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'test'
    })
    //带query
    if(method==='GET') {
      var sql = 'SELECT id,title,content from blog';
      connection.query(sql,function(err, results) {
        console.log(results);
        var res = JSON.stringify(results);
        response.writeHead(200);
        response.end(res);
      })     
    } else {
      
      var postData="";
      request.setEncoding('utf-8');
      var postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
      // 数据块接收中
      request.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
      });
      // 数据接收完毕，执行回调函数
      request.addListener("end", function () {
          console.log('数据接收完毕');
          console.log(postData);
          var params = parseQuery(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
          console.log('params'+params);
          var title = params.title;
          var content = params.content;
          // console.log(params["name"]);
          // PushToRedis(params["name"]);
          var sql = `INSERT INTO blog(title,content) values(?,?)`;
          var inserts = [title, content];  
          sql = mysql.format(sql, inserts);  

          console.log(sql);
          connection.query(sql, function(err, results) { 
            if(err) {
              throw err;
            }
            console.log(results);
          });
          response.writeHead(500, {
              "Content-Type": "text/plain;charset=utf-8"
          });
          response.end("数据提交完毕");
          connection.end();
      });
    }


  } else {
    var filepath = path.join(root, pathname);
      console.log(filepath);
      // 获取文件状态:
      fs.stat(filepath, function (err, stats) {
          if (!err && stats.isFile()) {
              // 没有出错并且文件存在:
              console.log('200 ' + request.url);
              // 发送200响应:
              response.writeHead(200);
              // 将文件流导向response:
              fs.createReadStream(filepath).pipe(response);
          } else {
              // 出错了或者文件不存在:
              console.log('404 ' + request.url);
              // 发送404响应:
              response.writeHead(404);
              response.end('404 Not Found');
          }
      });
  }
});


/*switch (pathname.test(//)) {
  case 'POST':
    var postData="";
    request.setEncoding('utf-8');
    var postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
    // 数据块接收中
    request.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    request.addListener("end", function () {
        console.log('数据接收完毕');
        console.log(postData);
        var params = parseQuery(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
        console.log(params);
        // console.log(params["name"]);
        // PushToRedis(params["name"]);
        response.writeHead(500, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        response.end("数据提交完毕");
    });
    break;

  default:
    console.log('idddddd'+requestId);

    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);
    console.log(filepath);
    // 获取文件状态:
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });

 break;
}

*/

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');