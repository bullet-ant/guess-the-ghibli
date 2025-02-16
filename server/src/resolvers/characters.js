const resolvers = {
  Query: {
    characters: async (_, __, { dataSources }) => {
      return dataSources.charactersAPI.getCharacters();
    },
    character: async (_, { name }, { dataSources }) => {
      return dataSources.charactersAPI.getCharacterByName(name);
    },
  },
};

module.exports = resolvers;
