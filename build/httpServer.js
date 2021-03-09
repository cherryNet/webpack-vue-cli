let express = require('express')
let path = require('path')
let open = require('open')

let app = express();

// 托管静态资源目录 dist/
let distPath = path.join(__dirname,'../dist');

app.use(express.static(distPath))

const PORT = 8081;

app.listen(PORT,()=>{
    // 启动完毕之后打开服务器
    open('http://localhost:'+PORT ) // http://localhost:8081
    console.log('静态服务器已启动');
})