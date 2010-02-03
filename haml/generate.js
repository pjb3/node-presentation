var puts = require('sys').puts,
    posix = require("posix"),
    haml = require("./lib/haml")

posix.cat("index.haml").addCallback(function(template) {
  puts(haml.render(template, {locals: {
    time: new Date(), 
    colors: ["red", "green", "blue"]
  }}))
})

