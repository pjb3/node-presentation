posix = require("posix")
puts = require("sys").puts

var file = process.ARGV[process.ARGV.length-1]
posix.cat(file).addCallback(function(data) {
  puts(data)
})