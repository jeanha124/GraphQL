const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType"
});

module.exports = UserType;