'use strict';
require('dotenv').config(); 
let express = require('express');
let superagent = require('superagent');
let cookie = require('cookie');
let app = express();

app.get('/',(req, res) => {
  res.sendFile('./index.html', {root: './'});
});

app.get('/oauth-callback', (req, res) => {
  let cookieToken;
  let userUrl = 'https://api.github.com/user?access_';
  let {code, state} = req.query;
  let tokenUrl = 'https://github.com/login/oauth/access_token?';

  console.log('16 req.headers.cookie', req, res);
  if(req.headers.cookie){
    cookieToken = req.headers.cookie;
    console.log('21 cookie token', cookieToken)
    userUrl = `${userUrl}${cookieToken}`;
    console.log('20 inside cookie userUrl', userUrl);
    return superagent.get(userUrl)
    .then(userResponse => {
      console.log('36 blehhhhh',  );
      res.send(userResponse.body);
    })
    .catch(err => {
      res.send(err.body.message);
    });
    
  }else{


    superagent.post(tokenUrl)
  .send({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
  }).then(tokenResponse =>{
    console.log('33 tokenResponce+++++++++++++++++++++++++++++++++++++++')
    let token = tokenResponse.body.access_token;
    userUrl = `${userUrl}token=${token}`;
    console.log('45 userUrl', userUrl)
    res.cookie('token', token, {maxAge: 900000});
    return superagent.get(userUrl);
  })

  .then(userResponse => {
    console.log('36', res.req.headers.cookie);
    res.send(userResponse.body);
  })
  .catch(err => {
    res.send(err.body.message);
  });
  }  
});
//class demo cookies
app.get('/cookie-setter', (req, res) => {
  res.cookie('token', 'token', {maxAge: 900000})
  res.cookie('my-short-lived-cookie', 'ten seconds', {maxAge: 10000})
  res.cookie('my-longer-lived-cookie', 'one-hundred seconds!', {maxAge: 100000})
  res.send('<h1>setting cookies</h1>')
});

app.get('/cookie-inspector', (req, res) => {
  // console.log('cookie req', req);
  res.write('<h1>reading cookies</h1>')
  res.write('<pre>' + req.headers.cookie + '</pre>');
  res.end();
});
//

let PORT =  process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});