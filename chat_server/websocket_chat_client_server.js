var tools = require('./tools'),
    websocket = require('./websocket');
 
var server = new websocket.Server(tools.argvToObject(process.ARGV))

