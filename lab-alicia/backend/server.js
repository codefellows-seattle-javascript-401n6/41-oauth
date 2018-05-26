'use strict';

const express = require('express');
const dotenv = require('dotenv');
const superagent = require('superagent');
const app = express();

dotenv.load();

app.get('/oauth/google/code', function(req, res) {
  if (!req.query.code) {
    res.redirect(process.env.CLIENT_URL);
  } else {
    console.log('CODE:', req.query.code);
    superagent.post('https://www.googleleapis.com/oauth2/v4/token')
      .type('form')
      .send({
        code: req.query.code,
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.API_URL}/`
      })
      .then (response => {
        console.log('Response AFTER code is given');
        return superagent.get('https://www.googleleapis.com/plus/v1/people/me/')
          .set('Authorization', `Bearer ${response.body.access_token}`);
      })
      .then(response => {
        console.log('::::OPEN ID - Google Plus ::::', response.body);
        // handle oauth login
        res.cookie('X-Some Cookie', 'some token');
        res.redirect(process.env.CLIENT_URL);
      });
  }
});

app.get('/auth-test', (req, res) => {
  res.sendFile('./index.html', {root: './'});
});

app.listen(3000, () => {
  console.log('listen on port 3000');
});