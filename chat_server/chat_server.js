tcp = require("tcp")
puts = require("sys").puts

var port = 12345

var connections = []
var server = tcp.createServer(function(connection) {

  connection.setTimeout(0)
   
  connection.send("Nickname: ");

  connection.addListener("receive", function(data) {
    if(connection.nickname) {
      server.broadcast(connection.nickname+": "+data.trim()+"\n")
    } else {
      connection.nickname = data.trim()
      connections.push(connection)
      server.broadcast(connection.nickname+" has joined the room\n")
    }
  })
  
  connection.addListener("eof", function() {
    connection.close()
  })
  
  connection.addListener("close", function(has_error) {
    var i = connections.indexOf(connection)
    if(i >= 0) {
      connections.splice(i, 1)
    }
    if(connection.nickname) {
      server.broadcast(connection.nickname+" has left the room\n")
    } else {
      puts("connection closed")
    }
  })
  
})

server.broadcast = function(msg) {
  connections.forEach(function(c) {
    if(c.readyState == "open") {
      c.send(msg)
    } else{
      puts("readyState is "+c.readyState)
    }    
  })
}

server.listen(port)
puts("Chat server listening on port "+port)