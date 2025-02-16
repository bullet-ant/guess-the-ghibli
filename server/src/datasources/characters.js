const ghibliCharacters = require("../data/ghibli/static.json");

class CharactersAPI {
  constructor() {
    this.characters = ghibliCharacters;
  }

  async getCharacterByName(name) {
    return this.characters.find((character) => character.name === name);
  }

  async getCharacters() {
    return this.characters;
  }
}

module.exports = CharactersAPI;
