// 代码生成时间: 2025-09-21 06:15:35
// Import necessary dependencies
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('gatsby/graphql');

// Define a User type for GraphQL
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  })
});

// Define a RootQuery type for GraphQL
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (source, args) => {
        // Mock data for demonstration purposes
        const users = [{ id: '1', name: 'John Doe', age: 30 }];
        const user = users.find(u => u.id === args.id);

        // Error handling for non-existing user
        if (!user) {
          throw new Error('User not found');
        }

        return user;
      },
    },
  }
});

// Export the RootQuery type
module.exports = RootQuery;