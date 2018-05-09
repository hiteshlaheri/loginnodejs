var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
   });
socket.on('login', function(msg){
    
    fs.readFile('para.json', 'utf8', function readFileCallback(err, data){
	    if (err){
		console.log(err);
	    } else {
      
	   var obj = JSON.parse(data); //now it an object
     
     for (i in obj.login) {
      x = obj.login[i].id;
      y= obj.login[i].pass;
      if(x===msg.id && y===msg.pass ){
        io.emit('loginsucc', '1');
      
                             console.log("User Name:", x,"password:",y);
      }
  }
      
    
		
	}});

   });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});