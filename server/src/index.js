const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const resolvers = require("./resolvers/characters");
const CharactersAPI = require("./datasources/characters");
const typeDefs = require("./schema/typeDefs");

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          charactersAPI: new CharactersAPI({ cache }),
        },
      };
    },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
