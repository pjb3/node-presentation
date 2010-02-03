var puts = require('sys').puts,
    http = require('http')

http.createServer(function(request, response) {
  
  var client = http.createClient(80, "www.google.com")
  var gRequest = client.request("GET", request.url, {"Host": "www.google.com", "Connection": "close"})

  gRequest.finish(function (gResponse) {
    response.sendHeader(gResponse.statusCode, gResponse.headers)

    gResponse.addListener("body", function (chunk) {
      response.sendBody(chunk)
    })

    gResponse.addListener("complete", function() {
      response.finish()
    })
  })  
  
}).listen(8080)

puts('Google Proxy running at http://127.0.0.1:8080/')
