'use strict'

var express = require('express');
// var path = require('path');
var db = require('./connection');
var control = require('./controllers');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var port = process.env.PORT || 8080;

var app = express();

app.use(session({
  secret: 'fearTheVoid',
  resave: true,
  cookie: { maxAge: 60000 },
  saveUninitialized: false
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('web'));

passport.use(new LocalStrategy(function (username, password, done) {
  db.getUser(username, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done("no user"); }
    if (password !== user.PASSWORD) { return done("password missmatch"); }
    return done(null, user);
  });
}
));

passport.serializeUser(function(user, done){
  done(null, user.ID)
});

passport.deserializeUser(function(ID, done){
  db.findById(ID, function(err,user){
    done(err, user);
  });
});

// app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/register.html')));

app.post('/submit-form', function (req, res) {
  db.insert(req.body);
  res.status(201).end("success");
});

app.get('/all', (req, res) => {
  db.getUsers(req, res);
});

app.get('/user', (req, res) => {
  res.send(">>> isAuthenticated: " + req.isAuthenticated() + " user: " + req.session.passport.user)
});

app.post("/register", (req, res) => {
  db.addUser(req.body);
  res.status(201).end("Success");
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/user",
  failureRedirect: "/login.html",
  failureFlash: false
}))

app.listen(port, () => {
  console.log('App running on port: ' + port);
});