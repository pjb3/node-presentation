posix = require("posix")
puts = require("sys").puts

var file = process.ARGV[process.ARGV.length-1]
var filePromise = posix.open(file, process.O_RDONLY, parseInt("444", 8))

filePromise.addCallback(function(fd) {
  var buffer_size = 1024 * 16
  var offset = 0
  posix.read(fd, buffer_size, offset).addCallback(function(data, bytes_read) {
    process.stdio.write(data)
    if(bytes_read == buffer_size) {
      posix.read(fd, buffer_size, offset + buffer_size).addCallback(arguments.callee)
    } else {
      posix.close(fd)
    }
  })
})

filePromise.addErrback(function() {
  puts("Unable to read file: " + file)
})
