var app = require('./server.js');
var db = app.get('db');

module.exports = {
    respond: (req, res, next) => {
        console.log('req.body:', req.body)
        console.log('req.user:', req.user)
      return res.json({"test":"is working"})
    }
  }
