# Lab 41: OAuth

### Author: Brandon Buchholz

### Description:
A simple app where users can log-in using Github as the OAuth provider. The OAuth token is stored in a cookie on the users browser, and has a page that detects wether the user has a a cookie and displays:

"Unauthorized! 
You must be authorized to access this page if no token or cookie"

or 

"You are Authorized!
click here to see your github profile"(which is a clickable link)

Once you are authorized, you can view profile picture, profile name, and bio from Github.

### Getting Started:
Clone this repository to your local environment and run the following npm commands:
* npm install
* use "nodemon server.js" in your CLI to start server and run locally on "http://localhost:3000"

### Technology used:
* GitHub OAuth
* Node
* Javascript
* Express
* Superagent
* Dotenv
* html



