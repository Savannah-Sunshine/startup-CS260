const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000});
const db = client.db('simon');
const userCollection = db.collection('user');
const loginsCollection = db.collection('logins');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(name) {
    // NAME WAS A TERRIBLE IDENTIFIER... TOO LATE :( 
  return userCollection.findOne({ name: name });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(name, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    name: name,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function addLogin(name) {

  // Update the number of logins for the user by one
  // $inc will increment by 1 
  // upsert add row to DB if none exist, else will create w/ name and numlogins = 1
  return await loginsCollection.updateOne({name: name}, { $set: {name: name}, $inc: {numLogins : 1} }, { upsert: true });
}

async function getNumLogins(name) {
    const result = await loginsCollection.findOne({name: {name: name}})
    // Gets rid of all other info and gives only the number

    // First time loggin in
    if(!result)
        return 1

    return result.numLogins
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addLogin,
  getNumLogins
};