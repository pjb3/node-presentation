var puts = require('sys').puts,
    tools = require('./tools'),
    posix = require('posix'),
    websocket = require('./websocket'),
    http = require('http');

var httpPort = 8080

var httpServer = http.createServer(function(req, res) {
  if(req.url == '/chat_client.js') {
    res.sendHeader(200, {'Content-Type': 'text/javascript'})
    posix.cat('chat_client.js').addCallback(function(data) {
      res.sendBody(data)
      res.finish()
    })    
  } else {
    res.sendHeader(200, {'Content-Type': 'text/html'})
    posix.cat('chat_client.html').addCallback(function(data) {
      res.sendBody(data)
      res.finish()
    })
  }
}).listen(httpPort)

puts('HTTP Server running on port '+httpPort)

var wsPort = 8888
var wsServer = new websocket.Server({port: wsPort})
puts('WS Server running on port '+wsPort)

var connections = []
wsServer._onConnect = function(connection) {
  connections.push(connection)
  connection.nickname = null
}

wsServer._onDisconnect = function(connection) {
  var i = connections.indexOf(connection)
  if(i >= 0) {
    connections.splice(i, 1)
  }
  if(connection.nickname) {
    wsServer.broadcast(connection.nickname+" has left the room")
  }
}

wsServer.broadcast = function(msg) {
  puts('['+ new Date() +'] [info] ' + msg.trim())
  connections.forEach(function(c) {
    c.send(msg.trim()+"\n")
  })
}
