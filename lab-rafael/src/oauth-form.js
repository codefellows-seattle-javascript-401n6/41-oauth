function oauthSignIn() {
  let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  let form = document.createElement('form');
  form.setAttribute('method', 'GET');
  form.setAction('action', oauth2Endpoint);

  let params = {
    'client_id': process.env.CLIENT_ID,
    'redirect_uri': 'http://localhost:3000',
    'response_type': 'token',
    'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
    'prompt': 'consent'
  };

  for (let p in params) {
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
  }

  document.body.appendChild(form);
  console.log('params', params);
  form.submit();
}

module.exports = oauthSignIn;
