const express = require("express");
const route = express.Router();
const db = require("../config/db");
const multer = require('multer');
const uuid4 = require('uuid4');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img');
    },
    filename: function(req, file, cb){
        const randomId = uuid4();
        const ext = path.extname(file.originalname);
        const fileName = randomId + ext;
        cb(null, fileName);
    }
})
const upload = multer({storage:storage});

route.post('/upload', upload.array('postImg'), (req, res)=>{ 
    const id = req.body.id;
    const name = req.body.name;
    const title = req.body.title;
    const price = req.body.price;
    let img_url = '';
    for(const count of req.files){
        img_url = img_url + count.filename + ',';
    }
    const text = req.body.text;
    const sql = "INSERT INTO user_post (u_id, u_name, title, price, img_url, data) VALUES (?, ?, ?, ?, ?, ?);";
    const datas = [id, name, title, price, img_url, text];
    db.query(sql, datas, (err)=>{
        if(!err){
            res.send({'msg':'post 업로드 성공'});
        }else{
            res.send(err);
        }
    })
})

route.post('/checkPost', (req, res)=>{
    const postNum = req.query.postNum;
    const u_id = req.query.u_id;
    const sql = 'SELECT COUNT(*) AS result FROM user_post WHERE post_num = ? AND u_id = ?';
    const data = [postNum, u_id];
    db.query(sql, data, (err, data)=>{
        if(!err){
            res.send(data)
        }else{
            console.log(err);
        }
    })
})

route.post('/fixLoad', (req, res)=>{
    const postNum = req.query.postNum;
    const sql = 'SELECT title, price, img_url, data FROM user_post WHERE post_num = ?'
    db.query(sql, postNum, (err, data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    })
})

route.post('/fixPost', upload.array('postImg'), (req, res)=>{
    const title = req.body.title;
    const price = req.body.price;
    let img_url = '';
    for(const count of req.files){
        img_url = img_url + count.filename + ','; 
    }
    console.log(img_url);
    const text = req.body.text;
    const postNum = req.body.post_num;
    const sql = 'UPDATE user_post SET title = ?, price = ?, img_url = ?, data = ? WHERE post_num = ?;'
    const data = [title, price, img_url, text, postNum];
    db.query(sql, data, (err)=>{
        if(!err){
            res.send({'msg':'게시글을 수정하였습니다.'});
        }else{
            console.log(err);
        }
    })
})

route.get('/listLoad', (req, res)=>{
    const sql = 'SELECT * FROM user_post ORDER BY (post_num) desc;';
    db.query(sql, (err, datas)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(datas);
        }
    })
})

route.get('/popular', (req, res)=>{
    const sql = 'SELECT * FROM user_post ORDER BY (view) desc;';
    db.query(sql, (err, datas)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(datas.slice(0, 4));
        }
    })
})

route.get('/examList', (req, res)=>{
    const sql = 'SELECT * FROM user_post ORDER BY (post_num) desc;';
    db.query(sql, (err, datas)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(datas.slice(0, 3));
        }
    })
})

route.post('/detail', (req, res)=>{
    const post_num = req.query.num;
    const sql = 'SELECT * FROM user_post WHERE post_num = ?';
    db.query(sql, post_num, (err, data)=>{
        if(err){
            console.log(err);
        }
        else{
            if(data){
                res.send(data[0]);
                let addView = data[0].view + 1;
                const addSql = 'UPDATE user_post SET view = ? WHERE post_num = ?'
                const params = [addView, post_num]
                db.query(addSql, params, (err)=>{
                    if(err){console.log(err);}
                })
            }else{
                res.send({'msg':'등록된 게시물이 존재하지않습니다.'})
            }
        }
    })
})

route.post('/myPost', (req, res)=>{
    const u_id = req.query.id;
    const sql = 'SELECT post_num, u_id, title, price, img_url, view FROM user_post WHERE u_id = ?';
    db.query(sql, u_id, (err, data)=>{
        if(!err){ res.send(data); }
        else{ res.send(err); }
    })
})

route.post('/posts', (req, res)=>{
    const sql = 'SELECT * FROM user_post';
    db.query(sql, (err, data)=>{
        if(!err){ res.send(data); }
        else{ res.send(err); }
    })
})

route.post('/delet', (req, res)=>{
    const u_id = req.query.id;
    const num = req.query.num;
    const sql = 'DELETE FROM user_post WHERE u_id = ? AND post_num = ?';
    const data = [u_id, num];
    db.query(sql, data, (err)=>{
        if(!err){
            res.send({'msg':'게시물이 삭제되었습니다.'});
        }else{res.send(err);}
    })
})

module.exports = route;