var puts = require('sys').puts

exports.onData = function(data, connection) {
  if(connection.nickname) {
    connection.server.broadcast(connection.nickname+": "+data+"\n")
  } else {
    connection.nickname = data
    connection.server.broadcast(connection.nickname+" has joined the chat room\n")
  }
}