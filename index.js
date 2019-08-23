var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
    res.response("kkkkkkk")
});

http.listen(3000, function(){
    console.log('HTTP server started on port 3000');
});