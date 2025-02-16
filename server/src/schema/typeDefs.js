const gql = require("graphql-tag");

const typeDefs = gql`
  "Query root"
  type Query {
    "Get all characters"
    characters: [Character]!
    "Get a character by their name"
    character(name: String!): Character
  }

  "A character from a Studio Ghibli movie"
  type Character {
    "The character's name"
    name: String!
    "The Studio Ghibli movie the character appears in"
    movie: String!
    "The character's gender"
    gender: String
    "The character's species"
    species: String!
    "The character's age"
    age: String!
    "The character's hair color"
    hair_color: String!
    "The character's eye color"
    eye_color: String!
    "The character's traits"
    traits: [String]!
    "The character's occupation"
    occupation: String!
    "The character's allies"
    allies: [String]!
    "The character's enemies"
    enemies: [String]!
    "A brief description of the character"
    description: String!
  }
`;

module.exports = typeDefs;
