"use strict";
exports.__esModule = true;
var c_users = [];
// joins the user to the specific chatroom
function join_User(id, username, room) {
    var p_user = { id: id, username: username, room: room };
    c_users.push(p_user);
    console.log(c_users, "users");
    return p_user;
}
console.log("user out", c_users);
// Gets a particular user id to return the current user
function get_Current_User(id) {
    return c_users.find(function (p_user) { return p_user.id === id; });
}
// called when the user leaves the chat and its user object deleted from array
function user_Disconnect(id) {
    var index = c_users.findIndex(function (p_user) { return p_user.id === id; });
    if (index !== -1) {
        return c_users.splice(index, 1)[0];
    }
}
module.exports = {
    join_User: join_User,
    get_Current_User: get_Current_User,
    user_Disconnect: user_Disconnect
};
