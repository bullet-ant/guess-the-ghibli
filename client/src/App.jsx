import "./App.css";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { generateQuestion, GET_CHARACTERS } from "./lib";
import { Game } from "./components";

function App() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  const [question, setQuestion] = useState("");
  const [characters, setCharacters] = useState([]);
  const [attribute, setAttribute] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [guessCharacter, setGuessCharacter] = useState({});

  if (data && characters.length === 0) {
    setCharacters(data.characters);
    const { attribute, value, question } = generateQuestion(data.characters);
    setAttribute(attribute);
    setAttributeValue(value);
    setQuestion(question);
  }

  const handleAnswer = (answer) => {
    const filteredCharacters = characters.filter((character) => {
      const characterAttribute = character[attribute];
      if (Array.isArray(characterAttribute)) {
        return answer === "yes"
          ? characterAttribute.includes(attributeValue)
          : !characterAttribute.includes(attributeValue);
      } else {
        return answer === "yes"
          ? characterAttribute === attributeValue
          : characterAttribute !== attributeValue;
      }
    });
    setCharacters(filteredCharacters);

    if (filteredCharacters.length === 1) {
      setQuestion(`Have another character in mind?`);
      setGuessCharacter(filteredCharacters[0]);
      setGameOver(true);
    } else if (filteredCharacters.length === 0) {
      setQuestion("No character found!");
    } else {
      const { attribute, value, question } =
        generateQuestion(filteredCharacters);
      setAttribute(attribute);
      setAttributeValue(value);
      setQuestion(question);
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: ${error.message}</p>}
      {gameOver && guessCharacter && (
        <div>
          <h2>Your character is {guessCharacter.name}!</h2>
          <img src={guessCharacter.url} alt={guessCharacter.name} />
        </div>
      )}
      {question && (
        <Game gameOver={gameOver} question={question} onAnswer={handleAnswer} />
      )}
    </>
  );
}

export default App;
