var express=require('express');
var app=express();
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);
var UserId=0;


io.on('connection',function(socket){// A Listen To Recieve Data
    var CurrentUser;
    socket.on("Connect" , function (data) {
        console.log("User Connected");
        socket.emit("Connect",{name:data.name});//Send This To Client
    });
    socket.on("PLAY",function (data) {
        UserId +=1;
        CurrentUser={id:UserId,name:data.name,position:data.position};
        console.log(CurrentUser.name);
        socket.emit("PLAY",CurrentUser);
        socket.broadcast.emit("OTHERPLAYERS",CurrentUser);
    });
    socket.on("MOVING",function (data) {
        CurrentUser.position=data.position;
        console.log("User :"+ CurrentUser.name + "Position:  " + CurrentUser.position);
        socket.broadcast.emit("MOVING",CurrentUser);
    });
});
