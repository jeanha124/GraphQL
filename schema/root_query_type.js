const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList } = graphql;

const mongoose = require("mongoose");
const User = mongoose.model("user");

const UserType = require("./user_type");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    }
  }
});

module.exports = RootQuery;
