const express = require("express");
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const User = require("./models/user");
const Post = require("./models/post");
const schema = require("./schema/schema");

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

// app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const router = express.Router();

const createNewUser = router.post("/new", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ email: "A user has already registered with this address"});
    } else {
      console.log(req.body);
      const newUserObj = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      newUserObj
        .save()
        .then(savedUser => res.json(savedUser))
        .catch(err => console.log(err));
    }
  });
});

app.use("/users", createNewUser);

const createNewPost = router.post("/new", (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    date: req.body.date,
    author: req.body.author
  });

  newPost
    .save()
    .then(savedPost => res.json(savedPost))
    .catch(err => console.log(err));
});

app.use("/posts", createNewPost);

app.listen(5000, () => console.log('Server is running on port 5000'));

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));