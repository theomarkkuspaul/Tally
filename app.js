var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    fs = require('fs');

var app = express();
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(morganLogger);

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

app.post('/games', function(req, res){
  var newGame = req.body
  addGame('./data.json', newGame, function(err, data){
    var output = JSON.stringify(data);
    fs.writeFile('./data.json', output, function(err){
      if (err){console.log(err)};
    })
  });
  res.end();
})

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

function morganLogger(req, res, next) {
  console.log("Hit the " + req.method + " route, pointing to " + req.url);
  next();
}

function addGame(filePath, newGame, callback){

  read(filePath, function(err, data){
    if (err){
      console.log(err);
    } else {
      var allGames = JSON.parse(data).games;
      allGames.push(newGame);
      return callback(null, allGames);
    }
  })
}
