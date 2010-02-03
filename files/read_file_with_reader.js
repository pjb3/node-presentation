posix = require("posix")
puts = require("sys").puts
fileReader = require("./file_reader").fileReader

var file = process.ARGV[process.ARGV.length-1]
var reader = fileReader(file)

reader.addListener("data", function(data) {
  process.stdio.write(data)
})

reader.addListener("error", function() {
  puts("Unable to read file: " + process.ARGV[2])
})