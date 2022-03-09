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
    },
    user: {
      //Querying for a single User
      type: UserType,
      //Must define type for the arguments, GraphQLNonNull specifies there must be an arg
      args: { id: { type: new graphql.GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return User.findById(args.id)
      }
    }
  }
});

module.exports = RootQuery;
