import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import config from './config.json';
import passport from 'passport';
import massive from 'massive';
import path from 'path';

var Auth0Strategy = require('passport-auth0')

const connectionString = 'postgres://Tran@localhost/changecase';
const massiveInstance = massive.connectSync({
    connectionString: connectionString
});

const app = module.exports = express();

app.use(session({
    secret: config.sessionSecret,
    saveUninitialized: false,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(cors());
app.set('db', massiveInstance);
app.use(express.static(__dirname + '/../public'));
// app.get('*', function(request, response) {
//     response.sendFile(path.resolve(__dirname, '../public', 'index.html'))
// });
const db = app.get('db');
const ctrl = require('./ctrl.js');

//Auth0
var strategy = new Auth0Strategy({
   domain:       'tran.auth0.com',
   clientID:     config.auth0ClientId,
   clientSecret: config.auth0Secret,
   callbackURL:  'http://localhost:3000/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    console.log("accessToken: ", accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('extraParams: ', extraParams);
    console.log('profile: ', profile.id)

    db.read_user_externalId([profile.id], (err,response) => {
      if(err){
        console.log('ERROR at READ EXTERNALID: ', profile.id)
      }
      if(response){
        console.log('RESPONSE FROM READ: ', response)
      }
      if(response.length === 0){
        db.create_user([profile.id,profile.displayName], (err,response)=>{

        })
      }

    });

    return done(null, profile);
  }
);

passport.use(strategy);

app.get('/', function(req,res){

  res.status(200).json(messages);
});

app.get('/auth/', passport.authenticate('auth0'));
app.get('/callback', passport.authenticate('auth0', {
    failureRedirect: '/auth',
    successRedirect: '/'
}), ctrl.respond);

app.get('/getUserData', (req, res, next) => {
  console.log('REQ.BODY: ', req.body)
  console.log('REQ.USER: ', req.user)
  res.json(req.user);
})


app.get('/login', (req, res, next) => {
    res.json({"test":"is working"});
});

app.post('/addWord', ctrl.addWord)

passport.serializeUser((user, done) => {
    done(null, user); // put the whole user object from YouTube on the sesssion;
});

passport.deserializeUser((obj, done) => {
    //Only do something here that needs to be done with every request
    done(null, obj); // get data from session and put it on req.user in every endpoint;
});

app.listen(config.port, () => {
    console.log('Hosting port', config.port);
});
