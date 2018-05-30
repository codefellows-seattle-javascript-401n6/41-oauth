require('dotenv').config()
const express = require('express');
const app = express();
let superagent = require('superagent')

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: './'});
})

app.get('/oauth-callback', (req, res) => {
    let {code, state} = req.query;

    let tokenUrl = 'https://github.com/login/oauth/access_token'
    superagent.post(tokenUrl)
    .send({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code
    })
    .then(tokenResponse => {
        let token = tokenResponse.body.access_token;
        let userUrl = 'https://api.github.com/user?';
        userUrl += 'access_token=' + token;
        return superagent.get(userUrl);
    }).then(userResponse => {
        let userName = userResponse.body.login;
        let bio = userResponse.body.bio;
        res.write('<a href="http://localhost:3000"> << home </a>')
        res.write('<img src="' + userResponse.body.avatar_url + '"/>')
        res.write('<h3>' + userName + '</h3>')
        res.write('<p>' + bio + '</p>')
        res.write('<pre' + JSON.stringify(userResponse.body) + '</pre>')
        res.end()
    })
    .catch(err => {
        res.send(err.body.message);
    })
});
app.listen(PORT, () => {
    console.log(`listening on http://localhost${PORT}`)
});