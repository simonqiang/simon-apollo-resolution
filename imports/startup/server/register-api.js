import {makeExecutableSchema} from "graphql-tools";
import {createApolloServer} from "meteor/apollo";
import merge from 'lodash/merge';

import ResolutionsSchema from "../../api/resolutions/Resolutions.graphql";
import ResolutionsResolvers from "../../api/resolutions/resolvers";
import GoalsSchema from "../../api/goals/Goal.graphql";
import GoalsResolvers from "../../api/goals/resolvers";
import UsersSchema from "../../api/users/User.graphql";
import UsersResolvers from "../../api/users/resolvers";
//dfdfds
const typeDefs = [
  GoalsSchema,
  ResolutionsSchema,
  UsersSchema
];

const resolvers = merge(
  GoalsResolvers,
  ResolutionsResolvers,
  UsersResolvers
  );

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

createApolloServer({schema});
