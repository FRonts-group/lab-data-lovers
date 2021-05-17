import Pokemon from './pokemon.js';
import Stats from './stats.js';
/**
   * Get a pokemon by id
   * @param {string} - The id of a pokemon or the name.
   * @return {pokemon} A pokemon object.
   */
  export const getPokemon = async(idPokemon) => {
    try{
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
      const resp = await fetch(pokemonUrl);

      if (!resp.ok) throw 'The request could not be fulfilled';

      const { id, name, height, weight, abilities, types, forms, sprites } = await resp.json();

      //Get only the elements you need from each tribute.
      let abilitiesNew = []; let typesNew = []; let formsNew = [];
      abilities.forEach(element => abilitiesNew.push(element.ability.name));
      types.forEach(element => typesNew.push(element.type.name));
      forms.forEach(element => formsNew.push(element.name));
      let pokemon = new Pokemon(parseInt(id), name, fromHectograms(height), fromDecimeters(weight),
        abilitiesNew, sprites.back_default, typesNew, formsNew);

      return pokemon;
    }
    catch(err){
      throw err;
    }

}
/**
   * Get a pokemon stats by id
   * @param {string} - The id of a pokemon or the name.
   * @return {stats} A pokemon stats object.
   */
export const getPokemonStats = async (idPokemon) => {
  try {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
    const resp = await fetch(pokemonUrl);
    let pokemonStats = new Stats();

    if (!resp.ok) throw 'The request could not be fulfilled';

    const { stats } = await resp.json();
    pokemonStats.idPokemon = idPokemon;
    stats.forEach((element) => {
      if (element.stat.name === "hp"){
        pokemonStats.hp = element.base_stat;
      }
      else if (element.stat.name === "attack") {
        pokemonStats.attack = element.base_stat;
      }
      else if (element.stat.name === "defense") {
        pokemonStats.defense = element.base_stat;
      }
      else if (element.stat.name === "special-attack") {
        pokemonStats.specialAttack = element.base_stat;
      }
      else if (element.stat.name === "special-defense") {
        pokemonStats.specialDefense = element.base_stat;
      }
      else if (element.stat.name === "speed") {
        pokemonStats.speed = element.base_stat;
      }
    });

    return pokemonStats;
  }
  catch (err) {
    throw err;
  }

}
/**
 * Get X amount of pokemons
 * @param {number} - The amount of pokemon.
 * @param {array[number]} - An array of pokemon ids
 * @return {array[pokemon]} A list of pokemon objects.
 */
export const getPokemons = async (x) => {
  let pokemons = [];
  for(  let i=1 ; i <= x ; i++){
    let pokemon = await getPokemon(i);
    pokemons.push(pokemon);
  }
  return pokemons;
}
/**
 * Get pokemons by type
 * @param {number} - The amount of pokemon.
 * @param {string} - A type.
 * @return {array[pokemon]} A list of pokemon objects of the same type.
 */
export const getPokemonsbyType = () => {
  // ...
}
/**
 * Get random pokemon
 * @param {number} - The amount of pokemon.
 * @return {array[pokemon, pokemon]} Two pokemon objects.
 */
export const getRandomPokemons = () => {
  // ...
}
  /**
   * Convert the weight of hectograms to kilograms.
   * @param {number} - The weight in hectograms.
   * @return {number} - The weight in kilograms.
   */
const fromHectograms = (hect) => {
  return hect/10;
}
  /**
   * Convert the height of decimetres to centimeters.
   * @param {number} - The height in decimetres.
   * @return {number} - The height in centimeters.
   */
const fromDecimeters = (dec) => {
  return dec*10;
}
