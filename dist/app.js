var express = require("express");
var app = express();
app.use(express.static('public'));
console.log("app:", app);
var port = process.env.PORT || 80;
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
