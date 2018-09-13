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
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
server.get('/getlunbo',function(req,res) {
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
server.get('/getnewslist',function(req,res) {
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
server.get('/getnew/:id',function (req,res) {
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
server.get('/getcomments/:id',function (req,res) {
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
});
server.post('/postcomment',function (req,res) {
	var str = '';
		req.on("data",function (chunk) {
			str += chunk;
		});
		req.on("end",function () {
			var data = JSON.parse(str),
				username = data.username,
				addtime = data.addtime,
				content = data.content;
			db.query(`INSERT INTO newscomment (username,addtime,content) VALUES('${username}','${
			addtime}','${content}')`,function (err,data) {
				if(err) {
					console.error(err);
					res.status(500).send('database error').end();
				}else {
					res.writeHead(200,{"content-type": "application/json;charset=utf-8"});
					res.end(JSON.stringify({
							code:0,
							msg:"增加成功！"
						}));
				}
			})
		});
});
server.get('/getimgcategory',function (req,res) {
	db.query(`SELECT * FROM categorys`,function (err,data) {
		if(err) {
			res.status(500).end('database error');
		}else {
			res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
			res.end(JSON.stringify({
				code:0,
				msg:'成功',
				data:data
			}))
		}
	})
});
server.get('/getimginfo/:id',function (req,res) {
	db.query(`SELECT * FROM imgs0 WHERE ID=${req.params.id}`,function (err,data) {
		res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
		res.end(JSON.stringify({
			code:0,
			msg:'成功',
			data:data
		}))
	});
});
server.get('/getthumbnail/:id',function (req,res) {
	db.query(`SELECT * FROM thumbnail`,function (err,data) {
		res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
		res.end(JSON.stringify({
			code:0,
			msg:'成功',
			data:data
		}))
	});
});
server.get('/getgoodslunbo/:id',function (req,res) {
	db.query(`SELECT * FROM goodslunbo`,function (err,data) {
		res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
		res.end(JSON.stringify({
			code:0,
			msg:'成功',
			data:data
		}))
	});
});
server.get('/goodslist',function (req,res) {
	db.query(`SELECT * FROM goodslist`,function (err,data) {
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
	});
});
server.get('/goodsinfo/:id',function (req,res) {
	db.query(`SELECT * FROM goodslist WHERE ID=${req.params.id}`,function (err,data) {
		res.writeHead(200,{"content-type": "application/json;charset=utf-8"});
		res.end(JSON.stringify({
			code:0,
			msg:'成功',
			data:data
		}));
	});
});
server.get('/getimgs/:id',function (req,res) {
	var id = req.params.id;
	switch (id) {
		case '0':
			db.query(`SELECT * FROM imgs0`,function (err,data) {
				res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
				res.end(JSON.stringify({
					code:0,
					msg:'成功',
					data:data
				}))
			});
			break;
		case '1':
			db.query(`SELECT * FROM imgs1`,function (err,data) {
				res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
				res.end(JSON.stringify({
					code:0,
					msg:'成功',
					data:data
				}))
			});
			break;
		case '2':
			db.query(`SELECT * FROM imgs2`,function (err,data) {
				res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
				res.end(JSON.stringify({
					code:0,
					msg:'成功',
					data:data
				}))
			});
			break;
		case '3':
			db.query(`SELECT * FROM imgs3`,function (err,data) {
				res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
				res.end(JSON.stringify({
					code:0,
					msg:'成功',
					data:data
				}))
			});
			break;
		case '4':
			db.query(`SELECT * FROM imgs4`,function (err,data) {
				res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
				res.end(JSON.stringify({
					code:0,
					msg:'成功',
					data:data
				}))
			});
			break;
		case '5':
			db.query(`SELECT * FROM imgs5`,function (err,data) {
				res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
				res.end(JSON.stringify({
					code:0,
					msg:'成功',
					data:data
				}))
			});
			break;
		case '6':
			db.query(`SELECT * FROM imgs6`,function (err,data) {
				res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
				res.end(JSON.stringify({
					code:0,
					msg:'成功',
					data:data
				}))
			});
			break;
		case '7':
			db.query(`SELECT * FROM imgs7`,function (err,data) {
				res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
				res.end(JSON.stringify({
					code:0,
					msg:'成功',
					data:data
				}))
			});
			break;
		case '8':
			db.query(`SELECT * FROM imgs8`,function (err,data) {
				res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
				res.end(JSON.stringify({
					code:0,
					msg:'成功',
					data:data
				}))
			});
			break;
		case '9':
			db.query(`SELECT * FROM imgs9`,function (err,data) {
				res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
				res.end(JSON.stringify({
					code:0,
					msg:'成功',
					data:data
				}))
			});
			break;
		case '10':
			db.query(`SELECT * FROM imgs10`,function (err,data) {
				res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
				res.end(JSON.stringify({
					code:0,
					msg:'成功',
					data:data
				}))
			});
			break;
		case '11':
			db.query(`SELECT * FROM imgs11`,function (err,data) {
				res.writeHead(200,{"content-type":"application/json;charset=utf-8"});
				res.end(JSON.stringify({
					code:0,
					msg:'成功',
					data:data
				}))
			});
			break;
	}
})