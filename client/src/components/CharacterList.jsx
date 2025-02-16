import PropTypes from "prop-types";

const CharacterList = ({ characters }) => {
  return (
    <div>
      {characters.map((character) => (
        <div key={character.name}>
          <p>{character.name}</p>
        </div>
      ))}
    </div>
  );
};

CharacterList.propTypes = {
  characters: PropTypes.array.isRequired,
};

export default CharacterList;
