var app = require('./server.js');
var db = app.get('db');

module.exports = {
    respond: (req, res, next) => {
      return res.json({"test":"is working"})
    },
    addWord: (req, res, next) => {


      db.read_word([req.body.word, req.body.userId], function(err, res1){
        if(err){
          console.log('read_word error: ', err)
        }
        console.log('READ WORD: ', res1)
        if(res1.length === 0){

          db.add_word([req.body.word, req.body.userId], function(err, res2){
            if(err){
              console.log('add_word error: ', err)
            }
              console.log('ADDED WORD: ', res2)
            });

              return res.json({"status":req.body.word+" has been added to the database"})
            } else {
              return res.json({"status":res1[0].word+" is already in the database"})
            }
      })
  }
}
