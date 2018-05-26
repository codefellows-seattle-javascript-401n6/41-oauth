'use strict';
require('dotenv').config(); 
let express = require('express');
let superagent = require('superagent');
let app = express();


app.get('/',(req, res) => {
  res.sendFile('./index.html', {root: './'});
});

app.get('/oauth-callback',(req, res) => {
  console.log('14 hi');
  let {code, state} = req.query;
  let tokenUrl = 'https://github.com/login/oauth/access_token?';
  superagent.post(tokenUrl)
  .send({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: code
  }).then(tokenResponse =>{
    console.log('token res', tokenResponse);
    let token = tokenResponse.body.access_token;
    let userUrl = 'https://api.github.com/user?';
    userUrl += 'access_token=' + token;

    return superagent.get(userUrl);
  })
  .then(userResponse => {
    res.send(userResponse.body);
  })
  .catch(err => {
    res.send(err.body.message);
  });
});

let PORT =  process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});