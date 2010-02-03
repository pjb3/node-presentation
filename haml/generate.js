var puts = require('sys').puts,
    posix = require("posix"),
    haml = require("./lib/haml")

/* 
 * The argument template is a String containing the Haml source
 * A String containing the rendered HTML is printed
 */
function printRenderedHTML(template) {
  puts(haml.render(template, {locals: {
    time: new Date()
  }}))
}

posix.cat("index.haml").addCallback(printRenderedHTML)
