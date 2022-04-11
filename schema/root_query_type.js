const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql;

const mongoose = require("mongoose");
const User = mongoose.model("user");
const Post = mongoose.model("post");

const UserType = require("./user_type");
const PostType = require("./post_type");

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
      // //Querying for a single User
      // type: UserType,
      // //Must define type for the arguments, GraphQLNonNull specifies there must be an arg
      // args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      // resolve(parentValue, args) {
      //   return User.findById(args.id)
      // }
      //Cleaner version
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findById(id)
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find({});
      }
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return Post.findById(args.id)
      }
    }
  }
});

module.exports = RootQuery;
