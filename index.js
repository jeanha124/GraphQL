const express = require("express");
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const User = require("./models/user");
const schema = require("./schema/schema");

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.use(bodyParser.json());
app.listen(5000, () => console.log('Server is running on port 5000'));

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));