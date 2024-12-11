const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
const {peerProxy} = require('./peerProxy.js');
const app = express();
require('dotenv').config()
const DB = require('./database.js');

const authCookieName = 'token';

// Get key from .env
const API_KEY = process.env.IPSTACK_ACCESS_KEY;
const API_URL = `https://api.ipstack.com/check?access_key=${API_KEY}`;

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = {};
let numLogins = {};

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  // Check if the user already exists
  if (await DB.getUser(req.body.name)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.name, req.body.password);
    await DB.addLogin({name: req.body.name})

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});


// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  console.log('Hit login endpoint');
  const user = await DB.getUser(req.body.name);
  if (user) {
    // bcrypt will hash the password and compare it to the stored hash
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      DB.addLogin({name: req.body.name});
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});


// ! ^^^^^^ These are unauthenticated routes ^^^^^^ !
// * vvvvvv These are authenticated routes vvvvvv *

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

// 404
secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});


// GetUserLogins
secureApiRouter.post('/getUserLogins', async (req, res) => {
  console.log('Hit getUserLogins endpoint: ' + req.body.name);

  const numLogins = await DB.getNumLogins(req.body.name);
  console.log('numLogins: ' + numLogins)

  // In the case that it's broken :).... send negative!
  if (!numLogins)
    res.send({logins: -1})
  else
    res.send({logins: numLogins});
});

// GetAuth the location of the user
// This API call is in backend because it requires the API key to be kept secret - frontend doesn't allow .env
secureApiRouter.get('/getLocation', async (req, res) => {
  console.log('Hit get location endpoint');
  const response = await fetch(API_URL);
  if (!response.ok) {
    // Lets front page deal with error handling
    res.status(500).send({ msg: 'Error fetching location' });
    return;
  }
  const data = await response.json();
  if (!data.city || !data.region_name) {
    // Lets front page deal with error handling
    console.log(data);
    // Could be error with AWS?
    res.status(500).send({ msg: `Error with this data`, error: data });
    return;
  }

  res.send({ location: `${data.city}, ${data.region_name}`, data: data });
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// // Return the 404 error code for all other requests
// app.use((_req, res) => {
//   console.log('Hit unknown endpoint');
//   res.status(404).send({ msg: 'Not found' });
// });

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
