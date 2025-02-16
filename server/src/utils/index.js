const characters = require("../data/ghibli/static.json");
const readline = require("readline");

// Create an interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

function frameQuestion(attribute, value) {
  switch (attribute) {
    case "gender":
      return `Is your character ${value}?`;
    case "species":
      return `Is your character a ${value}?`;
    case "movie":
      return `Does your character appear in ${value}?`;
    case "age":
      return `Is your character ${value}?`;
    case "hair_color":
      return `Does your character have ${value} hair?`;
    case "eye_color":
      return `Does your character have ${value} eyes?`;
    case "traits":
      return `Is your character known for being ${value}?`;
    case "occupation":
      return `Is your character a ${value}?`;
    case "allies":
      return `Is your character allied with ${value}?`;
    case "enemies":
      return `Is your character enemies with ${value}?`;
    default:
      return `Is your character ${value}?`;
  }
}

function generateQuestion(characters) {
  // Count the frequency of each attribute in the remaining characters
  const attributeCounts = {
    movie: {},
    gender: {},
    species: {},
    age: {},
    hair_color: {},
    eye_color: {},
    traits: {},
    occupation: {},
    allies: {},
    enemies: {},
  };

  characters.forEach((character) => {
    for (const key in attributeCounts) {
      if (Array.isArray(character[key])) {
        character[key].forEach((trait) => {
          attributeCounts[key][trait] = (attributeCounts[key][trait] || 0) + 1;
        });
      } else {
        attributeCounts[key][character[key]] =
          (attributeCounts[key][character[key]] || 0) + 1;
      }
    }
  });

  // Find the attribute with the most balanced split (closest to 50/50)
  let bestAttribute = null;
  let bestSplit = Infinity;

  for (const key in attributeCounts) {
    const values = Object.values(attributeCounts[key]);
    const total = values.reduce((sum, count) => sum + count, 0);
    const split = Math.abs(values[0] - total / 2);

    if (split < bestSplit) {
      bestSplit = split;
      bestAttribute = key;
    }
  }

  // Generate a question based on the best attribute
  const value = Object.keys(attributeCounts[bestAttribute])[0];

  return {
    attribute: bestAttribute,
    value,
    question: frameQuestion(bestAttribute, value),
  };
}

async function guessTheCharacter(characters) {
  while (characters.length > 1) {
    const { attribute, value, question } = generateQuestion(characters);
    const answer = await askQuestion(`${question}`);

    if (answer === "y") {
      characters = characters.filter(
        (character) => character[attribute] === value
      );
    } else {
      characters = characters.filter(
        (character) => character[attribute] !== value
      );
    }

    const nextCharacters = [];

    if (answer === "y")
      nextCharacters.push(
        characters.filter((character) => character[attribute] === value)
      );
    else
      nextCharacters.push(
        characters.filter((character) => character[attribute] !== value)
      );

    return guessTheCharacter(nextCharacters.flat());
  }

  if (characters.length === 1)
    return `Your character is ${characters[0].name}!`;
  else return "No character found!";
}

module.exports = { guessTheCharacter };
