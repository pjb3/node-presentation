var puts = require('sys').puts,
    http = require('http')

http.createServer(function(req, res) {
  res.sendHeader(200, {'Content-Type': 'text/html'})
  res.sendBody('<h1>Hello World</h1>')
  res.finish()
}).listen(8080)

puts('Server running at http://127.0.0.1:8080/')
