import { gql } from '@apollo/client';

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      name
      movie
      url
      gender
      species
      age
      hair_color
      eye_color
      traits
      occupation
      allies
      enemies
      description
    }
  }
`;

export default GET_CHARACTERS;