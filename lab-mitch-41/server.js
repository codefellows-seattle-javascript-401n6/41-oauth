'use strict';

const express = require('express');
const superagent = require('superagent');
//const dotenv = require('dotenv');
require('dotenv').config();
const app = express();

//dotenv.load();

app.get('/', (req, res) => {
    res.cookie('isNewVisitor', false, {maxAge: 9000000});
    res.sendFile('./index.html', {root: './'});
})

app.get('/new', (req, res) => {
    let needle = 'isNewVisitor=false';
    let isNewVisitor = !req.headers.cookie.includes(needle);
    if(isNewVisitor) {
        res.write('<h1>Hello There!</h>');
        res.write('<p>I see that you are new to these parts.</p>');
        res.end();
    } else {
        res.write('<h1>Welcome Back!</h>');
        res.write('<p>I see you know your way around.</p>');
        res.end();
    }
});

app.get('/oauth-callback', (req, res) => {
    let {code, state} = req.query;
    if (!code) {
        res.write('<h>Access Denied</>');
        res.write('You must be signed in to access this page</p>')
        res.end();
    }

    let tokenUrl = 'https://github.com/login/oauth/access_token';
    superagent.post(tokenUrl)
    .send({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code
    })
    .then(tokenResponse => {
        console.log('token res', tokenResponse);
        let token = tokenResponse.body.access_token;
        token = 'cheat' + token + 'cheat';
        res.cookie('oauth-token', token, {maxAge: 100000});
        res.write('<h>Authorized!</h>');
        res.write('<p>Token: ${token}</p>');
        res.write('<a href="/profile">See your profile</a>');
        res.end();
    });
});
       
app.get('/profile', (req, res) => {
    let needle = 'oath-token';
    let isLogginIn = req.headers.cookies.includes(needle);
    if(!isLoggedIn) {
        res.write('<h1>Unauthorized</h>');
        res.write('<p>You must login to view this page.</p>');
        res.end();
        return;
    }

    let token = req.headers.cookie.split('cheat')[1];
    let userUrl = 'https://api.github.com/user?';
    userUrl += 'access_token=' + token;
    superagent.get(userUrl)
    .then(userResponse => {
        let username = userResponse.body.login;
        let bio = userResponse.body.biol;
        res.write('<div>');
        res.write('<a href="http://localhost:3000"><<< HOME</a>');
        res.write('</div>');
        res.write('<div>');
        res.write('<img src="' + userResponse.body.avatar_url + '"/>')
        res.write('</div>');
        res.write('<h1>' + username + '</h1>');
        res.write('<p>' + bio + '</p>');
        res.write('<p>' + JSON.stringify(userResponse.body) + '</p>');
        res.end();
    });
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('http://localhost:3000');
})
// app.get('/authorize-login/google', function(req, res) {
//     if(!req.query.code) {
//         res.redirect(process.env.CLIENT_URL);
//     } else {
//         console.log('CODE:', req.query.code);
//         superagent.post('https://www.googleapis.com/oauth2/v4/token')
//         .type('form')
//         .send({
//             code: req.query.code,
//             grant_type: 'authorization_code'
//             client_id: process.env.GOOGLE_CLIENT_ID,
//             client_secret: process.env.GOOGLE_CLIENT_SECRET,
//             redirect_uri: `${process.env.API_URL}/authorize-login/google`
//         })
//         .then(response => {
//             console.log('Response from API' , response.body);
//             return superagent.get(`https://googleappis.com/plus/v1/people/me/openidConnect`)
//             .set('Authorization', 'Bearer $(response.body.access_token')
//         })
//         .then(response => {
//             console.log('ID for Google Plus', response.body);
//             //res.cookie()
//             res.redirect(process.env.CLIENT_URL);
//         })
//     }
// });

// app.listen(3000, () => {
//     console.log('http://localhost:3000')
// })