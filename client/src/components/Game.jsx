import PropTypes from "prop-types";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const CharacterQuestion = ({ gameOver, question, onAnswer }) => {
  const { width, height } = useWindowSize();
  const reactions = ["👀", "🧐", "🤨", "🧐", "🙂‍↕️", "🤔", "🫣"];

  return (
    <div>
      <p>
        {question}{" "}
        {!gameOver && (
          <span>{reactions[Math.floor(Math.random() * reactions.length)]}</span>
        )}
      </p>
      {!gameOver && (
        <>
          <button onClick={() => onAnswer("yes")}>Yes</button>
          <button onClick={() => onAnswer("no")}>No</button>
        </>
      )}
      {gameOver && (
        <>
          <Confetti width={width} height={height} numberOfPieces={100} />
          <button onClick={() => window.location.reload()}>Play Again</button>
        </>
      )}
    </div>
  );
};

CharacterQuestion.propTypes = {
  gameOver: PropTypes.bool.isRequired,
  question: PropTypes.string.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default CharacterQuestion;
