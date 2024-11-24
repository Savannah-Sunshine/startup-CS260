const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const uuid = require('uuid');
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

// Serve up the front-end static content hosting
app.use(express.static('public'));

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

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});


// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.name);
  if (user) {
    // bcrypt will hash the password and compare it to the stored hash
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
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


// ! ^^^^^^ These are unauthenticated routes ^^^^^^
// * vvvvvv These are authenticated routes vvvvvv

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
apiRouter.post('/getUserLogins', (req, res) => {
  console.log('Hit getUserLogins endpoint');
  console.log(numLogins, req.body.name);


  // const scores = await DB.getUserLogins();
  // res.send(scores);


  // if (Object.keys(numLogins).length === 0) {
  //   res.send({logins: 0});
  //   return
  // }
  res.send({logins: 5});
});

// GetAuth the location of the user
secureApiRouter.get('/getLocation', async (req, res) => {
  console.log('Hit get location endpoint');
  const response = await fetch(API_URL);
  if (!response.ok) {
    res.status(500).send({ msg: 'Error fetching location' });
    return;
  }
  const data = await response.json();
  res.send({ location: `${data.city}, ${data.region_name}` });
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  // TODO: index.html is not being served :)
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});