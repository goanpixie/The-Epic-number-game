var express = require("express");
var path = require("path");
// create the express app
var app = express();
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// tell the express app to listen on port 8000
 var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);
var counter=0;

io.sockets.on('connection', function (socket) {
  console.log("WE ARE USING SOCKETS!");
  console.log(socket.id);

  socket.emit('welcome',{response: counter});

  socket.on("clear_counter",function(){
    counter=0;
    io.emit('reset',{response: counter});
  })
  socket.on("button_clicked", function (){
  counter++;
      // console.log('Someone clicked a button!  Reason: ' + data.reason);
      io.emit('add_count', {response: counter});
  })
  //all the socket code goes in here!
})
