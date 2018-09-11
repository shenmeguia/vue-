const http = require('http');
const url = require('url');
const fs = require('fs');
const express = require('express');
const server = express();
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
server.get('/getnewslist',function(req,res,next) {
	//查询banner信息
	db.query(`SELECT * FROM newslist`,function (err,newsdata) {
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
				data:newsdata
			}));
		}
	});
});
server.get('/getnew/:id',function (req,res,next) {
	db.query(`SELECT * FROM newslist WHERE ID=${req.params.id}`,function (err,data) {
		if(err) {
			res.status(500).send('database error').end();
		}else {
			res.writeHead(200,{"content-type": "application/json;charset=utf-8"});
			res.end(JSON.stringify({
				code:0,
				msg:'成功',
				data:data
			}));
		}
	})
});
server.get('/getcomments/:id',function (req,res,next) {
	db.query(`SELECT * FROM newscomment`,function (err,data) {
		if(err) {
			res.status(500).send('database error').end();
		}else {
			var n = req.query.pageindex,//第几页，一页十条数据
				arr=[];
			for(var i = (n-1)*10; i <= n*10 - 1; i++) {
				if(i > data.length - 1) {
					break;
				}
				arr.push(data[i]);
			};
			res.writeHead(200,{"content-type": "application/json;charset=utf-8"});
			res.end(JSON.stringify({
				code:0,
				msg:'成功',
				data:arr
			}));
		}
	})
})