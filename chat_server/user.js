var puts = require('sys').puts

// An object that represents a chat room user
exports.user = function(socket) {
  this.socket = socket
  
  this.isRegistered = function() {
    return this.nickname != null
  }
 
  this.sendMessage = function(message) {
    try {
      this.socket.send(message)
    } catch(e) {
      puts(e)
    }
  }
  
}