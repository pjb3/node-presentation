exports.onData = function(data, connection) {
  if (data == 'start'){
    this.interval = setInterval(function(){
      connection.send(JSON.stringify({time: new Date().toString()}));
    }, 1000)
  }  
}
 
exports.onDisconnect = function(connection) {
  clearInterval(this.interval)
}