import { GraphQLServer } from 'graphql-yoga';
import { PrismaClient, p2_usersClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = `
  type Query {
    hello(name: String): String!
    getUser: Boolean!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    getUser: async (_, __, ___) => {
      try {
        const users = await prisma.p2_users.create({
          data: {
            email: `${String(new Date())}`,
            name: `${String(new Date())}`,
            user_id: 1,
          },
        });
        console.log('users: ', users);
        return true;
      } catch (e) {
        console.log('[createUser] Mutation Error: ', e);
        return false;
      }
    },
  },
  // Mutation: {
  //   createUser: async (_, __, ___) => {
  //     try {
  //       const users = await prisma.p2_users.create({
  //         data: {
  //           email: `${String(new Date())}`,
  //           name: `${String(new Date())}`,
  //         },
  //       });
  //       console.log('users: ', users);
  //       return true;
  //     } catch (e) {
  //       console.log('[createUser] Mutation Error: ', e);
  //       return false;
  //     }
  //   },
  // },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
