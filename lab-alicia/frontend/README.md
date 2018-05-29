# 37: Cookies and Full Stack Application

- **Author**: Alicia Lycan
- **Version**: 1.0.0

## Overview
This is a simple app that currently allows a user to sign in or sign up.
They can visit their `/profile` page to see a welcome message and sign out.

## Getting Started
- Clone the repository to your local directory from [here](https://github.com/alicialycan/41-oauth)
- Install all the necessary modules using the `npm install` command in both the backend and frontend directories
- Start `nodemon` in the backend directory
- Open the browser to `http://localhost:3000` and enjoy

### Details
- In the back end directory, you will need a `.env` file with the following contents:
```
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
API_URL=http://localhost:3000
```
- You will need to set up your own Google Client Id and Secret from [here](https://console.developers.google.com)
```
Create a new project
Select the Credentials menu option
Click on the name to access your Client ID and Client Secret, and to set 'authorized redirect URI'
```

## Architecture
- [JavaScript](https://www.javascript.com/)
- [ReactJS](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Webpack](https://webpack.js.org/)
- [npm](https://npmjs.org/)

## Change Log
```
2018-05-29 Add cookie info and readme
2018-05-26 Write profile info to html
2018-05-26 Append cookie info to html
2018-05-26 Added a missing package and fixed some bugs
2018-05-24 Add server and index framework
```