var app = require('./server.js');
var db = app.get('db');

module.exports = {
    respond: (req, res, next) => {
      return res.json({"test":"is working"})
    },
    addWord: (req, res, next) => {
      return res.json({"we're":"good"})
    }
  }
