puts = require("sys").puts

setInterval(function() {
  puts("hello")
}, 500)

process.addListener("SIGINT", function() {
  puts("goodbye")
  process.exit(0)
})