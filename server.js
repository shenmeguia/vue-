const http = require('http');
const url = require('url');
const fs = require('fs');
const express = require('express');
var server = express();
const mysql = require('mysql');
const db = mysql.createPool({host:'localhost',user:'root',password:'123456',database:'blog'});
server.listen(8080);

//设置跨域访问
server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
}); 
server.get('/getlunbo',function(req,res,next) {
	//查询banner信息
	db.query(`SELECT * FROM banner_table`,function (err,banners) {
		if(err) {
			res.status(500).send('database error').end();
			res.writeHead(200,{"content-type": "application/json;charset=utf-8"});
			res.end(JSON.stringify({
				code:1,
				msg:'失败'
			}));
		}else {
			res.writeHead(200,{"content-type": "application/json;charset=utf-8"});
			res.end(JSON.stringify({
				code:0,
				msg:'成功',
				data:banners
			}));
		}
	});
});