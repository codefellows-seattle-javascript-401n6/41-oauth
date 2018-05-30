const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: './'});
})

app.get('/github-login', (req, res) => {
    res.send(req)
})
app.listen(PORT, () => {
    console.log(`listening on http://localhost${PORT}`)
});