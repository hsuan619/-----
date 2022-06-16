const http = require("http");
const fs = require("fs");
const sendResponse = (filename, statusCode, response) => {
    fs.readFile(`./html/${filename}`,(error, data) =>{
        if(error){
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain");
            response.end("error");//response.end is show to user
        }
        else{
            response.statusCode = statusCode;
            response.setHeader("Content-Type", "text/html");
            response.end(data);
        }
    });

};
const server = http.createServer((request, response) => {
    console.log(request.url,request.method);
    const method = request.method;
    const url = request.url;
    if(method === "GET"){
        if( url === "/"){//homepage
            sendResponse("index.html", 200, response);

        } 
        else if( url === "/about.html"){
            sendResponse("about.html", 200, response);
        }
        else{
            sendResponse("404.html", 404, response);
        }
    
    }


    //response.end("hello");
});
const ip = "127.0.0.1";
const port = 3000;
server.listen(port, ip, ()=> {
    console.log(`go to file:///C:/Users/06ash/Desktop/%E6%96%B0%E5%A2%9E%E8%B3%87%E6%96%99%E5%A4%BE/html`);
});
