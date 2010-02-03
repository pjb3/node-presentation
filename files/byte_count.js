posix = require("posix")
puts = require("sys").puts
fileReader = require("./file_reader").fileReader

var file = process.ARGV[process.ARGV.length-1]
var reader = fileReader(file)

var byteCount = 0
reader.addListener("data", function(data) {
  byteCount += data.length
})

reader.addListener("complete", function() {
  puts(byteCount)
})
