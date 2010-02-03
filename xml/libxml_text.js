var puts = require('sys').puts
var libxml = require('./libxmljs')

// var doc = new libxml.Document();
// var root = doc.node('root')
// root.node('child', {foo: 'bar'})
//   .node('grandchild', {baz: 'fizbuzz'}, 'grandchild content')
// root.node('sibling', 'with content!');
//     
// puts(doc.toString())

var doc = libxml.parseXmlFile("./foo.xml");
puts(doc.toString())
var page = doc.find("//gsml:page")[0]