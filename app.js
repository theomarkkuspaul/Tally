var express = require('express'),
    fs = require('fs');

var app = express();

app.get('/', function(req, res){
  res.send("Welcome to my app!");
});

app.get('/games', function(req, res){

});

app.listen(3000, console.log("Server listening on localhost:3000 "))
