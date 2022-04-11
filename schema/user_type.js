// const graphql = require("graphql");
// const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
// const UserType = new GraphQLObjectType({
//   name: "UserType",
//   fields: {
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     email: { type: GraphQLString }
//   }
// });
// const PostType = require(".post_type");

// module.exports = UserType;

const { GraphQLObjectType, GraphQLList } = require("graphql");
const mongoose = require("mongoose");
const User = mongoose.model("user");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    posts: {
      type: new GraphQLList(require("./post_type")),
      resolve(parentalue) {
        return (
          User.findById(parentValue.id)
            .populate("posts")
            .then(user => user.posts)
        );
      }
    } 
  })
});

module.exports = UserType;