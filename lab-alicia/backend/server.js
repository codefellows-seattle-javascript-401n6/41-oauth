'use strict';

const express = require('express');
const superagent = require('superagent');
const dotenv = require('dotenv');
const app = express();

dotenv.load();

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: '/'});
});

app.get('oauth-callback', (req, res) => {
  
  let code = req.query.code;
  let state = req.query.state;

  let url = 'https://github.com/login/oauth/access_token';
  superagent.post(url)
    .send({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code: code,
      state:  state,
      scopes: 'repo',
    })
    .then((response) => {
      let token = response.body.access_token;
      let userUrl = 'https://api.github.com/user?';
      userUrl += 'access_token=' + token;
      return superagent.get(userUrl);
    })
    .then(response => {

    })

});

// need a way to detect if someone's logged in or not
app.get('/profile', (req, res) => {
  let needle = 'oauth-token';
  let isLoggedIn = req.headers.cookie.includes(needle);
  if (!isLoggedIn) {
    res.write('<h1>Unauthorized</h1>');
    res.write('<p>You must login to view this page</p>');
  }
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('http://localhost:3000');
});