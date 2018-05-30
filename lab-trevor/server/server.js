'use strict';

const express = require('express');
const superagent = require('superagent');

const app = express();
let cookie = require('cookie');

require('dotenv').config()


app.get('/oauth-callback', function(req, res) {
  if (!req.query.code) {
    res.redirect(process.env.CLIENT_URL);
  } else {
    console.log('CODE:', req.query.code);
    superagent.post('https://www.googleapis.com/oauth2/v4/token')
    .type('form')
    .send({
      code: req.query.code,
      grant_type: 'authorization_code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/oauth-callback`
    })
    
    .then(response => {
      console.log('Response AFTER code is given', response.body)
      // return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
      // .set('Authorization', `Bearer ${response.body.id_token}`)
      let tokenPayload = response.body.id_token
      res.cookie('X-Some-Cookie', tokenPayload);
      
      // res.redirect(`${process.env.CLIENT_URL}/profile`)
    })
    // .then(response => {
    //   // console.log('::::OPEN ID - GOOGLE PLUS::::', response.body);
    //   // // handle oauth login
    //   // res.cookie('X-Some-Cookie', 'some token');
      
    // })
    .catch(response => {
      console.log(response)
    })
  }

});

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root:'./'});
})

app.get('/profile', (req, res) => {
  let isLoggedIn = false;
  if (!isLoggedIn) {
    res.write('<h1>You Must Log In</h1>');
    res.write('<p>Please go to the homepage and auth to log in.</p>');
    res.end();
    return;
  }

  res.write('<h1>You\'re Logged In</h1>');
  res.write('<p>Welcome back!</p>');
  res.end();
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});