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
    }).then(tokenResponse => {
        res.send(tokenResponse.body);
        let token = tokenResponse.body.token;
    });
});
app.listen(PORT, () => {
    console.log(`listening on http://localhost${PORT}`)
});