User = require("./user").user

exports.room = function(options) {
  if(!options) { options = {} }
  
  this.port = options["port"] || 12345
  this.timeout = options["timeout"] || 0
  this.users = []
  
  this.broadcast = function(message) {
    this.users.forEach(function(user){
      user.sendMessage(message)
    })
  }
  
  this.addUser = function(user) {
    this.users.push(user)
    this.broadcast(user.nickname+" joined the room\n")
  }
  
  var room = this
  this.server = tcp.createServer(function (socket) {
    socket.setTimeout(room.timeout)
     
    var user = new User(socket)

    socket.send("Nickname: ");

    socket.addListener("receive", function (packet) {
      if(user.isRegistered()) {
        room.broadcast(user.nickname+": "+packet.trim()+"\n")
      } else {
        user.nickname = packet.trim()
        room.addUser(user)
      }
    });
  }).listen(this.port);

  puts("Chat room available on port " + this.port);
}