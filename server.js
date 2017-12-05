let express = require("express");
let app = new express();
let bodyParser = require("body-parser");
let cookieParser = require('cookie-parser');
let session = require('express-session');

app.use(express.static(require("path").resolve(__dirname, './app/dist')));
app.use(cookieParser('admin'));
app.use(session({
    secret: 'admin',
    resave: true,
    cookie: {maxAge: 8000000},
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.send(require("fs").readFileSync(require("path").resolve(__dirname, "./app/dist/index.html"), "utf-8"));
});

module.exports = app;