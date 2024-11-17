const express = require('express');
const uuid = require('uuid');
const app = express();

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

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  console.log('Hit create user endpoint');
  const user = users[req.body.name];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { name: req.body.name, password: req.body.password, token: uuid.v4() };
    users[user.name] = user;
    numLogins[user.name] = 1;

    res.send({ token: user.token });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  console.log('Hit login endpoint');
  const user = users[req.body.name];
  console.log(user, req.body.name);
  console.log(users)
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      numLogins[user.name] = numLogins[user.name] ? numLogins[user.name] + 1 : 1;
      console.log(numLogins);
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
  console.log('Unauthorized');
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  console.log('Hit logout endpoint');
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

// GetUserLogins
apiRouter.post('/getUserLogins', (req, res) => {
  console.log('Hit getUserLogins endpoint');
  console.log(numLogins, req.body.name);
  if (Object.keys(numLogins).length === 0) {
    res.send({logins: 0});
    return
  }
  res.send({logins: numLogins[req.body.name]});
});

// SubmitScore
// apiRouter.post('/score', (req, res) => {
//   scores = updateScores(req.body, scores);
//   res.send(scores);
// });

// Return the 404 error code for all other requests
app.use((_req, res) => {
  console.log('Hit unknown endpoint');
  res.status(404).send({ msg: 'Not found' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});