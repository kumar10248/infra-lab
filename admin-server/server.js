const http = require("http");

http.createServer((req,res)=>{
    console.log("Admin Request");

    res.end("ADMIN PANEL 🔥");
}).listen(4000,"0.0.0.0",()=>{
    console.log("Admin running");
});
