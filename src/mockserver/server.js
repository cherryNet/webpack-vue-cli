let express = require('express');

let app = express();

app.get('/users',(req,res)=>{
    res.json({
        username:'罗翔',
        age:40
    })
})

app.listen(4000,()=>{
    console.log('服务器已启动，4000端口监听中');
})