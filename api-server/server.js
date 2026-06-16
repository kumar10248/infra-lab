const http = require("http");
const os = require("os");

http.createServer((req,res)=>{
    res.end(`Hello from ${os.hostname()}`);
}).listen(3000,"0.0.0.0");
