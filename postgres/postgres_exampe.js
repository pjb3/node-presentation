var sys = require("sys");
var Postgres = require('./postgres-js/postgres');

(function () {
  var db = new Postgres.Connection("pg_on_rails_development", "pbarry", "")
  db.query("SELECT * FROM requests limit 10", function (data) {
    sys.p(data)
  })
  db.close()
})()
