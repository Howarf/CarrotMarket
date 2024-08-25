const express = require("express");
const route = express.Router();
const db = require("../config/db");
const util = require('util');

route.post('/login', (req, res) =>{
  console.log(`= = =>req: ${util.inspect(req.query)}`);
  const user_id = req.query.user_id;
  const user_pw = req.query.user_pw;
  const sql1 = 'SELECT COUNT(*) AS result FROM user_info WHERE id = ?'
  db.query(sql1, user_id, (err, data) => {
    if(!err){
      if(data[0].result < 1){
        res.send({'msg': '입력하신 id가 일치하지않습니다.'});
      }else{
        const sql2 = `SELECT 
        CASE (SELECT COUNT(*) FROM user_info WHERE id = ? AND pw = ?) WHEN '0' THEN NULL ELSE (SELECT id FROM user_info WHERE id = ? AND pw = ?) END AS userId, 
        CASE (SELECT COUNT(*) FROM user_info WHERE id = ? AND pw = ?) WHEN '0' THEN NULL ELSE (SELECT pw FROM user_info WHERE id = ? AND pw = ?) END AS userPw,
        CASE (SELECT COUNT(*) FROM user_info WHERE id = ? AND pw = ?) WHEN '0' THEN NULL ELSE (SELECT name FROM user_info WHERE id = ? AND pw = ?) END AS userName`;
        const params = [user_id, user_pw, user_id, user_pw, user_id, user_pw, user_id, user_pw, user_id, user_pw, user_id, user_pw];
        db.query(sql2, params, (err, data) => {
          if(!err){
            res.send(data[0]);
            console.log(data[0]);
          }else{
            res.send(err);
          }
        })
      }
    }else{
      res.send(err);
    }
  })
})

route.post('/signUp', (req,res) =>{
  console.log(`= = =>req: ${util.inspect(req.query)}`);
  const id = req.query.id;
  const pw = req.query.pw;
  const name = req.query.name;
  const phone = req.query.phone;
  const sql1 = 'SELECT COUNT(*) AS result FROM user_info WHERE id = ?';
  db.query(sql1, id, (err, data) =>{
    if(!err){
      if(data[0].result >= 1){
        res.send("이미 존재하는 아이디입니다. 아이디를 바꿔주세요.");
      }
      else{
        const sql2 = 'INSERT INTO user_info VALUES(?, ?, ?, ?)';
        const datas = [id, pw, name, phone];
        db.query(sql2, datas, (err)=>{
          if(!err){
            res.send({'msg':'회원가입이 완료되었습니다.'});
          }
          else{
            res.send(err);
          }
        })
      }
    }
    else{res.send(err);}
  })
})

route.post('/checkUser',(req, res)=>{
  const id = req.query.id;
  const pw = req.query.pw;
  const info = [id, pw];
  const sql = 'SELECT COUNT(*) AS result FROM user_info WHERE id = ? AND pw = ?';
  db.query(sql, info, (err, data)=>{
    if(!err){
      if(data[0].result >= 1){
        res.send(true);
      }else{
        res.send(false);
      }
    }else{
      res.send(err);
    }
  })
})

route.post('/changeData', (req, res)=>{
  const id = req.query.id;
  const pw = req.query.pw;
  const name = req.query.name;
  const data = [pw, name, id];
  const sql = 'UPDATE user_info SET pw = ?, name = ? WHERE id = ?';
  db.query(sql, data, (err)=>{
    if(!err){
      res.send({'msg':'회원 정보가 변경되었습니다.\n다시 로그인해주세요.'});
    }else{
      res.send(err);
    }
  })
})

route.post('/secession', (req, res)=>{
  const id = req.query.id;
  const pw = req.query.pw;
  const info = [id, pw];
  const sql = 'DELETE FROM user_info WHERE id = ? AND pw = ?';
  db.query(sql, info, (err)=>{
    if(!err){
      res.send({'msg':'계정이 탈퇴되었습니다.'});
    }else{
      res.send(err);
    }
  })
})

module.exports = route;