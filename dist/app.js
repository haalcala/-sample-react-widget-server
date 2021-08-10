var express = require("express");
var socket = require("socket.io");
var color = require("colors");
var cors = require("cors");
var _a = require("./dummyuser"), get_Current_User = _a.get_Current_User, user_Disconnect = _a.user_Disconnect, join_User = _a.join_User;
var app = express();
app.use(express.static('public'));
console.log("app:", app);
var port = process.env.PORT || 80;
var server = app.listen(port, console.log("Server is running on the port no: " + (port) + " "));
var io = socket(server);
//initializing the socket io connection 
io.on("connection", function (socket) {
    //for a new user joining the room
    socket.on("joinRoom", function (_a) {
        var username = _a.username, roomname = _a.roomname;
        //* create user
        var p_user = join_User(socket.id, username, roomname);
        console.log(socket.id, "=id");
        socket.join(p_user.room);
        //display a welcome message to the user who have joined a room
        socket.emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: "Welcome " + p_user.username
        });
        //displays a joined room message to all other room users except that particular user
        socket.broadcast.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: p_user.username + " has joined the chat"
        });
    });
    //user sending message
    socket.on("chat", function (text) {
        //gets the room user and the message sent
        var p_user = get_Current_User(socket.id);
        io.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: text
        });
    });
    //when the user exits the room
    socket.on("disconnect", function () {
        //the user is deleted from array of users and a left room message displayed
        var p_user = user_Disconnect(socket.id);
        if (p_user) {
            io.to(p_user.room).emit("message", {
                userId: p_user.id,
                username: p_user.username,
                text: p_user.username + " has left the room"
            });
        }
    });
});
