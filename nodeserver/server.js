import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import config from './config.json';
import passport from 'passport';
import massive from 'massive';
import path from 'path';

var Auth0Strategy = require('passport-auth0'),
    passport = require('passport');

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

//Auth0
var strategy = new Auth0Strategy({
   domain:       'tran.auth0.com',
   clientID:     config.auth0ClientId,
   clientSecret: 'your-client-secret',
   callbackURL:  'http://localhost:3000/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.get('/', function(req,res){

  res.status(200).json(messages);
});

app.get('/login', (req, res, next) => {
    res.json({"test":"is working"});
});

app.listen(config.port, () => {
    console.log('Hosting port', config.port);
});
