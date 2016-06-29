var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.send("Welcome to my app!");
})

app.listen(3000, console.log("Server listening on localhost:3000 "))
