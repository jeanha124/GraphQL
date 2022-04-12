const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;
const mongoose = require("mongoose");
const UserType = require("./user_type");

const User = mongoose.model("user");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {}
});

module.exports = mutation;