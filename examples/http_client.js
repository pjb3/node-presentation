var puts = require("sys").puts,
    http = require("http")
   
var url = require("url").parse(process.ARGV[2])
var host = url.hostname
var port = url.port || 80
var path = url.pathname || "/"
var querystring = url.search || ""
var uri = path + querystring

puts("Getting "+uri+" from "+host+" on port "+port)
   
var client = http.createClient(port, host)
client.setTimeout(5000)
client.addListener("timeout", function() {
  puts("Request timed out")
})

var request = client.request("GET", uri, {"Host": host, "Connection": "close"})

request.finish(function (response) {
  
  puts("STATUS: " + response.statusCode + "\n")
  puts("HEADERS:\n")
  for(var k in response.headers) {
    puts("  "+k+": "+response.headers[k])
  }
  puts("")
  
  response.setBodyEncoding("utf8")
  
  var body = []
  response.addListener("body", function (chunk) {
    body.push(chunk)
  })
  
  response.addListener("complete", function() {
    puts("BODY:\n" + body.join(""))
  })
  
})