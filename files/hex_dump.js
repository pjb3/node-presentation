posix = require("posix")
puts = require("sys").puts
fileReader = require("./file_reader").fileReader

var file = process.ARGV[process.ARGV.length-1]
var reader = fileReader(file)

reader.addListener("data", function(data) {
  for(var i = 0; i < data.length; i++) {
    var s = data.charCodeAt(i).toString(16).toUpperCase()
    if(s.length == 1) {
      s = '0'+s
    }
    process.stdio.write(s+' ')
    if(i % 26 == 25) {
      puts('')  
    }
  }
})
