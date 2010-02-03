var puts = require("sys").puts;

Number.square = function(n) {
  return n * n
}

Number.even = function(n) {
  return n % 2 == 0
}

Number.odd = function(n) {
  return !this.even(n)
}

Number.prototype.even = function() {
  return this.constructor.even(this)
}

Number.prototype.odd = function() {
  return this.constructor.odd(this)
}

Array.prototype.sortAsc = function() {
  return this.sort(function(x, y){
    if(x < y) {
      return -1
    } else if(y < x) {
      return 1
    } else {
      return 0
    }
  })
}

Array.prototype.sortDesc = function() {
  return this.sort(function(x, y){
    if(x < y) {
      return 1
    } else if(y < x) {
      return -1
    } else {
      return 0
    }
  })
}

puts([2,1,4,3].map(Number.square).filter(Number.even).sortDesc())