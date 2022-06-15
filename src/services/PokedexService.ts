import Pokemon from "../model/Pokemon";

const pokedexService = {
    fetchPokemonById: (pokemonId: Number): Promise<Pokemon> => {
        return fetch(`http://127.0.0.1:4010/pokedex/pokemons/${pokemonId}`)
            .then(response => response.json())
            .then(data => data as Pokemon);
    },

    fetchPokemonList: (): Promise<Array<Pokemon>> => {
        return fetch(`http://127.0.0.1:4010/pokedex/pokemons`)
            .then(response => response.json())
            .then(data => data as Array<Pokemon>);
    }
};

export default pokedexService;
