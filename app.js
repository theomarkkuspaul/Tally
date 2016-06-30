var express = require('express'),
    fs = require('fs');

var app = express();

app.get('/', function(req, res){
  res.send("Welcome to my app!");
});

app.get('/games', function(req, res){

  read('./data.json', function(err, result){
    if (err) {
      console.log("Something went wrong");
    } else {
      var games = JSON.parse(result).games;
      res.send(games);
    }
  })
});

app.listen(3000, console.log("Server listening on localhost:3000 "))

function read(filePath, callback){
  fs.readFile(filePath, function(err, data){
    if (err) {
      return callback(err);
    } else {
      return callback(null, data);
    }
  });
}
