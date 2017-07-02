var mysql = require('mysql')
var connection = mysql.createConnection({
  user: 'root',
  database: 'test',
  host: 'localhost',
  port: 3306,
  password: ''
})

console.log(connection);

var userId = 2;

var sql = "SELECT ?? FROM ?? WHERE ?? = ?";  
var inserts = ['content','blog', 'id', userId];  
sql = mysql.format(sql, inserts);  


connection.query(sql, function(err, results) {  
  // ...
  console.log('sql1res:'+results);  
  console.log((results)[0].content);  
}); 


var insertContent = 'new content'
var sql2 = 'INSERT INTO blog(content) values("'+insertContent+'")'

connection.query(sql2, function(err, results) {  
  // ...
  console.log(err);
  console.log('sql2res:'+results);  
}); 