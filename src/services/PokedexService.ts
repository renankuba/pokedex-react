import Pokemon from "../model/Pokemon";

export const fetchPokemonById = (pokemonId:Number):Promise<Pokemon> => {
    return fetch(`http://127.0.0.1:4010/pokedex/pokemons/${pokemonId}`)
        .then(response => response.json())
        .then(data => data as Pokemon);
}