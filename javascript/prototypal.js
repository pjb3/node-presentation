var puts = require("sys").puts

Object.prototype.mixin = function(object) {
  process.mixin(this, object)
}

function Foo() {
  this.foo = function() {
    return "foo"
  }
}

Foo.mixin({
  build: function() {
    return new this()
  }
})

var foo = Foo.build()

Foo.prototype.mixin({
  bar: function() {
    return "bar"
  }
})

puts(foo.constructor)
puts(foo.foo)
puts(foo.bar)
puts(foo.foo())
puts(foo.bar())
puts(Foo.prototype.foo)
puts(Foo.prototype.bar)