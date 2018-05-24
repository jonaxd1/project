var express = require ('express');
var path = require('path');
var http = require('http');

var app = express();

app.set("views", path.resolve(__dirname,"views"));
app.set("view engine","ejs");

var IP_MALVADA = "192.168.33.123";

app.use((request, response, next) => {
    if(request.ip === IP_MALVADA){
        response.status(401).send("Intento de acceso no autorizado");
    }else{
        next();
    }
});

var publicPath = path.join(__dirname,'public');
app.use('recursos',express.static(publicPath));

app.get('/',(request, response) => {
    response.render("index");
});

app.get('/about',(request,response) =>{
    response.end('Welcome Page About');
});

app.get('/weather',(request,response) =>{
    response.end('Hoy habra un clima soleado');
});

app.get('/bienvenida/:nombre',(request,response) =>{
    response.end('Welcome, '+ request.params.nombre);
});
app.use((request, response) => {
    response.writeHead(404,{"Content-type":"text/html"});
    response.end("<h2>404 Not Found!</h2>");
});

http.createServer(app).listen(3000);