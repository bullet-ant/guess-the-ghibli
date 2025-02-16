import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      name
      movie
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