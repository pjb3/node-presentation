posix = require("posix")
puts = require("sys").puts
events = require("events")

exports.fileReader = function (file, options) {
  if(!options) { options = {} }
  
  var reader = new events.EventEmitter()
  
  var filePromise = posix.open(file, process.O_RDONLY, options["mode"] || parseInt("444", 8))
  
  filePromise.addCallback(function(fd) {
    var buffer_size = options["bufferSize"] || 1024 * 16
    var offset = 0
    posix.read(fd, buffer_size, offset).addCallback(function(data, bytes_read) {
      reader.emit("data", data)
      if(bytes_read == buffer_size) {
        posix.read(fd, buffer_size, offset + buffer_size).addCallback(arguments.callee)
      } else {
        posix.close(fd)
        reader.emit("complete")
      }
    })
  })

  filePromise.addErrback(function() {
    reader.emit("error", "Unable to read file: " + file)
  })

  return reader
}

