'use strict';

const express = require('express');
const superagent = require('superagent');
const dotenv = require('dotenv');

const app = express();

dotenv.load();

let PORT = process.env.PORT || 3000;

app.get('/oauth-callback', (req, res) => {

  let code = req.query.code;
  let state = req.query.state;

  let url = 'https://github.com/login/oauth/access_token';

  superagent.post(url)
    .send({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code: code,
      state: state,
      // scopes: 'repo'
    })
    .then(response => {
      let userUrl = 'https://api.github.com/user';
      let token = response.body.access_token;
      res.cookie('gh-access', token, {maxAge: (1000 * 60 * 60 * 24)});
      return superagent.get(userUrl)
        .set('Authorization', 'token ' + token);
    })
    .then((response) => {
      res.cookie('user', response.body.name, {maxAge: (1000 * 60 * 60 * 24)});
      res.send(response.body);
      res.end();
    })
    .catch(err => {
      res.send(err.message);
    });
});

app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: './' });
});

app.listen(PORT, () => {
  console.log(`Listening in at port ${PORT}`);
});