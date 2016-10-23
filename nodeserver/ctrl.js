var app = require('./server.js');
var db = app.get('db');

module.exports = {
    respond: (req, res, next) => {
        console.log('req.user:', req.user)
      return res.json({"test":"is working"})
    },
    addWord: (req, res, next) => {
      console.log('req.body: ', req.body)
      return res.json({"we're":"good"})
    }
  }
