'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const superagent = require('superagent');


app.get('/', (request, response) => {
  response.sendFile('./index.html', {root: './'});
});

app.get('/oauth', (request, response) => {
  let {code, state} = request.query;

  let tokenUrl = 'https://github.com/login/oauth/access_token';
  superagent.post(tokenUrl)
    .send({
      client_id: process.env.CLIENT_ID,//required
      client_secret: process.env.CLIENT_SECRET,//required
      code: code,//required
    })
    .then(tokenResponse => {
      let token = tokenResponse.body.access_token;
      let userUrl = 'https://api.github.com/user?';
      userUrl += 'access_token=' + token;
      return superagent.get(userUrl);
    })
    .then((userResponse) => {
      let username = userResponse.body.login;
      let bio = userResponse.body.bio;
      response.write('<a href="http://localhost:3000"> << HOME </a>');
      response.write('<img src="' + userResponse.body.avatar_url + '"/>')
      response.write('<h1>' + 'USERNAME: ' + username + '</h1>');
      response.write('<p>' + 'BIO: ' + bio + '</p>');
      response.write('<p>' + JSON.stringify(userResponse.body) + '</p>');
      response.end();
      // response.send(userResponse.body);
    })
    .catch((error) => {
      response.send(error.body);
    });
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});