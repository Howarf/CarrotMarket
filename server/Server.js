const express = require('express')
const app = express();
const port = 5000;
const user_info = require("./router/user_info");
const post = require("./router/post");
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use("/user_info", user_info);
app.use("/post", post);

app.get('/',(req,res)=>{
    res.send("test");
})

app.listen(port, ()=>{console.log(`myPort:${port}`)});