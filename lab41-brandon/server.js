let express = require('express');

let app = express();

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: './'});
});

app.get('/oauth-callback', (req, res) => {
  res.send(req);
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('http://localhost' + PORT);
});