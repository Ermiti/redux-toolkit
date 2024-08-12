import { ApolloServer, gql } from 'apollo-server-micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const typeDefs = gql`
  type Todo {
    userId: Int
    id: Int
    title: String
    completed: Boolean
  }

  type Query {
    todos: [Todo]
  }
`;

const resolvers = {
  Query: {
    todos: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      return response.json();
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
